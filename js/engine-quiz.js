/* engine-quiz.js — 정답 채점 → 맞힌 개수를 급수/레벨로 환산
 * 사용법: data-*.js (type:'quiz') 를 먼저 로드한 뒤 이 파일을 로드한다.
 * 결과 페이지에는 맞힌 개수를 ?c= 로 넘긴다 (canonical 은 쿼리 없는 URL).
 * 필요한 DOM: #bar #back #count #qtext #answers (선택: #qgrade)
 */
(function () {
  'use strict';

  if (window.MINDTEST_PATCH_TEST_DATA) { window.MINDTEST_PATCH_TEST_DATA(); }
  var T = window.TEST_DATA;
  if (!T) { return; }

  var qs = T.questions;
  var picks = [];
  var cur = 0;

  var elBar = document.getElementById('bar');
  var elBack = document.getElementById('back');
  var elCount = document.getElementById('count');
  var elQ = document.getElementById('qtext');
  var elA = document.getElementById('answers');
  var elGrade = document.getElementById('qgrade');

  function render() {
    var q = qs[cur];
    elBar.style.width = ((cur + 1) / qs.length * 100) + '%';
    elCount.textContent = (cur + 1) + ' / ' + qs.length;
    elBack.disabled = (cur === 0);
    elQ.textContent = q.q;
    if (elGrade) { elGrade.textContent = q.grade ? q.grade + ' 수준' : ''; }

    elA.textContent = '';
    q.a.forEach(function (opt, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'answer';
      b.textContent = opt.text;
      b.addEventListener('click', function () { choose(i); });
      elA.appendChild(b);
    });
    elQ.focus();
  }

  function choose(i) {
    picks[cur] = i;
    if (cur < qs.length - 1) { cur++; render(); }
    else { finish(); }
  }

  function back() {
    if (cur > 0) { cur--; render(); }
  }

  function finish() {
    var correct = 0;
    picks.forEach(function (pick, qi) {
      if (qs[qi].a[pick].correct) { correct++; }
    });

    var level = null;
    for (var i = 0; i < T.levels.length; i++) {
      if (correct >= T.levels[i].min && correct <= T.levels[i].max) { level = T.levels[i]; break; }
    }
    if (!level) { level = T.levels[0]; }

    var langParam = new URLSearchParams(location.search).get('lang');
    var langQuery = langParam ? '&lang=' + encodeURIComponent(langParam) : '';
    location.href = 'result/' + T.resultPrefix + level.slug + '.html?c=' + correct + langQuery;
  }

  elBack.addEventListener('click', back);
  render();
})();
