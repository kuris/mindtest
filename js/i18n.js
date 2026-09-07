/* js/i18n.js — 마인드테스트 다국어(i18n) 엔진
 * 지원 언어: 한국어(ko), 영어(en), 일본어(ja), 중국어(zh), 스페인어(es), 포르투갈어(pt)
 */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'ja', 'zh', 'es', 'pt'];
  var FLAGS = { ko: '🇰🇷', en: '🇺🇸', ja: '🇯🇵', zh: '🇨🇳', es: '🇪🇸', pt: '🇧🇷' };
  var NAMES = { ko: '한국어', en: 'English', ja: '日本語', zh: '中文', es: 'Español', pt: 'Português' };

  /* 1. 현재 경로 및 베이스 확인 */
  var isResultPage = location.pathname.indexOf('/result/') !== -1;
  var basePath = isResultPage ? '../' : '';

  /* 2. 언어 감지 */
  var urlParams = new URLSearchParams(location.search);
  var urlLang = urlParams.get('lang');
  var savedLang = null;
  try { savedLang = localStorage.getItem('mindtest_lang'); } catch (e) {}

  var rawLang = urlLang || savedLang || (navigator.language || navigator.userLanguage || 'ko');
  var lang = (rawLang || 'ko').split('-')[0].toLowerCase();
  if (SUPPORTED.indexOf(lang) === -1) {
    lang = 'ko';
  }

  // URL에 명시되어 있다면 로컬스토리지에 동기화
  if (urlLang && SUPPORTED.indexOf(urlLang) !== -1) {
    try { localStorage.setItem('mindtest_lang', urlLang); } catch (e) {}
  } else if (urlLang === 'ko') {
    try { localStorage.removeItem('mindtest_lang'); } catch (e) {}
  }

  var isKo = (lang === 'ko');

  /* 3. 번역 파일 로드 (동기 document.write) */
  if (!isKo && !window.MINDTEST_TRANS) {
    var scriptSrc = basePath + 'translations/' + lang + '.js';
    if (document.readyState === 'loading') {
      document.write('<script src="' + scriptSrc + '"><\/script>');
    } else {
      var s = document.createElement('script');
      s.src = scriptSrc;
      s.async = false;
      s.onload = function () {
        patchAll();
      };
      document.head.appendChild(s);
    }
  }

  /* 4. TEST_DATA 패치 함수 (테스트 진행 페이지) */
  function patchTestData() {
    var T = window.MINDTEST_TRANS;
    if (!T || !window.TEST_DATA) return;
    var td = window.TEST_DATA;
    var tt = T.tests && T.tests[td.id];
    if (!tt) return;

    if (tt.title) td.title = tt.title;
    if (tt.subtitle) td.subtitle = tt.subtitle;
    if (tt.shareText) td.shareText = tt.shareText;

    if (tt.questions && td.questions) {
      tt.questions.forEach(function (qt, i) {
        if (!td.questions[i]) return;
        td.questions[i].q = qt.q;
        (qt.a || []).forEach(function (at, j) {
          if (td.questions[i].a && td.questions[i].a[j]) {
            td.questions[i].a[j].text = at;
          }
        });
      });
    }

    if (tt.results && td.results) {
      Object.keys(tt.results).forEach(function (slug) {
        if (td.results[slug]) Object.assign(td.results[slug], tt.results[slug]);
      });
    }

    if (tt.grades && td.grades) {
      tt.grades.forEach(function (g, i) {
        if (td.grades[i]) Object.assign(td.grades[i], g);
      });
    }

    if (tt.levels && td.levels) {
      tt.levels.forEach(function (l, i) {
        if (td.levels[i]) Object.assign(td.levels[i], l);
      });
    }
  }
  window.MINDTEST_PATCH_TEST_DATA = patchTestData;
  patchTestData();

  /* 5. DOM 패치 */
  function patchDOM() {
    var T = window.MINDTEST_TRANS;
    if (!T || isKo) {
      injectSwitcher();
      propagateLinks();
      return;
    }

    var ui = T.ui || {};

    // html lang 속성
    document.documentElement.lang = (lang === 'zh' ? 'zh-CN' : lang);

    // [data-i18n] 속성 요소들
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = ui[key];
      if (val !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else if (el.getAttribute('data-i18n-html')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // 헤더 로고 텍스트
    var brandLink = document.querySelector('.site-head a');
    if (brandLink) {
      brandLink.innerHTML = (ui['site.brand.mid'] || '마인드') + '<span class="dot">' + (ui['site.brand.dot'] || '테스트') + '</span>';
    }

    // 홈 화면 (index.html) 카드 & 메인 텍스트
    var cardList = document.querySelector('.card-list');
    if (cardList) {
      var mainTitle = document.querySelector('.wrap > .test-title');
      if (mainTitle && ui['site.tagline']) mainTitle.textContent = ui['site.tagline'];

      var mainLede = document.querySelector('.wrap > .lede');
      if (mainLede && ui['site.lede']) mainLede.textContent = ui['site.lede'];

      var cardTests = ['love', 'kkondae', 'vocab', 'burnout', 'digital', 'tmi', 'spelling', 'slang', 'money'];
      cardTests.forEach(function (tId) {
        var card = cardList.querySelector('a[href*="' + tId + '.html"]');
        if (card) {
          var h2 = card.querySelector('h2');
          var p = card.querySelector('p');
          var meta = card.querySelector('.meta');
          if (h2 && ui['card.' + tId + '.title']) h2.textContent = ui['card.' + tId + '.title'];
          if (p && ui['card.' + tId + '.desc']) p.textContent = ui['card.' + tId + '.desc'];
          if (meta && ui['card.' + tId + '.meta']) meta.textContent = ui['card.' + tId + '.meta'];
        }
      });
    }

    // 테스트 진행 페이지 (love.html, kkondae.html 등)
    var testTitle = document.querySelector('body[data-theme] h1.test-title');
    var theme = document.body.getAttribute('data-theme');
    if (testTitle && theme && T.tests && T.tests[theme]) {
      var icon = testTitle.textContent.split(' ')[0];
      testTitle.textContent = icon + ' ' + (T.tests[theme].title || testTitle.textContent);
    }
    var btnBack = document.getElementById('back');
    if (btnBack) btnBack.textContent = '← ' + (lang === 'en' ? 'Back' : lang === 'ja' ? '戻る' : lang === 'zh' ? '上一题' : lang === 'es' ? 'Atrás' : 'Voltar');

    // 결과 페이지 (result/*.html) 자동 감지 및 패치
    if (isResultPage || document.querySelector('.result-head')) {
      patchResultPage(T, ui);
    }

    // 푸터
    var foot = document.querySelector('.site-foot');
    if (foot) {
      var pFirst = foot.querySelector('p:first-child');
      if (pFirst && ui['site.footer']) {
        pFirst.innerHTML = '<a href="' + basePath + 'index.html">' + (ui['site.brand'] || 'MindTest') + '</a> · ' + ui['site.footer'];
      }
      var pSecond = foot.querySelector('p:last-child');
      if (pSecond && ui['site.sister']) {
        var sisterA = pSecond.querySelector('a');
        var sisterHref = sisterA ? sisterA.getAttribute('href') : 'https://hanja.chatgpts.kr/';
        var sisterName = sisterA ? sisterA.textContent : '한자야 놀자!';
        pSecond.innerHTML = ui['site.sister'] + ' <a href="' + sisterHref + '" rel="noopener">' + sisterName + '</a>';
      }
    }

    injectSwitcher();
    propagateLinks();
  }

  /* 6. 결과 페이지 패치 상세 */
  function patchResultPage(T, ui) {
    var filename = location.pathname.split('/').pop().replace('.html', '');
    // 예: love-romance-express, kkondae-1, vocab-4, burnout-2, digital-3, tmi-live-reporter
    var parts = filename.split('-');
    var testId = parts[0];
    var subSlug = parts.slice(1).join('-');

    var testObj = T.tests && T.tests[testId];
    if (!testObj) return;

    var resData = null;
    if (testObj.results && testObj.results[subSlug]) {
      resData = testObj.results[subSlug];
    } else if (testObj.grades) {
      var gradeIdx = parseInt(subSlug, 10) - 1;
      if (!isNaN(gradeIdx) && testObj.grades[gradeIdx]) {
        resData = testObj.grades[gradeIdx];
      }
    } else if (testObj.levels) {
      var levelMap = { '4': 0, '4b': 1, '5': 2, '6': 3, '7': 4, '8': 5 };
      var lIdx = levelMap[subSlug];
      if (lIdx !== undefined && testObj.levels[lIdx]) {
        resData = testObj.levels[lIdx];
      } else {
        var numIdx = parseInt(subSlug, 10) - 1;
        if (!isNaN(numIdx) && testObj.levels[numIdx]) {
          resData = testObj.levels[numIdx];
        }
      }
    }

    if (!resData) return;

    // 헤더 패치
    var kicker = document.querySelector('.result-kicker');
    if (kicker && ui['kicker.' + testId]) kicker.textContent = ui['kicker.' + testId];

    var rName = document.querySelector('.result-name');
    if (rName && resData.name) rName.textContent = resData.name;

    var headLede = document.querySelector('.result-head .lede');
    if (headLede && resData.summary) headLede.textContent = resData.summary;

    // 점수 배지 패치 (burnout, digital, kkondae, money)
    var badge = document.getElementById('score-badge') || document.querySelector('.score-badge') || document.querySelector('.result-score');
    if (badge && ui['badge.' + testId]) {
      var scoreMatch = badge.textContent.match(/(\d+)%/);
      var pctVal = scoreMatch ? scoreMatch[1] : '';
      if (pctVal) badge.textContent = ui['badge.' + testId].replace('{v}', pctVal);
    }

    // 패널들 패치
    var panels = document.querySelectorAll('.wrap > .panel');
    panels.forEach(function (panel) {
      var h2 = panel.querySelector('h2');
      if (!h2) return;
      var title = h2.textContent.trim();

      if (title.indexOf('어떤 사람') !== -1 || title.indexOf('진단') !== -1 || title.indexOf('어휘력') !== -1 || title.indexOf('수준') !== -1 || title.indexOf('스타일') !== -1 || title.indexOf('상태') !== -1) {
        if (ui['result.desc']) h2.textContent = ui['result.desc'];
        var p = panel.querySelector('p');
        if (p && resData.desc) p.textContent = resData.desc;
      } else if (title.indexOf('특징') !== -1) {
        if (ui['result.traits']) h2.textContent = ui['result.traits'];
        var ul = panel.querySelector('ul.traits');
        if (ul && resData.traits && resData.traits.length) {
          ul.innerHTML = resData.traits.map(function (tr) {
            return '<li>' + tr + '</li>';
          }).join('');
        }
      } else if (title.indexOf('조언') !== -1) {
        if (ui['result.tip']) h2.textContent = ui['result.tip'];
        var pTip = panel.querySelector('p');
        if (pTip && resData.tip) pTip.textContent = resData.tip;
      } else if (title.indexOf('잘 맞는') !== -1) {
        if (ui['result.match']) h2.textContent = ui['result.match'];
        var pMatch = panel.querySelector('p');
        if (pMatch && resData.match) {
          var matchLink = pMatch.querySelector('a');
          if (matchLink) {
            matchLink.textContent = resData.match;
          } else {
            pMatch.textContent = resData.match;
          }
        }
      }
    });

    // 버튼 텍스트
    var btnCopy = document.getElementById('copy');
    if (btnCopy && ui['btn.copy']) btnCopy.textContent = ui['btn.copy'];

    var btnTweet = document.getElementById('tweet');
    if (btnTweet && ui['btn.tweet']) {
      btnTweet.textContent = ui['btn.tweet'];
      var tweetText = (ui['site.brand'] || 'MindTest') + ' — ' + resData.name + (resData.summary ? ' (' + resData.summary + ')' : '');
      btnTweet.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText) + '&url=' + encodeURIComponent(location.href);
    }

    var shareHint = document.querySelector('.wrap > p.lede');
    if (shareHint && ui['share.hint']) shareHint.textContent = ui['share.hint'];

    var btnRetry = document.getElementById('retry');
    if (btnRetry && ui['btn.retry']) btnRetry.textContent = ui['btn.retry'];

    var otherBtn = document.querySelector('.btn-row a[href*="index.html"]');
    if (otherBtn && ui['btn.other']) otherBtn.textContent = ui['btn.other'];

    var toastEl = document.getElementById('toast');
    if (toastEl && ui['toast.copied']) toastEl.textContent = ui['toast.copied'];
  }

  /* 7. 내부 링크들에 lang 파라미터 자동 전파 */
  function propagateLinks() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) return;
      if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;

      try {
        var u = new URL(href, location.href);
        if (u.origin === location.origin) {
          if (isKo) {
            u.searchParams.delete('lang');
          } else {
            u.searchParams.set('lang', lang);
          }
          a.setAttribute('href', u.pathname.replace(location.origin, '') + u.search + u.hash);
        }
      } catch (e) {}
    });
  }

  /* 8. 언어 스위처 및 패밀리 서비스 UI 주입 */
  function injectSwitcher() {
    var head = document.querySelector('.site-head');
    if (!head || document.getElementById('lang-switcher')) return;

    var currentLang = isKo ? 'ko' : lang;

    var actions = document.getElementById('head-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.id = 'head-actions';
      actions.className = 'site-head-actions';
      head.appendChild(actions);
    }

    // 8-1. 패밀리 서비스 드롭다운
    var famWrap = document.createElement('div');
    famWrap.className = 'family-nav-wrap';
    famWrap.innerHTML = [
      '<button type="button" class="family-btn" id="family-btn">',
      '  다른 놀자 서비스 <span style="font-size: 10px; margin-left: 2px;">▾</span>',
      '</button>',
      '<div class="family-dropdown" id="family-dropdown">',
      '  <a href="https://hanja.chatgpts.kr" target="_blank" rel="noopener"><span>📖</span> <span>한자야 놀자</span></a>',
      '  <a href="https://voca.chatgpts.kr" target="_blank" rel="noopener"><span>⚡</span> <span>단어야 놀자</span></a>',
      '  <a href="https://fortune.chatgpts.kr" target="_blank" rel="noopener"><span>🔮</span> <span>운세야 놀자</span></a>',
      '  <a href="https://chatgpts.kr" target="_blank" rel="noopener"><span>🏠</span> <span>chatgpts.kr</span></a>',
      '</div>'
    ].join('');
    actions.appendChild(famWrap);

    var famBtn = famWrap.querySelector('#family-btn');
    var famDrop = famWrap.querySelector('#family-dropdown');

    // 8-2. 언어 스위처
    var wrapper = document.createElement('div');
    wrapper.id = 'lang-switcher';
    wrapper.setAttribute('aria-label', 'Language switcher');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'lang-btn';
    btn.innerHTML = '<span class="lang-flag">' + FLAGS[currentLang] + '</span> <span class="lang-name">' + NAMES[currentLang] + '</span> <span class="lang-arrow">▾</span>';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');

    var dropdown = document.createElement('ul');
    dropdown.id = 'lang-dropdown';
    dropdown.setAttribute('role', 'listbox');
    dropdown.hidden = true;

    famBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !famDrop.classList.contains('show');
      dropdown.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      if (willOpen) {
        famDrop.classList.add('show');
      } else {
        famDrop.classList.remove('show');
      }
    });

    var allLangs = ['ko', 'en', 'ja', 'zh', 'es', 'pt'];
    allLangs.forEach(function (l) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', l === currentLang ? 'true' : 'false');
      if (l === currentLang) li.className = 'active';

      var a = document.createElement('a');
      var url = new URL(location.href);
      if (l === 'ko') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', l);
      }
      a.href = url.toString();
      a.innerHTML = '<span class="lang-flag">' + FLAGS[l] + '</span> <span>' + NAMES[l] + '</span>';
      a.addEventListener('click', function (e) {
        try {
          if (l === 'ko') {
            localStorage.removeItem('mindtest_lang');
          } else {
            localStorage.setItem('mindtest_lang', l);
          }
        } catch (err) {}
      });

      li.appendChild(a);
      dropdown.appendChild(li);
    });

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      famDrop.classList.remove('show');
      var open = !dropdown.hidden;
      dropdown.hidden = open;
      btn.setAttribute('aria-expanded', String(!open));
    });

    document.addEventListener('click', function () {
      dropdown.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      famDrop.classList.remove('show');
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);
    actions.appendChild(wrapper);
  }

  function patchAll() {
    patchTestData();
    patchDOM();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchAll);
  } else {
    patchAll();
  }
})();
