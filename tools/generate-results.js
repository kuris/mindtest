#!/usr/bin/env node
/**
 * generate-results.js
 * 번아웃(2~5), 디지털(1~5), TMI(8개) 결과 HTML을 일괄 생성합니다.
 * 실행: node tools/generate-results.js
 */
const fs = require('fs');
const path = require('path');

const RESULT_DIR = path.join(__dirname, '..', 'result');

function analytics() {
  return `<!-- Vercel Analytics -->
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>`;
}

function adsense() {
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3321070604000141" crossorigin="anonymous"></script>`;
}

function adSlot() {
  return `<div class="ad-slot">
  <!-- 수동 광고 단위를 쓰려면 아래 주석을 풀고 data-ad-slot 값을 교체하세요.
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3321070604000141"
       data-ad-slot="0000000000" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  -->
</div>`;
}

function shareScript({ tweet, testFile, testName }) {
  return `<script>
(function () {
  var p = new URLSearchParams(location.search).get('p');
  var badge = document.getElementById('score-badge');
  if (p !== null && badge) { badge.textContent = '번아웃 수치 ' + p + '%'; } else if (badge) { badge.style.display = 'none'; }

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
</script>`;
}

function scoreShareScript({ tweet, testFile, paramName }) {
  return `<script>
(function () {
  var p = new URLSearchParams(location.search).get('${paramName}');
  var badge = document.getElementById('score-badge');
  if (p !== null && badge) { badge.textContent = badge.dataset.label.replace('{v}', p); } else if (badge) { badge.style.display = 'none'; }

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
</script>`;
}

function typeShareScript({ tweet }) {
  return `<script>
(function () {
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
</script>`;
}

// ─────────────────────────────────────────────────
// 번아웃 결과 데이터
// ─────────────────────────────────────────────────
const BURNOUT_GRADES = [
  null, // 1번은 이미 생성됨
  {
    slug: '2', name: '예열 중', emoji: '🟡',
    summary: '슬슬 피로가 쌓이기 시작했어요.',
    desc: '아직 기능은 잘 하고 있지만, 어딘가 귀찮고 에너지가 한 박자 늦게 올라오는 느낌이 있을 거예요. 이 단계에서 쉬는 것과 무시하는 것의 차이가 3개월 뒤를 갈릅니다.',
    traits: ['아침에 몸이 무겁다', '집중력이 예전만 못하다', '주말에도 완전히 회복이 안 된다', '\"피곤하다\"는 말이 입버릇이 됐다'],
    tip: '지금 당장 큰 변화는 필요 없어요. 하루 30분, 아무것도 안 해도 되는 시간을 먼저 확보해 보세요.'
  },
  {
    slug: '3', name: '경고등 켜짐', emoji: '🟠',
    summary: '몸과 마음이 SOS를 보내고 있어요.',
    desc: '감정 기복이 커지고, 하던 일도 전보다 버겁게 느껴지는 시기입니다. 의지로 버텨왔다면 그 방법이 더는 통하지 않을 수 있어요. 지금은 버티는 것보다 회복이 우선입니다.',
    traits: ['사소한 일에도 짜증이 난다', '뭔가 의욕이 안 생긴다', '사람 만나는 게 부담스러워졌다', '즐기던 것도 재미가 없다'],
    tip: '혼자 해결하려 하지 마세요. 가까운 사람과 이야기하거나, 전문 상담을 받아보는 것도 좋은 선택입니다.'
  },
  {
    slug: '4', name: '방전 직전', emoji: '🔴',
    summary: '지금 당신에게 가장 필요한 건 쉬는 거예요.',
    desc: '에너지가 바닥에 가까워진 상태입니다. 아무것도 하기 싫고, 아무것도 기대되지 않으며, 그냥 다 사라지고 싶다는 생각이 드는 날이 많을 수 있어요. 이건 의지의 문제가 아닙니다.',
    traits: ['기본적인 것(씻기, 먹기)도 버겁다', '감정이 무뎌지는 느낌이 든다', '미래가 기대되지 않는다', '잠을 자도 피곤하다'],
    tip: '지금 나를 돌보는 것이 가장 중요한 일입니다. 잠시 멈춰도 세상은 괜찮아요. 전문가의 도움을 받아보세요.'
  },
  {
    slug: '5', name: '완전 방전', emoji: '⚫',
    summary: '지금은 반드시 멈추고 회복해야 할 때예요.',
    desc: '번아웃이 깊어진 상태입니다. 몸과 마음이 이미 한계를 넘었을 가능성이 높아요. 혼자 해결하려 하기보다, 지금 당장 주변에 상황을 알리고 도움을 요청하는 게 먼저입니다.',
    traits: ['일상이 버겁게 느껴진다', '자신이 무가치하게 느껴질 때가 있다', '아무것도 기대되지 않는다', '감정 자체가 없는 것 같다'],
    tip: '이 테스트 결과를 가까운 사람에게 보여주세요. 혼자 감당하지 않아도 됩니다. 전문 상담사와 이야기해 보세요.'
  },
];

// ─────────────────────────────────────────────────
// 디지털 중독 결과 데이터
// ─────────────────────────────────────────────────
const DIGITAL_GRADES = [
  {
    slug: '1', name: '디지털 미니멀리스트', emoji: '🌿',
    summary: '폰이 도구인 사람. 폰의 노예가 아님.',
    desc: '스마트폰을 필요할 때만 꺼내 쓰고, 대화와 현실에 더 집중하는 편입니다. 알림에 끌려다니지 않고 내가 주도적으로 사용하죠. 디지털 웰빙의 교과서 같은 사용 패턴입니다.',
    traits: ['폰 없이도 여유롭게 있을 수 있다', '알림 소리에 즉각 반응하지 않는다', '스크린타임이 생각보다 적다', '오프라인을 즐길 줄 안다'],
    tip: '지금 이 패턴을 유지하는 것만으로도 충분합니다. 주변 사람들에게 은근히 영향을 주고 있을 거예요.'
  },
  {
    slug: '2', name: '적당한 현대인', emoji: '📲',
    summary: '스마트폰을 잘 쓰는 편이에요. 균형 중.',
    desc: '디지털 도구를 꽤 잘 활용하면서도, 현실을 놓치지 않으려는 균형 감각이 있습니다. 가끔 빠져들 때도 있지만 스스로 인식하고 조절하는 편이죠.',
    traits: ['\"잠깐만\" 하다가 가끔 오래 걸리긴 한다', '알림을 다 확인하지 않아도 괜찮다', '폰 없이도 버틸 수 있다', '밥 먹을 때 폰을 보는 날이 있다'],
    tip: '잠들기 30분 전에 폰을 뒤집어 두는 것만으로 수면 질이 달라집니다. 작은 것부터 시도해보세요.'
  },
  {
    slug: '3', name: '알림 중독 초기', emoji: '🔔',
    summary: '폰이 없으면 손이 심심해요.',
    desc: '습관적으로 폰을 꺼내 드는 단계입니다. 용건이 없어도 화면을 켜보고, 알림이 없어도 앱을 열어보죠. 스스로 \"이거 좀 줄여야 하는데\" 하는 생각이 가끔 드는 단계입니다.',
    traits: ['폰이 없으면 불안하다', '밥 먹을 때도 폰 화면이 보여야 한다', '잠들기 직전까지 폰을 본다', '스크린타임 알림을 무시한다'],
    tip: '앱 알림부터 정리해보세요. 없어도 되는 알림을 끄는 것만으로 하루가 조용해집니다.'
  },
  {
    slug: '4', name: '폰 없인 못 살아', emoji: '📡',
    summary: '디지털 세계가 현실보다 편한 사람.',
    desc: '온라인에서 훨씬 더 편안함을 느끼고, 오프라인 상황이 오히려 낯설 수 있습니다. 폰을 손에서 놓는 것 자체가 스트레스로 느껴지는 단계죠.',
    traits: ['화장실에 폰을 꼭 들고 들어간다', '새벽에도 알림이 오면 확인한다', '와이파이가 없으면 불안하다', '\"잠깐\"이 항상 한 시간이 된다'],
    tip: '하루 중 딱 1시간만 폰을 다른 방에 두고 지내보세요. 처음엔 불편하지만, 그 시간이 늘어날수록 집중력이 돌아옵니다.'
  },
  {
    slug: '5', name: '스마트폰과 한 몸', emoji: '🤖',
    summary: '이미 오른손이 스마트폰인 사람.',
    desc: '스마트폰 없이 하루를 보내는 것이 거의 상상되지 않는 단계입니다. 눈 뜨는 순간부터 잠드는 순간까지 폰이 함께하죠. 현실보다 스크린이 편하고, 오프라인은 이미 낯선 공간입니다.',
    traits: ['스크린타임 기능을 꺼놓거나 무시한다', '폰이 없으면 시간을 모른다', '충전기가 없으면 하루가 무너진다', '대화 중에도 폰을 본다'],
    tip: '지금 폰을 1분 내려놓고 창밖을 보세요. 그게 시작입니다. 조금씩, 의식적으로 줄이는 것만으로도 달라집니다.'
  },
];

// ─────────────────────────────────────────────────
// TMI 유형 데이터
// ─────────────────────────────────────────────────
const TMI_TYPES = [
  {
    slug: 'live-reporter', name: '실시간 중계 기자', emoji: '📡',
    summary: '일어나는 족족, 상세히, 공감과 함께.',
    desc: '뭔가 생기면 바로 말해야 하고, 말할 때는 디테일을 빠뜨리지 않으며, 상대의 감정에도 잘 반응합니다. 같이 있으면 지루할 틈이 없는 사람이죠. 대화가 풍성해지는 반면, 가끔 상대가 압도될 수 있습니다.',
    traits: ['카톡 답장이 세 줄 이상이다', '길게 말하는데 듣기 싫지 않다', '단체 대화방의 분위기 메이커', '공감 리액션이 풍부하다'],
    tip: '가끔은 상대가 말할 틈을 먼저 만들어보세요. 들어주는 것도 대화의 기술입니다.',
    match: '헤드라인 편집자', matchSlug: 'tmi-headline-editor.html'
  },
  {
    slug: 'rapid-analyst', name: '즉흥 분석가', emoji: '🧮',
    summary: '빠르게, 상세하게, 논리적으로.',
    desc: '바로 말하고, 자세히 말하되, 감정보다 정보 위주로 전달합니다. 상황 설명이 정확해서 오해가 없고, 의사결정이 빠른 그룹에서 존재감이 빛납니다. 감성보다 사실 전달에 강한 타입이죠.',
    traits: ['설명이 정확하고 빠르다', '말이 길어도 핵심이 있다', '논쟁에서 데이터를 먼저 찾는다', '감정 표현이 좀 서툴 때가 있다'],
    tip: '맞는 말도 타이밍이 있습니다. 가끔은 정보보다 \"힘들었겠다\"가 더 필요한 순간이 있어요.',
    match: '느린 공감러', matchSlug: 'tmi-slow-empath.html'
  },
  {
    slug: 'warm-narrator', name: '따뜻한 스토리텔러', emoji: '📖',
    summary: '천천히, 깊게, 마음을 담아서.',
    desc: '말하는 타이밍을 재고 나서 꺼내는데, 일단 시작하면 이야기가 풍성하고 감성적입니다. 대화가 깊어지는 것을 좋아하고, 상대의 감정을 잘 읽어서 분위기를 따뜻하게 만들죠.',
    traits: ['\"그거 알아? 사실은 말이야…\"로 시작하는 대화', '적당한 타이밍에 좋은 이야기를 꺼낸다', '공감 능력이 뛰어나다', '긴 카톡도 재밌게 읽힌다'],
    tip: '좋은 이야기를 너무 오래 안고 있지 마세요. 조금 이른 타이밍에 꺼내도 괜찮습니다.',
    match: '즉흥 분석가', matchSlug: 'tmi-rapid-analyst.html'
  },
  {
    slug: 'headline-editor', name: '헤드라인 편집자', emoji: '📰',
    summary: '천천히, 길게, 핵심 요약으로.',
    desc: '말할 때를 가려서 꺼내고, 상세하게 설명하지만 결론은 명확하게 정리합니다. 감정보다는 정보 전달에 강하고, 그룹 대화에서 상황 정리를 잘 하는 타입입니다.',
    traits: ['말하기 전에 한 번 생각한다', '설명이 길어도 끝은 요점이다', '잡담보다 유의미한 대화를 선호한다', '카톡보다 직접 대화를 좋아한다'],
    tip: '결론보다 과정을 공유해도 좋을 때가 있어요. 미완성 생각을 나누는 것도 대화입니다.',
    match: '실시간 중계 기자', matchSlug: 'tmi-live-reporter.html'
  },
  {
    slug: 'slow-empath', name: '느린 공감러', emoji: '🫂',
    summary: '때를 봐서, 요점만, 감정 먼저.',
    desc: '말이 많은 편이 아니지만 꺼낼 때는 상대의 마음을 먼저 챙깁니다. 조용히 듣다가 핵심 한 마디로 분위기를 전환하는 능력이 있죠. 말수가 적어도 존재감이 있는 타입입니다.',
    traits: ['말은 적지만 할 때는 무게감이 있다', '상대 감정을 먼저 읽는다', '조용히 있다가 핵심을 찌른다', '\"아무 말 안 해도 편한 사람\"으로 불린다'],
    tip: '생각을 좀 더 자주 꺼내보세요. 당신의 한 마디가 생각보다 큰 위로가 됩니다.',
    match: '즉흥 분석가', matchSlug: 'tmi-rapid-analyst.html'
  },
  {
    slug: 'cool-summarizer', name: '쿨한 요약러', emoji: '✂️',
    summary: '때를 봐서, 요점만, 논리적으로.',
    desc: '말할 타이밍을 고르고, 짧고 정확하게 전달합니다. 군더더기 없는 소통이 특기라 업무 상황에서 특히 빛을 발합니다. 감정보다 사실과 결론을 중시하는 편이죠.',
    traits: ['카톡이 한 줄 이하인 경우가 많다', '용건 외 TMI를 거의 안 한다', '직접적인 피드백을 잘 한다', '불필요한 말로 에너지를 쓰지 않는다'],
    tip: '가끔은 결론 없이 그냥 수다를 떠는 것도 관계를 만드는 방법입니다.',
    match: '따뜻한 스토리텔러', matchSlug: 'tmi-warm-narrator.html'
  },
  {
    slug: 'late-bloomer', name: '느긋한 공감형', emoji: '🌱',
    summary: '나중에, 요점만, 따뜻하게.',
    desc: '말이 많지 않고 느긋하게 타이밍을 잡지만, 꺼내면 따뜻한 말을 합니다. 상대가 힘들 때 말없이 옆에 있어 주는 타입이죠. 빠른 대화보다 깊은 대화를 선호합니다.',
    traits: ['\"나중에 같이 얘기하자\"를 자주 한다', '급하게 반응하는 일이 거의 없다', '진심이 담긴 말은 항상 기다렸다 한다', '조용하지만 믿음직하다'],
    tip: '좋은 때를 기다리다 타이밍을 놓칠 수 있어요. 미완성이어도 꺼내보세요.',
    match: '실시간 중계 기자', matchSlug: 'tmi-live-reporter.html'
  },
  {
    slug: 'quiet-realist', name: '과묵한 현실주의자', emoji: '🧱',
    summary: '나중에, 요점만, 논리적으로.',
    desc: '말이 가장 적은 타입입니다. 꼭 필요한 말만 하고, 감정 표현보다 사실 전달을 선호하며, 타이밍도 충분히 고릅니다. 과묵하지만 그 한 마디가 가장 신뢰받는 타입이기도 합니다.',
    traits: ['말하기 전에 세 번 생각한다', '감정 표현이 거의 없다', '\"그래서 결론이 뭔데?\"가 입버릇', '혼자 있는 시간을 충전으로 쓴다'],
    tip: '당신의 과묵함이 때론 \"관심 없다\"로 읽힐 수 있어요. 짧게라도 반응을 표현해보세요.',
    match: '실시간 중계 기자', matchSlug: 'tmi-live-reporter.html'
  },
];

// ─────────────────────────────────────────────────
// HTML 생성 함수
// ─────────────────────────────────────────────────

function makeBurnoutResult(g) {
  const tweetText = `내 번아웃 수치를 재봤어 — ${g.name} ${g.emoji}`;
  const traitsHtml = g.traits.map(t => `    <li>${t}</li>`).join('\n');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>번아웃 수치: ${g.name} - 번아웃 자가진단 테스트</title>
<meta name="description" content="${g.summary} ${g.desc.slice(0, 80)}…">
<link rel="canonical" href="https://mindtest.chatgpts.kr/result/burnout-${g.slug}.html">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E🧠%3C%2Ftext%3E%3C%2Fsvg%3E">
<meta property="og:type" content="website">
<meta property="og:site_name" content="마인드테스트">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="내 번아웃 수치 — ${g.emoji} ${g.name}! - 번아웃 자가진단 테스트">
<meta property="og:description" content="${g.summary}">
<meta property="og:image" content="https://mindtest.chatgpts.kr/og/burnout-${g.slug}.png">
<meta property="og:url" content="https://mindtest.chatgpts.kr/result/burnout-${g.slug}.html">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="내 번아웃 수치 — ${g.emoji} ${g.name}! - 번아웃 자가진단 테스트">
<meta name="twitter:description" content="${g.summary}">
<meta name="twitter:image" content="https://mindtest.chatgpts.kr/og/burnout-${g.slug}.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
${adsense()}
${analytics()}
</head>
<body data-theme="burnout">
<div class="wrap">
<header class="site-head"><a href="../index.html">마인드<span class="dot">테스트</span></a></header>
<div class="result-head">
  <p class="result-kicker">번아웃 자가진단 결과</p>
  <div class="result-emoji">${g.emoji}</div>
  <h1 class="result-name">${g.name}</h1>
  <p class="lede">${g.summary}</p>
  <span class="result-score" id="score-badge" data-label="번아웃 수치 {v}%"></span>
</div>

<div class="panel">
  <h2>지금 상태는</h2>
  <p>${g.desc}</p>
</div>

<div class="panel">
  <h2>이런 특징이 있어요</h2>
  <ul class="traits">
${traitsHtml}
  </ul>
</div>

<div class="panel">
  <h2>한 줄 조언</h2>
  <p>${g.tip}</p>
</div>

${adSlot()}

<div class="btn-row two">
  <button type="button" class="btn btn-primary" id="copy">🔗 링크 복사</button>
  <a class="btn" id="tweet" href="#" target="_blank" rel="noopener">𝕏 에 공유</a>
</div>
<p class="lede">카카오톡·인스타에는 <strong>링크 복사</strong> 후 붙여넣기 하면 결과 카드가 뜹니다.</p>

<div class="btn-row">
  <a class="btn" href="../index.html">🎲 다른 테스트 하기</a>
  <a class="btn" href="../burnout.html">↻ 테스트 다시 하기</a>
</div>

<div class="toast" id="toast" role="status" aria-live="polite">링크를 복사했어요</div>

${scoreShareScript({ tweet: tweetText, testFile: 'burnout.html', paramName: 'p' })}

<footer class="site-foot">
  <p><a href="../index.html">마인드테스트</a> · 재미로 보는 심리테스트</p>
  <p>자매 사이트 <a href="https://hanja.chatgpts.kr/" rel="noopener">한자야 놀자!</a></p>
</footer>
</div>
</body>
</html>`;
}

function makeDigitalResult(g) {
  const tweetText = `내 디지털 중독 수치 공개 — ${g.emoji} ${g.name}`;
  const traitsHtml = g.traits.map(t => `    <li>${t}</li>`).join('\n');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>디지털 의존도: ${g.name} - 디지털 중독 자가진단 테스트</title>
<meta name="description" content="${g.summary} ${g.desc.slice(0, 80)}…">
<link rel="canonical" href="https://mindtest.chatgpts.kr/result/digital-${g.slug}.html">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E📱%3C%2Ftext%3E%3C%2Fsvg%3E">
<meta property="og:type" content="website">
<meta property="og:site_name" content="마인드테스트">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="내 디지털 중독 수치 — ${g.emoji} ${g.name}! - 디지털 중독 자가진단 테스트">
<meta property="og:description" content="${g.summary}">
<meta property="og:image" content="https://mindtest.chatgpts.kr/og/digital-${g.slug}.png">
<meta property="og:url" content="https://mindtest.chatgpts.kr/result/digital-${g.slug}.html">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="내 디지털 중독 수치 — ${g.emoji} ${g.name}! - 디지털 중독 자가진단 테스트">
<meta name="twitter:description" content="${g.summary}">
<meta name="twitter:image" content="https://mindtest.chatgpts.kr/og/digital-${g.slug}.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
${adsense()}
${analytics()}
</head>
<body data-theme="digital">
<div class="wrap">
<header class="site-head"><a href="../index.html">마인드<span class="dot">테스트</span></a></header>
<div class="result-head">
  <p class="result-kicker">디지털 중독 자가진단 결과</p>
  <div class="result-emoji">${g.emoji}</div>
  <h1 class="result-name">${g.name}</h1>
  <p class="lede">${g.summary}</p>
  <span class="result-score" id="score-badge" data-label="디지털 의존도 {v}%"></span>
</div>

<div class="panel">
  <h2>지금 상태는</h2>
  <p>${g.desc}</p>
</div>

<div class="panel">
  <h2>이런 특징이 있어요</h2>
  <ul class="traits">
${traitsHtml}
  </ul>
</div>

<div class="panel">
  <h2>한 줄 조언</h2>
  <p>${g.tip}</p>
</div>

${adSlot()}

<div class="btn-row two">
  <button type="button" class="btn btn-primary" id="copy">🔗 링크 복사</button>
  <a class="btn" id="tweet" href="#" target="_blank" rel="noopener">𝕏 에 공유</a>
</div>
<p class="lede">카카오톡·인스타에는 <strong>링크 복사</strong> 후 붙여넣기 하면 결과 카드가 뜹니다.</p>

<div class="btn-row">
  <a class="btn" href="../index.html">🎲 다른 테스트 하기</a>
  <a class="btn" href="../digital.html">↻ 테스트 다시 하기</a>
</div>

<div class="toast" id="toast" role="status" aria-live="polite">링크를 복사했어요</div>

${scoreShareScript({ tweet: tweetText, testFile: 'digital.html', paramName: 'p' })}

<footer class="site-foot">
  <p><a href="../index.html">마인드테스트</a> · 재미로 보는 심리테스트</p>
  <p>자매 사이트 <a href="https://hanja.chatgpts.kr/" rel="noopener">한자야 놀자!</a></p>
</footer>
</div>
</body>
</html>`;
}

function makeTMIResult(t) {
  const tweetText = `대화할 때 내 TMI 유형은 이거래 — ${t.emoji} ${t.name}`;
  const traitsHtml = t.traits.map(tr => `    <li>${tr}</li>`).join('\n');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>나는 ${t.name} - 나의 TMI 유형 테스트</title>
<meta name="description" content="${t.summary} ${t.desc.slice(0, 80)}…">
<link rel="canonical" href="https://mindtest.chatgpts.kr/result/tmi-${t.slug}.html">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E🗣️%3C%2Ftext%3E%3C%2Fsvg%3E">
<meta property="og:type" content="website">
<meta property="og:site_name" content="마인드테스트">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="나는 ${t.emoji} ${t.name}! - 나의 TMI 유형 테스트">
<meta property="og:description" content="${t.summary}">
<meta property="og:image" content="https://mindtest.chatgpts.kr/og/tmi-${t.slug}.png">
<meta property="og:url" content="https://mindtest.chatgpts.kr/result/tmi-${t.slug}.html">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="나는 ${t.emoji} ${t.name}! - 나의 TMI 유형 테스트">
<meta name="twitter:description" content="${t.summary}">
<meta name="twitter:image" content="https://mindtest.chatgpts.kr/og/tmi-${t.slug}.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
${adsense()}
${analytics()}
</head>
<body data-theme="tmi">
<div class="wrap">
<header class="site-head"><a href="../index.html">마인드<span class="dot">테스트</span></a></header>
<div class="result-head">
  <p class="result-kicker">나의 TMI 유형 테스트 결과</p>
  <div class="result-emoji">${t.emoji}</div>
  <h1 class="result-name">${t.name}</h1>
  <p class="lede">${t.summary}</p>
</div>

<div class="panel">
  <h2>어떤 사람인가요</h2>
  <p>${t.desc}</p>
</div>

<div class="panel">
  <h2>이런 특징이 있어요</h2>
  <ul class="traits">
${traitsHtml}
  </ul>
</div>

<div class="panel">
  <h2>한 줄 조언</h2>
  <p>${t.tip}</p>
</div>

<div class="panel">
  <h2>잘 맞는 유형</h2>
  <p><a href="${t.matchSlug}">${t.match}</a> — 서로 보완이 되는 대화 스타일입니다.</p>
</div>

${adSlot()}

<div class="btn-row two">
  <button type="button" class="btn btn-primary" id="copy">🔗 링크 복사</button>
  <a class="btn" id="tweet" href="#" target="_blank" rel="noopener">𝕏 에 공유</a>
</div>
<p class="lede">카카오톡·인스타에는 <strong>링크 복사</strong> 후 붙여넣기 하면 결과 카드가 뜹니다.</p>

<div class="btn-row">
  <a class="btn" href="../index.html">🎲 다른 테스트 하기</a>
  <a class="btn" href="../tmi.html">↻ 테스트 다시 하기</a>
</div>

<div class="toast" id="toast" role="status" aria-live="polite">링크를 복사했어요</div>

${typeShareScript({ tweet: tweetText })}

<footer class="site-foot">
  <p><a href="../index.html">마인드테스트</a> · 재미로 보는 심리테스트</p>
  <p>자매 사이트 <a href="https://hanja.chatgpts.kr/" rel="noopener">한자야 놀자!</a></p>
</footer>
</div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────
// 파일 생성
// ─────────────────────────────────────────────────
let count = 0;

// 번아웃 2~5
BURNOUT_GRADES.forEach((g, i) => {
  if (!g) return; // index 0 은 null (1번은 이미 있음)
  const fp = path.join(RESULT_DIR, `burnout-${g.slug}.html`);
  fs.writeFileSync(fp, makeBurnoutResult(g), 'utf8');
  console.log(`✅ burnout-${g.slug}.html`);
  count++;
});

// 디지털 1~5
DIGITAL_GRADES.forEach(g => {
  const fp = path.join(RESULT_DIR, `digital-${g.slug}.html`);
  fs.writeFileSync(fp, makeDigitalResult(g), 'utf8');
  console.log(`✅ digital-${g.slug}.html`);
  count++;
});

// TMI 8종
TMI_TYPES.forEach(t => {
  const fp = path.join(RESULT_DIR, `tmi-${t.slug}.html`);
  fs.writeFileSync(fp, makeTMIResult(t), 'utf8');
  console.log(`✅ tmi-${t.slug}.html`);
  count++;
});

console.log(`\n완료: ${count}개 결과 HTML 생성`);
