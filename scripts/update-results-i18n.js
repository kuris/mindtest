const fs = require('fs');
const path = require('path');

const resultDir = path.join(__dirname, '..', 'result');
const files = fs.readdirSync(resultDir).filter(f => f.endsWith('.html'));

let count = 0;

for (const file of files) {
  const filePath = path.join(resultDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. canonical 바로 뒤에 hreflang 삽입 (중복 방지)
  if (!content.includes('hreflang="en"')) {
    const canonicalRegex = /(<link rel="canonical" href="https:\/\/mindtest\.chatgpts\.kr\/result\/[^"]+">)/;
    if (canonicalRegex.test(content)) {
      const canonicalMatch = content.match(canonicalRegex)[1];
      const urlMatch = canonicalMatch.match(/href="([^"]+)"/)[1];
      const hreflangs = [
        canonicalMatch,
        `<link rel="alternate" hreflang="x-default" href="${urlMatch}">`,
        `<link rel="alternate" hreflang="ko" href="${urlMatch}">`,
        `<link rel="alternate" hreflang="en" href="${urlMatch}?lang=en">`,
        `<link rel="alternate" hreflang="ja" href="${urlMatch}?lang=ja">`,
        `<link rel="alternate" hreflang="zh" href="${urlMatch}?lang=zh">`,
        `<link rel="alternate" hreflang="es" href="${urlMatch}?lang=es">`,
        `<link rel="alternate" hreflang="pt" href="${urlMatch}?lang=pt">`
      ].join('\n');

      content = content.replace(canonicalRegex, hreflangs);
    }
  }

  // 2. Jua 폰트 링크 삽입 또는 교체
  if (content.includes('family=Gowun+Dodum&display=swap')) {
    content = content.replace('family=Gowun+Dodum&display=swap', 'family=Gowun+Dodum&family=Jua&display=swap');
  } else if (!content.includes('family=Jua')) {
    content = content.replace('</head>', '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Jua&display=swap" rel="stylesheet">\n</head>');
  }

  // 3. i18n.js 삽입 (중복 방지)
  if (!content.includes('i18n.js')) {
    content = content.replace('</body>', '<script src="../js/i18n.js"></script>\n</body>');
  }

  // 4. share-card.js 삽입 (중복 방지)
  if (!content.includes('share-card.js')) {
    if (content.includes('<script src="../js/i18n.js"></script>')) {
      content = content.replace(
        '<script src="../js/i18n.js"></script>',
        '<script src="../js/i18n.js"></script>\n<script src="../js/share-card.js?v=2"></script>'
      );
    } else {
      content = content.replace('</body>', '<script src="../js/share-card.js?v=2"></script>\n</body>');
    }
  } else if (content.includes('<script src="../js/share-card.js"></script>')) {
    content = content.replace(
      '<script src="../js/share-card.js"></script>',
      '<script src="../js/share-card.js?v=2"></script>'
    );
  }

  // 5. style.css 캐시 버스터
  if (content.includes('<link rel="stylesheet" href="../css/style.css">')) {
    content = content.replace(
      '<link rel="stylesheet" href="../css/style.css">',
      '<link rel="stylesheet" href="../css/style.css?v=2">'
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  count++;
}

console.log(`Successfully updated ${count} result files with Jua font, hreflang, i18n.js, and share-card.js`);
