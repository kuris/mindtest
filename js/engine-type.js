/* engine-type.js — 축 점수 누적 → 부호 조합으로 유형 매칭
 * 사용법: data-*.js (type:'type') 를 먼저 로드한 뒤 이 파일을 로드한다.
 * 필요한 DOM: #bar #back #count #qtext #answers
 */
(function () {
  'use strict';

  if (window.MINDTEST_PATCH_TEST_DATA) { window.MINDTEST_PATCH_TEST_DATA(); }
  var T = window.TEST_DATA;
  if (!T) { return; }

  var qs = T.questions;
  var picks = [];          // picks[i] = 선택한 보기 index
  var cur = 0;

  var elBar = document.getElementById('bar');
  var elBack = document.getElementById('back');
  var elCount = document.getElementById('count');
  var elQ = document.getElementById('qtext');
  var elA = document.getElementById('answers');

  var isTransitioning = false;

  function render() {
    var q = qs[cur];
    elBar.style.width = ((cur + 1) / qs.length * 100) + '%';
    elCount.textContent = (cur + 1) + ' / ' + qs.length;
    elBack.disabled = (cur === 0);
    elQ.textContent = q.q;
    elQ.classList.remove('q-fade');
    void elQ.offsetWidth;
    elQ.classList.add('q-fade');

    elA.textContent = '';
    q.a.forEach(function (opt, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'answer';
      b.textContent = opt.text;
      b.addEventListener('click', function () { choose(i, b); });
      elA.appendChild(b);
    });
    elQ.focus();
  }

  function choose(i, b) {
    if (isTransitioning) { return; }
    isTransitioning = true;
    picks[cur] = i;
    if (b) { b.classList.add('is-selected'); }
    setTimeout(function () {
      isTransitioning = false;
      if (cur < qs.length - 1) { cur++; render(); }
      else { finish(); }
    }, 150);
  }

  function back() {
    if (isTransitioning) { return; }
    if (cur > 0) { cur--; render(); }
  }

  /* 축별 점수를 합산해 부호 조합 키를 만든다. 예: '+-+-' */
  function finish() {
    var total = {};
    T.axes.forEach(function (ax) { total[ax] = 0; });

    picks.forEach(function (pick, qi) {
      var sc = qs[qi].a[pick].score || {};
      Object.keys(sc).forEach(function (ax) {
        total[ax] = (total[ax] || 0) + sc[ax];
      });
    });

    var key = T.axes.map(function (ax) {
      return total[ax] >= 0 ? '+' : '-';
    }).join('');

    var res = T.results[key];
    if (!res) { return; }
    var langParam = new URLSearchParams(location.search).get('lang');
    var query = langParam ? '?lang=' + encodeURIComponent(langParam) : '';
    location.href = 'result/' + T.resultPrefix + res.slug + '.html' + query;
  }

  elBack.addEventListener('click', back);
  render();
})();
