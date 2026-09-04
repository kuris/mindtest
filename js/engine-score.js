/* engine-score.js — 응답 점수 합산 → 백분율 → 구간별 등급
 * 사용법: data-*.js (type:'score') 를 먼저 로드한 뒤 이 파일을 로드한다.
 * 결과 페이지에는 정확한 백분율을 ?p= 로 넘긴다 (canonical 은 쿼리 없는 URL).
 * 필요한 DOM: #bar #back #count #qtext #answers
 */
(function () {
  'use strict';

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

  function render() {
    var q = qs[cur];
    elBar.style.width = ((cur + 1) / qs.length * 100) + '%';
    elCount.textContent = (cur + 1) + ' / ' + qs.length;
    elBack.disabled = (cur === 0);
    elQ.textContent = q.q;

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
    var sum = 0;
    picks.forEach(function (pick, qi) { sum += qs[qi].a[pick].score; });

    var pct = Math.round(sum / T.maxScore * 100);
    var grade = null;
    for (var i = 0; i < T.grades.length; i++) {
      if (pct >= T.grades[i].min && pct <= T.grades[i].max) { grade = T.grades[i]; break; }
    }
    if (!grade) { grade = T.grades[T.grades.length - 1]; }

    location.href = 'result/' + T.resultPrefix + grade.slug + '.html?p=' + pct;
  }

  elBack.addEventListener('click', back);
  render();
})();
