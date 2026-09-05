#!/usr/bin/env node
/**
 * generate-new-tests-results.js
 * 맞춤법(spelling 1~5), MZ 신조어(slang 1~5), 소비 성향(money 1~5) 결과 HTML 생성
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RESULT_DIR = path.join(ROOT, 'result');

const SPELLING = require(path.join(ROOT, 'js/data-spelling.js'));
const SLANG = require(path.join(ROOT, 'js/data-slang.js'));
const MONEY = require(path.join(ROOT, 'js/data-money.js'));

const SITE = '마인드테스트';
const BASE = 'https://mindtest.chatgpts.kr';
const ADS_CLIENT = 'ca-pub-3321070604000141';

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function favicon(emoji) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function generateQuizResultHtml(test, level) {
  const slug = level.slug;
  const rel = `result/${test.resultPrefix}${slug}.html`;
  const url = `${BASE}/${rel}`;
  const mid = Math.round((level.min + level.max) / 2);
  const title = `${test.title}: ${level.name} - ${SITE}`;
  const desc = `${level.summary} ${level.desc}`;
  const tweet = `${test.shareText} — ${level.emoji} ${level.name}`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<link rel="alternate" hreflang="ko" href="${url}">
<link rel="alternate" hreflang="en" href="${url}?lang=en">
<link rel="alternate" hreflang="ja" href="${url}?lang=ja">
<link rel="alternate" hreflang="zh" href="${url}?lang=zh">
<link rel="alternate" hreflang="es" href="${url}?lang=es">
<link rel="alternate" hreflang="pt" href="${url}?lang=pt">
<link rel="icon" href="${favicon(level.emoji)}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE}">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="${esc(tweet)} - ${SITE}">
<meta property="og:description" content="${esc(level.summary)}">
<meta property="og:image" content="${BASE}/og/${test.resultPrefix}${slug}.png">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(tweet)} - ${SITE}">
<meta name="twitter:description" content="${esc(level.summary)}">
<meta name="twitter:image" content="${BASE}/og/${test.resultPrefix}${slug}.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Jua&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css?v=2">

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}" crossorigin="anonymous"></script>
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
</head>
<body data-theme="${test.theme}">
<div class="wrap">
<header class="site-head"><a href="../index.html">마인드<span class="dot">테스트</span></a></header>

<div class="result-head">
  <p class="result-kicker">${esc(test.title)} 결과</p>
  <div class="result-emoji">${level.emoji}</div>
  <h1 class="result-name">${esc(level.name)}</h1>
  <p class="result-score">10문제 중 <strong id="correct">${mid}</strong>개 정답</p>
  <p class="lede">${esc(level.summary)}</p>
</div>

<div class="panel">
  <h2>어느 정도 수준인가요</h2>
  <p>${esc(level.desc)}</p>
</div>

<div class="panel">
  <h2>이런 특징이 있어요</h2>
  <ul class="traits">
${level.traits.map(t => `    <li>${esc(t)}</li>`).join('\n')}
  </ul>
</div>

<div class="panel">
  <h2>한 줄 조언</h2>
  <p>${esc(level.tip)}</p>
</div>

<div class="ad-slot">
  <!-- 수동 광고 슬롯 -->
</div>

<div class="btn-row two">
  <button type="button" class="btn btn-primary" id="copy">🔗 링크 복사</button>
  <a class="btn" id="tweet" href="#" target="_blank" rel="noopener">𝕏 에 공유</a>
</div>
<p class="lede">카카오톡·인스타에는 <strong>링크 복사</strong> 후 붙여넣기 하면 결과 카드가 뜹니다.</p>

<div class="btn-row">
  <a class="btn" href="../index.html">🎲 다른 테스트 하기</a>
  <a class="btn" id="retry" href="../${test.id}.html">↻ 테스트 다시 하기</a>
</div>

<div class="toast" id="toast" role="status" aria-live="polite">링크를 복사했어요</div>

<script>
(function () {
  var c = new URLSearchParams(location.search).get('c');
  if (c !== null) {
    var el = document.getElementById('correct');
    if (el) el.textContent = c;
  }

  var TWEET = ${JSON.stringify(tweet)};
  var tw = document.getElementById('tweet');
  tw.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(TWEET) +
            '&url=' + encodeURIComponent(location.origin + location.pathname);

  var toast = document.getElementById('toast');
  function flash(msg) { toast.textContent = msg; toast.classList.add('show'); setTimeout(function () { toast.classList.remove('show'); }, 1800); }
  function fallbackCopy(text) { var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; } document.body.removeChild(ta); return ok; }
  function copy(text, msg) { if (navigator.clipboard && location.protocol !== 'file:') { navigator.clipboard.writeText(text).then(function () { flash(msg); }, function () { flash(fallbackCopy(text) ? msg : '복사에 실패했어요. 주소창을 길게 눌러 복사해 주세요'); }); } else { flash(fallbackCopy(text) ? msg : '복사에 실패했어요. 주소창을 길게 눌러 복사해 주세요'); } }
  document.getElementById('copy').addEventListener('click', function () { copy(location.origin + location.pathname, '링크를 복사했어요'); });
})();
</script>

<footer class="site-foot">
  <p><a href="../index.html">마인드테스트</a> · 재미로 보는 심리테스트</p>
  <p>자매 사이트 <a href="https://hanja.chatgpts.kr/" rel="noopener">한자야 놀자!</a></p>
</footer>
</div>
<script src="../js/i18n.js"></script>
<script src="../js/share-card.js?v=2"></script>
</body>
</html>
`;
}

function generateScoreResultHtml(test, grade) {
  const slug = grade.slug;
  const rel = `result/${test.resultPrefix}${slug}.html`;
  const url = `${BASE}/${rel}`;
  const title = `${test.title}: ${grade.name} - ${SITE}`;
  const desc = `${grade.summary} ${grade.desc}`;
  const tweet = `${test.shareText} — ${grade.emoji} ${grade.name}`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<link rel="alternate" hreflang="ko" href="${url}">
<link rel="alternate" hreflang="en" href="${url}?lang=en">
<link rel="alternate" hreflang="ja" href="${url}?lang=ja">
<link rel="alternate" hreflang="zh" href="${url}?lang=zh">
<link rel="alternate" hreflang="es" href="${url}?lang=es">
<link rel="alternate" hreflang="pt" href="${url}?lang=pt">
<link rel="icon" href="${favicon(grade.emoji)}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE}">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="${esc(tweet)} - ${SITE}">
<meta property="og:description" content="${esc(grade.summary)}">
<meta property="og:image" content="${BASE}/og/${test.resultPrefix}${slug}.png">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(tweet)} - ${SITE}">
<meta name="twitter:description" content="${esc(grade.summary)}">
<meta name="twitter:image" content="${BASE}/og/${test.resultPrefix}${slug}.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Jua&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css?v=2">

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}" crossorigin="anonymous"></script>
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
</head>
<body data-theme="${test.theme}">
<div class="wrap">
<header class="site-head"><a href="../index.html">마인드<span class="dot">테스트</span></a></header>

<div class="result-head">
  <p class="result-kicker">${esc(test.title)} 결과</p>
  <div class="result-emoji">${grade.emoji}</div>
  <h1 class="result-name">${esc(grade.name)}</h1>
  <p class="lede">${esc(grade.summary)}</p>
  <span class="result-score" id="score-badge"></span>
</div>

<div class="panel">
  <h2>지금 나의 소비 스타일은</h2>
  <p>${esc(grade.desc)}</p>
</div>

<div class="panel">
  <h2>이런 특징이 있어요</h2>
  <ul class="traits">
${grade.traits.map(t => `    <li>${esc(t)}</li>`).join('\n')}
  </ul>
</div>

<div class="panel">
  <h2>머니 라이프 조언</h2>
  <p>${esc(grade.tip)}</p>
</div>

<div class="ad-slot">
  <!-- 수동 광고 슬롯 -->
</div>

<div class="btn-row two">
  <button type="button" class="btn btn-primary" id="copy">🔗 링크 복사</button>
  <a class="btn" id="tweet" href="#" target="_blank" rel="noopener">𝕏 에 공유</a>
</div>
<p class="lede">카카오톡·인스타에는 <strong>링크 복사</strong> 후 붙여넣기 하면 결과 카드가 뜹니다.</p>

<div class="btn-row">
  <a class="btn" href="../index.html">🎲 다른 테스트 하기</a>
  <a class="btn" id="retry" href="../${test.id}.html">↻ 테스트 다시 하기</a>
</div>

<div class="toast" id="toast" role="status" aria-live="polite">링크를 복사했어요</div>

<script>
(function () {
  var p = new URLSearchParams(location.search).get('p');
  var badge = document.getElementById('score-badge');
  if (p !== null) { badge.textContent = '소비 지수 ' + p + '%'; } else { badge.style.display = 'none'; }

  var TWEET = ${JSON.stringify(tweet)};
  var tw = document.getElementById('tweet');
  tw.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(TWEET) +
            '&url=' + encodeURIComponent(location.origin + location.pathname);

  var toast = document.getElementById('toast');
  function flash(msg) { toast.textContent = msg; toast.classList.add('show'); setTimeout(function () { toast.classList.remove('show'); }, 1800); }
  function fallbackCopy(text) { var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; } document.body.removeChild(ta); return ok; }
  function copy(text, msg) { if (navigator.clipboard && location.protocol !== 'file:') { navigator.clipboard.writeText(text).then(function () { flash(msg); }, function () { flash(fallbackCopy(text) ? msg : '복사에 실패했어요. 주소창을 길게 눌러 복사해 주세요'); }); } else { flash(fallbackCopy(text) ? msg : '복사에 실패했어요. 주소창을 길게 눌러 복사해 주세요'); } }
  document.getElementById('copy').addEventListener('click', function () { copy(location.origin + location.pathname, '링크를 복사했어요'); });
})();
</script>

<footer class="site-foot">
  <p><a href="../index.html">마인드테스트</a> · 재미로 보는 심리테스트</p>
  <p>자매 사이트 <a href="https://hanja.chatgpts.kr/" rel="noopener">한자야 놀자!</a></p>
</footer>
</div>
<script src="../js/i18n.js"></script>
<script src="../js/share-card.js?v=2"></script>
</body>
</html>
`;
}

// 1. 맞춤법 결과 생성
SPELLING.levels.forEach(l => {
  const file = path.join(RESULT_DIR, `spelling-${l.slug}.html`);
  fs.writeFileSync(file, generateQuizResultHtml(SPELLING, l));
  console.log('Created:', file);
});

// 2. 신조어 결과 생성
SLANG.levels.forEach(l => {
  const file = path.join(RESULT_DIR, `slang-${l.slug}.html`);
  fs.writeFileSync(file, generateQuizResultHtml(SLANG, l));
  console.log('Created:', file);
});

// 3. 머니 결과 생성
MONEY.grades.forEach(g => {
  const file = path.join(RESULT_DIR, `money-${g.slug}.html`);
  fs.writeFileSync(file, generateScoreResultHtml(MONEY, g));
  console.log('Created:', file);
});

console.log('All 15 new result pages generated successfully!');
