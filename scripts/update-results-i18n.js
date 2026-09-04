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

  // 2. i18n.js 삽입 (중복 방지)
  if (!content.includes('i18n.js')) {
    content = content.replace('</body>', '<script src="../js/i18n.js"></script>\n</body>');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  count++;
}

console.log(`Successfully updated ${count} result files with hreflang and i18n.js`);
