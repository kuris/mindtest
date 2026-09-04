#!/usr/bin/env node
/* build.js — 데이터 파일에서 정적 HTML 31개 + sitemap.xml 을 생성한다.
 *
 * 이 스크립트는 개발용 생성기일 뿐이고, 배포 산출물은 전부 정적 HTML이다.
 * (사이트 자체에는 빌드 단계도 런타임 의존성도 없다)
 *
 *   node tools/build.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://mindtest.chatgpts.kr';
const SITE = '마인드테스트';
const ADS_CLIENT = 'ca-pub-3321070604000141';

const LOVE = require(path.join(ROOT, 'js/data-love.js'));
const KKONDAE = require(path.join(ROOT, 'js/data-kkondae.js'));
const VOCAB = require(path.join(ROOT, 'js/data-vocab.js'));

const pages = [];   // sitemap 용 { url, priority }

/* ------------------------------------------------------------------ */
/* 유틸                                                                */
/* ------------------------------------------------------------------ */

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function write(rel, html) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, html);
}

function favicon(emoji) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/* ------------------------------------------------------------------ */
/* 공통 조각                                                            */
/* ------------------------------------------------------------------ */

/* opts: { rel, title, desc, ogTitle, ogDesc, ogImage, theme, emoji, depth } */
function head(o) {
  const up = o.depth ? '../' : '';
  // 홈은 /index.html 이 아니라 루트 URL 을 정본으로 삼는다 (sitemap 과 일치)
  const url = BASE + '/' + (o.rel === 'index.html' ? '' : o.rel);
  const ogImage = BASE + '/og/' + (o.ogImage || 'default') + '.png';
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${url}">
<link rel="icon" href="${favicon(o.emoji || '🧠')}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE}">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="${esc(o.ogTitle || o.title)}">
<meta property="og:description" content="${esc(o.ogDesc || o.desc)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(o.ogTitle || o.title)}">
<meta name="twitter:description" content="${esc(o.ogDesc || o.desc)}">
<meta name="twitter:image" content="${ogImage}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}css/style.css">

<!-- 구글 애드센스 (자동 광고). 이 사이트는 일반 대상이므로 tfat 파라미터를 쓰지 않는다. -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}" crossorigin="anonymous"></script>

<!-- Vercel Web Analytics (file:// 로 열었을 때 404 나지 않도록 프로토콜 확인 후 주입) -->
<script>
(function () {
  if (location.protocol === 'file:') return;
  var s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/insights/script.js';
  document.head.appendChild(s);
})();
</script>
</head>
<body${o.theme ? ` data-theme="${o.theme}"` : ''}>
<div class="wrap">
<header class="site-head"><a href="${up}index.html">마인드<span class="dot">테스트</span></a></header>
`;
}

function foot(depth) {
  const up = depth ? '../' : '';
  return `<footer class="site-foot">
  <p><a href="${up}index.html">${SITE}</a> · 재미로 보는 심리테스트</p>
  <p>자매 사이트 <a href="https://hanja.chatgpts.kr/" rel="noopener">한자야 놀자!</a></p>
</footer>
</div>
</body>
</html>
`;
}

/* 애드센스 수동 광고 단위를 넣을 자리.
   자동 광고만 쓸 거면 그대로 두면 되고, 수동 단위를 쓰려면 아래 주석을 참고. */
function adSlot() {
  return `<div class="ad-slot">
  <!-- 수동 광고 단위를 쓰려면 아래 주석을 풀고 data-ad-slot 값을 애드센스에서 발급받은 것으로 교체하세요.
  <ins class="adsbygoogle" style="display:block" data-ad-client="${ADS_CLIENT}"
       data-ad-slot="0000000000" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  -->
</div>
`;
}

/* 결과 페이지 하단 공유/이동 버튼 + 스크립트 */
function shareBlock(shareText, resultName) {
  const tweet = `${shareText} — ${resultName}`;
  return `${adSlot()}
<div class="btn-row two">
  <button type="button" class="btn btn-primary" id="copy">🔗 링크 복사</button>
  <a class="btn" id="tweet" href="#" target="_blank" rel="noopener">𝕏 에 공유</a>
</div>
<p class="lede">카카오톡·인스타에는 <strong>링크 복사</strong> 후 붙여넣기 하면 결과 카드가 뜹니다.</p>

<div class="btn-row">
  <a class="btn" href="../index.html">🎲 다른 테스트 하기</a>
  <a class="btn" id="retry" href="#">↻ 테스트 다시 하기</a>
</div>

<div class="toast" id="toast" role="status" aria-live="polite">링크를 복사했어요</div>

<script>
(function () {
  var TWEET = ${JSON.stringify(tweet)};

  var tw = document.getElementById('tweet');
  tw.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(TWEET) +
            '&url=' + encodeURIComponent(location.origin + location.pathname);

  var toast = document.getElementById('toast');
  function flash(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 1800);
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copy(text, msg) {
    if (navigator.clipboard && location.protocol !== 'file:') {
      navigator.clipboard.writeText(text).then(
        function () { flash(msg); },
        function () { flash(fallbackCopy(text) ? msg : '복사에 실패했어요. 주소창을 길게 눌러 복사해 주세요'); }
      );
    } else {
      flash(fallbackCopy(text) ? msg : '복사에 실패했어요. 주소창을 길게 눌러 복사해 주세요');
    }
  }

  document.getElementById('copy').addEventListener('click', function () {
    copy(location.origin + location.pathname, '링크를 복사했어요');
  });

  var brag = document.getElementById('brag-copy');
  if (brag) {
    brag.addEventListener('click', function () {
      copy(document.getElementById('brag-text').textContent.trim(), '인증 문구를 복사했어요');
    });
  }
})();
</script>
`;
}

function traitList(traits) {
  return `<ul class="traits">
${traits.map(t => `  <li>${esc(t)}</li>`).join('\n')}
</ul>`;
}

/* ------------------------------------------------------------------ */
/* 홈                                                                  */
/* ------------------------------------------------------------------ */

function buildIndex() {
  const tests = [
    { file: 'love.html', t: LOVE, blurb: '표현·속도·거리감·현실감 4가지 축으로 보는 나의 연애 방식. 16가지 유형 중 나는?' },
    { file: 'kkondae.html', t: KKONDAE, blurb: '회사·단톡방·회식에서 나오는 반응으로 재는 꼰대력. 결과는 백분율로 인증하세요.' },
    { file: 'vocab.html', t: VOCAB, blurb: '심심한 사과, 무운을 빈다… 헷갈리는 한자어 10문제로 어휘력 급수를 판정합니다.' }
  ];

  const html = head({
    rel: 'index.html',
    title: '마인드테스트 - 3분 심리테스트 모음',
    desc: '연애 스타일, 꼰대력, 한자어 어휘력까지. 3분이면 끝나는 심리테스트와 결과 공유. 회원가입 없이 바로 시작하세요.',
    ogTitle: '마인드테스트 - 3분이면 끝나는 심리테스트',
    emoji: '🧠'
  }) +
`<h1 class="test-title" style="font-size:26px;color:var(--ink);font-weight:700;margin-bottom:6px;">3분이면 끝나는 심리테스트</h1>
<p class="lede">가입도, 설치도 없이. 결과는 친구에게 바로 공유하세요.</p>

<ul class="card-list">
${tests.map(x => `  <li><a class="card" href="${x.file}">
    <span class="emoji">${x.t.emoji}</span>
    <h2>${esc(x.t.title)}</h2>
    <p>${esc(x.blurb)}</p>
    <span class="meta">${esc(x.t.subtitle)}</span>
  </a></li>`).join('\n')}
</ul>

${adSlot()}
<div class="panel">
  <h2>한자·한자어가 더 궁금하다면</h2>
  <p>자매 사이트 <a href="https://hanja.chatgpts.kr/" rel="noopener">한자야 놀자!</a> 에서
  급수별 배정한자 3,500자를 무료로 공부할 수 있습니다.</p>
</div>
` + foot(0);

  write('index.html', html);
  pages.push({ url: BASE + '/', priority: '1.0' });
}

/* ------------------------------------------------------------------ */
/* 테스트 진행 페이지                                                    */
/* ------------------------------------------------------------------ */

function buildTestPage(t, file, engine, desc, showGrade) {
  const html = head({
    rel: file,
    title: `${t.title} - ${SITE}`,
    desc: desc,
    ogTitle: `${t.title} | ${t.subtitle}`,
    ogDesc: desc,
    ogImage: t.id,
    theme: t.theme,
    emoji: t.emoji
  }) +
`<h1 class="test-title">${t.emoji} ${esc(t.title)}</h1>

<div class="progress"><div class="progress-bar" id="bar"></div></div>
<div class="quiz-top">
  <button type="button" class="btn-back" id="back">← 이전</button>
  <span class="q-count" id="count"></span>
</div>

${showGrade ? `<span class="q-grade" id="qgrade"></span>\n` : ''}<p class="q-text" id="qtext" tabindex="-1"></p>
<div class="answers" id="answers"></div>

<noscript>
  <p class="lede">이 테스트는 자바스크립트가 필요합니다. 브라우저 설정에서 자바스크립트를 켜 주세요.</p>
</noscript>

<script src="js/data-${t.id}.js"></script>
<script src="js/${engine}"></script>
` + foot(0);

  write(file, html);
  pages.push({ url: BASE + '/' + file, priority: '0.9' });
}

/* ------------------------------------------------------------------ */
/* 결과 페이지                                                          */
/* ------------------------------------------------------------------ */

function buildLoveResults() {
  const byslug = {};
  Object.keys(LOVE.results).forEach(k => { byslug[LOVE.results[k].slug] = LOVE.results[k]; });

  Object.keys(LOVE.results).forEach(key => {
    const r = LOVE.results[key];
    const rel = `result/${LOVE.resultPrefix}${r.slug}.html`;
    const m = byslug[r.match];

    const html = head({
      rel,
      title: `나는 ${r.name} - ${LOVE.title}`,
      desc: `${r.summary} ${r.desc.slice(0, 80)}…`,
      ogTitle: `나는 ${r.name}! - ${LOVE.title}`,
      ogDesc: r.summary,
      ogImage: `${LOVE.resultPrefix}${r.slug}`,
      theme: LOVE.theme,
      emoji: r.emoji,
      depth: 1
    }) +
`<div class="result-head">
  <p class="result-kicker">${esc(LOVE.title)} 결과</p>
  <div class="result-emoji">${r.emoji}</div>
  <h1 class="result-name">${esc(r.name)}</h1>
  <p class="lede">${esc(r.summary)}</p>
</div>

<div class="panel">
  <h2>어떤 사람인가요</h2>
  <p>${esc(r.desc)}</p>
</div>

<div class="panel">
  <h2>이런 특징이 있어요</h2>
  ${traitList(r.traits)}
</div>

<div class="panel">
  <h2>한 줄 조언</h2>
  <p>${esc(r.tip)}</p>
</div>

<div class="panel">
  <h2>잘 맞는 유형</h2>
  <p><a href="${LOVE.resultPrefix}${m.slug}.html">${m.emoji} ${esc(m.name)}</a> — ${esc(m.summary)}</p>
</div>

${shareBlock(LOVE.shareText, r.name).replace('id="retry" href="#"', 'id="retry" href="../love.html"')}
` + foot(1);

    write(rel, html);
    pages.push({ url: BASE + '/' + rel, priority: '0.8' });
  });
}

function buildKkondaeResults() {
  KKONDAE.grades.forEach(g => {
    const rel = `result/${KKONDAE.resultPrefix}${g.slug}.html`;
    const mid = Math.round((g.min + g.max) / 2);

    const html = head({
      rel,
      title: `꼰대력 ${g.min}~${g.max}% ${g.name} - ${KKONDAE.title}`,
      desc: `${g.summary} ${g.desc.slice(0, 80)}…`,
      ogTitle: `나는 ${g.name}! - ${KKONDAE.title}`,
      ogDesc: g.summary,
      ogImage: `${KKONDAE.resultPrefix}${g.slug}`,
      theme: KKONDAE.theme,
      emoji: g.emoji,
      depth: 1
    }) +
`<div class="result-head">
  <p class="result-kicker">${esc(KKONDAE.title)} 결과</p>
  <div class="result-emoji">${g.emoji}</div>
  <h1 class="result-name">${esc(g.name)}</h1>
  <p class="result-score">꼰대력 <strong id="pct">${mid}</strong>%</p>
  <p class="lede">${esc(g.summary)}</p>
</div>

<div class="panel">
  <h2>인증 문구</h2>
  <p class="brag" id="brag-text">나 꼰대력 <span id="pct2">${mid}</span>%, ${esc(g.name)} ㅋㅋ</p>
  <div class="btn-row"><button type="button" class="btn" id="brag-copy">📋 인증 문구 복사</button></div>
</div>

<div class="panel">
  <h2>어떤 상태인가요</h2>
  <p>${esc(g.desc)}</p>
</div>

<div class="panel">
  <h2>이런 특징이 있어요</h2>
  ${traitList(g.traits)}
</div>

<div class="panel">
  <h2>한 줄 처방</h2>
  <p>${esc(g.tip)}</p>
</div>

<script>
/* 엔진이 ?p= 로 넘긴 실제 백분율을 반영한다. 없으면 등급 중앙값을 쓴다. */
(function () {
  var p = new URLSearchParams(location.search).get('p');
  var n = parseInt(p, 10);
  if (isNaN(n) || n < ${g.min} || n > ${g.max}) return;
  document.getElementById('pct').textContent = n;
  document.getElementById('pct2').textContent = n;
})();
</script>

${shareBlock(KKONDAE.shareText, g.name).replace('id="retry" href="#"', 'id="retry" href="../kkondae.html"')}
` + foot(1);

    write(rel, html);
    pages.push({ url: BASE + '/' + rel, priority: '0.8' });
  });
}

function buildVocabResults() {
  VOCAB.levels.forEach(l => {
    const rel = `result/${VOCAB.resultPrefix}${l.slug}.html`;
    const mid = Math.round((l.min + l.max) / 2);
    const gradeUrl = `${VOCAB.hanjaUrl}?grade=${l.hanjaGrade}`;

    const html = head({
      rel,
      title: `한자어 어휘력 ${l.name} - ${VOCAB.title}`,
      desc: `${l.summary} ${l.desc.slice(0, 80)}…`,
      ogTitle: `내 어휘력은 ${l.name}! - ${VOCAB.title}`,
      ogDesc: l.summary,
      ogImage: `${VOCAB.resultPrefix}${l.slug}`,
      theme: VOCAB.theme,
      emoji: l.emoji,
      depth: 1
    }) +
`<div class="result-head">
  <p class="result-kicker">${esc(VOCAB.title)} 결과</p>
  <div class="result-emoji">${l.emoji}</div>
  <h1 class="result-name">${esc(l.name)}</h1>
  <p class="result-score">10문제 중 <strong id="correct">${mid}</strong>개 정답</p>
  <p class="lede">${esc(l.summary)}</p>
</div>

<div class="panel">
  <h2>어느 정도 수준인가요</h2>
  <p>${esc(l.desc)}</p>
</div>

<div class="panel">
  <h2>이런 특징이 있어요</h2>
  ${traitList(l.traits)}
</div>

<div class="panel">
  <h2>한 줄 처방</h2>
  <p>${esc(l.tip)}</p>
</div>

<div class="panel">
  <h2>이 급수 한자 공부하러 가기</h2>
  <p>${esc(l.hanjaLabel)}부터 채우면 어휘력이 가장 빨리 올라갑니다.
  자매 사이트에서 급수별 배정한자를 무료로 공부할 수 있어요.</p>
  <div class="btn-row">
    <a class="btn btn-primary" href="${gradeUrl}" rel="noopener">📚 ${esc(l.hanjaLabel)} 공부하러 가기</a>
  </div>
</div>

<script>
/* 엔진이 ?c= 로 넘긴 실제 정답 개수를 반영한다. 없으면 구간 중앙값을 쓴다. */
(function () {
  var c = new URLSearchParams(location.search).get('c');
  var n = parseInt(c, 10);
  if (isNaN(n) || n < ${l.min} || n > ${l.max}) return;
  document.getElementById('correct').textContent = n;
})();
</script>

${shareBlock(VOCAB.shareText, l.name).replace('id="retry" href="#"', 'id="retry" href="../vocab.html"')}
` + foot(1);

    write(rel, html);
    pages.push({ url: BASE + '/' + rel, priority: '0.8' });
  });
}

/* ------------------------------------------------------------------ */
/* sitemap                                                             */
/* ------------------------------------------------------------------ */

function buildSitemap() {
  const today = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
  const body = pages.map(p =>
`  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

  write('sitemap.xml',
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`);
}

/* ------------------------------------------------------------------ */

buildIndex();
buildTestPage(LOVE, 'love.html', 'engine-type.js',
  '표현·속도·거리감·현실감 4가지 축으로 알아보는 나의 연애 스타일. 12문항으로 16가지 유형 중 하나를 찾아드립니다.', false);
buildTestPage(KKONDAE, 'kkondae.html', 'engine-score.js',
  '회사·단톡방·회식 상황 10문항으로 재는 내 꼰대력. 결과는 백분율과 등급으로 나옵니다.', false);
buildTestPage(VOCAB, 'vocab.html', 'engine-quiz.js',
  '심심한 사과, 무운을 빈다, 방증과 반증. 헷갈리는 한자어 10문제로 내 어휘력 급수를 판정합니다.', true);

buildLoveResults();
buildKkondaeResults();
buildVocabResults();
buildSitemap();

console.log(`생성 완료: 페이지 ${pages.length}개 + sitemap.xml`);
