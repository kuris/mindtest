/* ============================================================
   마인드테스트 - 내 결과 기록 (mindtest-sync.js)

   [이 파일이 하는 일]
     로그인한 사용자가 테스트 결과 페이지를 열면 결과를 계정에 자동 보관하고,
     홈에서 「내 결과」로 지난 기록과 점수 변화를 볼 수 있게 합니다.
     → 3개월 뒤 다시 해보고 번아웃 점수가 62 → 41 로 변한 걸 확인할 수 있습니다.

   [비로그인 사용자]
     서버 호출이 아예 일어나지 않습니다. 테스트와 결과 보기는 지금과 100% 동일합니다.

   의존성: cg-auth.js (window.CGAuth)
   ============================================================ */

(function () {
  'use strict';

  var TEST_LABEL = {
    burnout:  '번아웃 자가진단',
    digital:  '디지털 중독 자가진단',
    kkondae:  '꼰대력 테스트',
    love:     '연애 스타일 테스트',
    money:    '소비 성향 테스트',
    slang:    'MZ 신조어 테스트',
    spelling: '맞춤법 능력 테스트',
    tmi:      '나의 TMI 유형',
    vocab:    '한자어 어휘력 테스트'
  };

  function CG() { return window.CGAuth || null; }
  function loggedIn() { return !!(CG() && CG().isLoggedIn()); }
  function warn(m, e) { try { console.warn('[마인드테스트 기록] ' + m, e && (e.message || e)); } catch (_) {} }

  // ---------- 현재 결과 페이지 정보 읽기 ----------
  function parseResultPage() {
    var path = (location.pathname || '');
    if (path.indexOf('/result/') === -1) return null;

    var file = path.split('/').pop().replace(/\.html$/i, '');
    if (!file) return null;

    // 'burnout-1' → test:'burnout', result:'1'
    // 'love-tsundere-master' → test:'love', result:'tsundere-master'
    var i = file.indexOf('-');
    if (i <= 0) return null;
    var test = file.slice(0, i);
    var result = file.slice(i + 1);
    if (!TEST_LABEL[test]) return null;

    var pct = new URLSearchParams(location.search).get('p');
    var score = pct != null && pct !== '' ? parseInt(pct, 10) : null;
    if (isNaN(score)) score = null;

    var nameEl = document.querySelector('.result-name');
    var resultTitle = nameEl ? nameEl.textContent.trim() : '';

    return {
      test_key: test,
      result_key: result,
      result_title: resultTitle || result,
      score: score,
      label: TEST_LABEL[test],
      url: 'result/' + file + '.html' + (score != null ? '?p=' + score : '')
    };
  }

  // ---------- 결과 저장 (같은 결과를 새로고침해도 중복 저장하지 않음) ----------
  var DEDUPE_MS = 6 * 60 * 60 * 1000;   // 6시간

  async function saveResult(info) {
    if (!loggedIn() || !info) return;
    try {
      var last = await CG().listRecords('mindtest_results', {
        match: { test_key: info.test_key },
        orderBy: 'created_at',
        limit: 1
      });
      var prev = last && last[0];
      if (prev &&
          prev.result_key === info.result_key &&
          (prev.score == null ? null : prev.score) === info.score &&
          Date.now() - new Date(prev.created_at).getTime() < DEDUPE_MS) {
        return;   // 방금 저장한 것과 같은 결과 - 새로고침으로 보는 중
      }

      await CG().saveRecord('mindtest_results', {
        test_key:     info.test_key,
        result_key:   info.result_key,
        result_title: info.result_title,
        score:        info.score,
        detail:       { label: info.label, url: info.url }
      });

      // 이전 결과가 있으면 변화를 알려 줍니다
      if (prev && prev.score != null && info.score != null && prev.result_key !== info.result_key) {
        showChange(prev, info);
      }
    } catch (e) {
      warn('결과 저장 실패', e);
    }
  }

  function showChange(prev, info) {
    try {
      var diff = info.score - prev.score;
      if (!diff) return;
      var when = CG().timeAgo ? CG().timeAgo(prev.created_at) : '지난번';
      var msg = when + ' ' + prev.score + '점 → 이번 ' + info.score + '점 (' +
                (diff > 0 ? '+' : '') + diff + ')';
      var host = document.querySelector('.result-name');
      if (!host || !host.parentNode) return;
      var el = document.createElement('p');
      el.className = 'cg-mt-change';
      el.style.cssText = 'margin:8px 0 0;font-size:13px;font-weight:600;opacity:.85;';
      el.textContent = '📈 ' + msg;
      host.parentNode.insertBefore(el, host.nextSibling);
    } catch (e) { /* 무시 */ }
  }

  // ---------- 최근 본 테스트 ----------
  function markVisited(info) {
    if (!loggedIn()) return;
    var test = info ? info.test_key : testKeyFromTestPage();
    if (!test) return;
    CG().touchRecent({
      kind: 'test',
      id: test,
      title: TEST_LABEL[test] || test,
      url: test + '.html'
    });
  }

  function testKeyFromTestPage() {
    var file = (location.pathname || '').split('/').pop().replace(/\.html$/i, '');
    return TEST_LABEL[file] ? file : null;
  }

  // ---------- 「내 결과」 패널 ----------
  function mountPanel() {
    var host = document.getElementById('mindtest-recent');
    if (!host || !CG() || !CGAuth.mountRecentPanel) return;
    CGAuth.mountRecentPanel(host, {
      title: '🧠 내 테스트 결과',
      guestText: 'Google 로그인하면 테스트 결과가 저장돼, 나중에 다시 해보고 얼마나 달라졌는지 비교할 수 있어요.',
      emptyText: '아직 저장된 결과가 없어요. 테스트를 하나 끝내면 여기에 쌓입니다.',
      limit: 8,
      loader: async function () {
        var rows = await CGAuth.listRecords('mindtest_results', { orderBy: 'created_at', limit: 8 });
        return rows.map(function (r) {
          var d = (r.detail && typeof r.detail === 'object') ? r.detail : {};
          return {
            title: (TEST_LABEL[r.test_key] || r.test_key) + ' · ' + (r.result_title || r.result_key || ''),
            subtitle: r.score != null ? (r.score + '점') : '',
            url: d.url || (r.test_key + '.html'),
            created_at: r.created_at
          };
        });
      }
    });
  }

  // ---------- 시작 ----------
  function start() {
    if (!CG()) return;
    mountPanel();
    var info = parseResultPage();
    CGAuth.onChange(function (s) {
      if (!s.isLoggedIn) return;
      markVisited(info);
      if (info) saveResult(info);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();

  window.MindtestSync = { parseResultPage: parseResultPage };
})();
