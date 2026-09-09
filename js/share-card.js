/* js/share-card.js — 결과 카드 이미지 생성 & 재치있는 바이럴 공유 엔진
 * 기능:
 * 1. 모바일 최적화 고화질 결과 카드 이미지(Canvas) 실시간 생성
 * 2. 모바일 Web Share API (이미지 + 재치있는 멘트 + 링크 한 번에 공유)
 * 3. 결과 카드 이미지 갤러리 저장 (다운로드)
 * 4. 재치있는 바이럴 멘트 + 링크 원클릭 복사
 * 5. 다국어(ko, en, ja, zh, es, pt) 완벽 대응
 */
(function () {
  'use strict';

  // 결과 페이지가 아니면 종료
  if (location.pathname.indexOf('/result/') === -1 && !document.querySelector('.result-head')) {
    return;
  }

  /* ── 1. 현재 페이지 데이터 추출 ── */
  function getPageData() {
    var filename = location.pathname.split('/').pop().replace('.html', '');
    var parts = filename.split('-');
    var testId = parts[0] || 'love';

    var rKicker = (document.querySelector('.result-kicker') || {}).textContent || '';
    var rEmoji = (document.querySelector('.result-emoji') || {}).textContent || '✨';
    var rName = (document.querySelector('.result-name') || {}).textContent || '';
    var rSummary = (document.querySelector('.result-head .lede') || {}).textContent || '';

    // 배지 점수 (burnout, digital, kkondae, money, spelling, slang)
    var badgeEl = document.getElementById('score-badge') || document.querySelector('.score-badge') || document.querySelector('.result-score');
    var badgeText = badgeEl ? badgeEl.textContent.trim() : '';

    // 특징 3~4개 추출
    var traits = [];
    document.querySelectorAll('.panel ul.traits li').forEach(function (li) {
      var t = li.textContent.trim();
      if (t) traits.push(t);
    });

    var urlParams = new URLSearchParams(location.search);
    var lang = urlParams.get('lang') || (document.documentElement.lang || 'ko').split('-')[0];

    return {
      testId: testId,
      filename: filename,
      kicker: rKicker.trim(),
      emoji: rEmoji.trim(),
      name: rName.trim(),
      summary: rSummary.trim(),
      badge: badgeText,
      traits: traits.slice(0, 3),
      lang: lang,
      url: location.href,
      testUrl: location.origin + '/' + testId + '.html' + (lang && lang !== 'ko' ? '?lang=' + lang : '')
    };
  }

  /* ── 2. 테마별 컬러 팔레트 ── */
  var THEME_COLORS = {
    love:     { primary: '#ff5e62', gradient: ['#ff9966', '#ff5e62'], soft: '#fff1f0', badge: '#ff4757' },
    kkondae:  { primary: '#4a5b8c', gradient: ['#5b6e9c', '#384872'], soft: '#eef2fb', badge: '#2f3542' },
    vocab:    { primary: '#27ae60', gradient: ['#2ecc71', '#27ae60'], soft: '#eafaf1', badge: '#1e824c' },
    burnout:  { primary: '#8e44ad', gradient: ['#9b59b6', '#8e44ad'], soft: '#f5eef8', badge: '#6c3483' },
    digital:  { primary: '#0984e3', gradient: ['#74b9ff', '#0984e3'], soft: '#e8f4fd', badge: '#00cec9' },
    tmi:      { primary: '#e67e22', gradient: ['#f39c12', '#e67e22'], soft: '#fef5ec', badge: '#d35400' },
    spelling: { primary: '#2563eb', gradient: ['#3b82f6', '#1d4ed8'], soft: '#eff6ff', badge: '#1e40af' },
    slang:    { primary: '#8b5cf6', gradient: ['#a855f7', '#7c3aed'], soft: '#f5f3ff', badge: '#6d28d9' },
    money:    { primary: '#059669', gradient: ['#10b981', '#047857'], soft: '#ecfdf5', badge: '#065f46' }
  };

  /* ── 3. 재치있는 멘트 템플릿 생성 ── */
  function buildWittyMessage(data) {
    var l = data.lang;
    var traitLines = data.traits.map(function (t) { return '• ' + t; }).join('\n');

    if (l === 'en') {
      return [
        data.emoji + ' [' + data.kicker + ']',
        'My type: ' + data.name,
        '"' + data.summary + '"',
        data.badge ? '👉 ' + data.badge : '',
        '',
        '✨ Key traits:',
        traitLines,
        '',
        'What type are you? Take this 3-minute quiz!',
        '👉 Test here: ' + data.testUrl,
        '🔍 View my full result: ' + data.url
      ].filter(Boolean).join('\n');
    }

    if (l === 'ja') {
      return [
        data.emoji + ' 【' + data.kicker + '】',
        '私の診断タイプ: ' + data.name,
        '「' + data.summary + '」',
        data.badge ? '👉 ' + data.badge : '',
        '',
        '✨ 主な特徴:',
        traitLines,
        '',
        'あなたは何タイプ？3分でサクッと診断してみて！',
        '👉 テストを受ける: ' + data.testUrl,
        '🔍 私の結果を詳しく見る: ' + data.url
      ].filter(Boolean).join('\n');
    }

    if (l === 'zh') {
      return [
        data.emoji + ' 【' + data.kicker + '】',
        '我的测试结果: ' + data.name,
        '“' + data.summary + '”',
        data.badge ? '👉 ' + data.badge : '',
        '',
        '✨ 核心特征:',
        traitLines,
        '',
        '测测你是什么类型？3分钟心理测试！',
        '👉 立即测试: ' + data.testUrl,
        '🔍 查看我的完整结果: ' + data.url
      ].filter(Boolean).join('\n');
    }

    if (l === 'es') {
      return [
        data.emoji + ' [' + data.kicker + ']',
        'Mi tipo: ' + data.name,
        '"' + data.summary + '"',
        data.badge ? '👉 ' + data.badge : '',
        '',
        '✨ Características principales:',
        traitLines,
        '',
        '¿Qué tipo eres tú? ¡Pruébalo en 3 minutos!',
        '👉 Hacer el test: ' + data.testUrl,
        '🔍 Ver mi resultado completo: ' + data.url
      ].filter(Boolean).join('\n');
    }

    if (l === 'pt') {
      return [
        data.emoji + ' [' + data.kicker + ']',
        'Meu tipo: ' + data.name,
        '"' + data.summary + '"',
        data.badge ? '👉 ' + data.badge : '',
        '',
        '✨ Principais características:',
        traitLines,
        '',
        'Qual é o seu tipo? Faça este teste de 3 minutos!',
        '👉 Fazer o teste: ' + data.testUrl,
        '🔍 Ver meu resultado: ' + data.url
      ].filter(Boolean).join('\n');
    }

    // 한국어 (기본) - 테스트별 맞춤형 재치 멘트
    var intro = '';
    var callToAction = '';

    if (data.testId === 'love') {
      intro = '💘 [연애 스타일 테스트 결과]\n내 연애 유형은? 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '너는 연애할 때 어떤 스타일이야? 3분 만에 알아봐!';
    } else if (data.testId === 'kkondae') {
      intro = '🗿 [꼰대력 테스트 결과]\n내 꼰대 성적표 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '너는 꼰대 지수 몇 % 나올 것 같아? 솔직하게 해봐 ㅋㅋㅋ';
    } else if (data.testId === 'vocab') {
      intro = '📖 [한자어 어휘력 테스트 결과]\n내 어휘력 급수 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '심심한 사과, 무운을 빈다 헷갈리는 사람 소환! 10문제 대결 ㄱㄱ';
    } else if (data.testId === 'burnout') {
      intro = '🧠 [번아웃 자가진단 결과]\n내 번아웃 상태 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '요즘 다들 영혼 탈곡 중이라던데 너는 괜찮아? 내 수치랑 비교해봐!';
    } else if (data.testId === 'digital') {
      intro = '📱 [디지털 중독 테스트 결과]\n내 스마트폰 의존도 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '눈 뜨자마자 폰, 밥 먹을 때도 폰... 너도 혹시 중독? 재봐!';
    } else if (data.testId === 'tmi') {
      intro = '🗣️ [TMI 대화 유형 테스트 결과]\n내 대화 스타일 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '단톡방에서 내 말투 그대로 나와서 소름 돋음 ㅋㅋㅋ 너는 어떤 유형?';
    } else if (data.testId === 'spelling') {
      intro = '✍️ [맞춤법 능력 테스트 결과]\n내 맞춤법 등급 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '며칠/몇일, 봬요/뵈요 아직도 헷갈려? 10문제로 맞춤법 레벨 인증해봐!';
    } else if (data.testId === 'slang') {
      intro = '⚡ [MZ 신조어 테스트 결과]\n내 트렌드 지수 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '중꺾마, 분좋카, 핑프 다 알아? 요즘 밈력 몇 등급인지 대결해봐 ㅋㅋㅋ';
    } else if (data.testId === 'money') {
      intro = '💸 [소비 성향 머니 테스트 결과]\n내 소비 스타일 👉 ' + data.name + ' ' + data.emoji;
      callToAction = '월급날 통장 텅장 되는 사람 필수! 내 소비 지수랑 비교해봐 ㅋㅋㅋ';
    } else {
      intro = data.emoji + ' [마인드테스트 결과]\n나의 유형: ' + data.name;
      callToAction = '너는 어떤 유형인지 해봐!';
    }

    return [
      intro,
      '"' + data.summary + '"',
      data.badge ? '📊 ' + data.badge : '',
      '',
      '✨ 나의 주요 특징:',
      traitLines,
      '',
      callToAction,
      '👉 테스트하러 가기: ' + data.testUrl,
      '🔍 내 결과 전체보기: ' + data.url
    ].filter(Boolean).join('\n');
  }

  /* ── 4. 모바일용 고화질 결과 카드 Canvas 생성 (1080 × 1460) ── */
  function generateCardCanvas(data, callback) {
    function render() {
      var canvas = document.createElement('canvas');
      var w = 1080;
      var h = 1460;
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext('2d');

      var theme = THEME_COLORS[data.testId] || THEME_COLORS.love;

      // 1) 전체 배경: 따뜻하고 부드러운 파스텔 테마 그라디언트
      var bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, theme.soft);
      bgGrad.addColorStop(0.5, '#ffffff');
      bgGrad.addColorStop(1, theme.soft);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 귀여운 배경 데코레이션 (파스텔 원 & 반짝이 별들)
      ctx.fillStyle = theme.primary + '18';
      ctx.beginPath(); ctx.arc(100, 120, 160, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(w - 80, 220, 140, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(120, h - 140, 130, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(w - 120, h - 200, 180, 0, Math.PI * 2); ctx.fill();

      // 반짝이 별 데코레이션 함수
      function drawSparkle(x, y, size, color) {
        ctx.fillStyle = color;
        ctx.font = size + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✨', x, y);
      }
      drawSparkle(90, 260, 36, theme.primary);
      drawSparkle(w - 100, 140, 32, theme.primary);
      drawSparkle(w - 85, 420, 28, theme.primary);
      drawSparkle(80, h - 340, 30, theme.primary);

      // 2) 메인 라운드 화이트 카드
      var cx = 55, cy = 60, cw = 970, ch = 1340, cr = 44;
      drawRoundRect(ctx, cx, cy, cw, ch, cr);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.09)';
      ctx.shadowBlur = 45;
      ctx.shadowOffsetY = 18;
      ctx.fill();
      ctx.shadowColor = 'transparent'; // 그림자 리셋

      // 카드 테두리 (은은한 파스텔 듀얼 테두리)
      ctx.strokeStyle = theme.primary + '28';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 카드 상단 귀여운 파스텔 헤더 바
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx + cr, cy);
      ctx.lineTo(cx + cw - cr, cy);
      ctx.quadraticCurveTo(cx + cw, cy, cx + cw, cy + cr);
      ctx.lineTo(cx + cw, cy + 18);
      ctx.lineTo(cx, cy + 18);
      ctx.lineTo(cx, cy + cr);
      ctx.quadraticCurveTo(cx, cy, cx + cr, cy);
      ctx.closePath();
      var topBarGrad = ctx.createLinearGradient(cx, cy, cx + cw, cy);
      topBarGrad.addColorStop(0, theme.gradient[0]);
      topBarGrad.addColorStop(1, theme.gradient[1]);
      ctx.fillStyle = topBarGrad;
      ctx.fill();
      ctx.restore();

      // 3) 상단 브랜드 & 테스트 이름 캡슐 태그
      var tagText = '마인드테스트  ·  ' + (data.kicker || '심리테스트 결과');
      ctx.font = '600 24px "Jua", "Gowun Dodum", sans-serif';
      var tagW = ctx.measureText(tagText).width + 48;
      var tagX = (w - tagW) / 2;
      var tagY = 110;
      drawRoundRect(ctx, tagX, tagY, tagW, 44, 22);
      ctx.fillStyle = theme.soft;
      ctx.fill();
      ctx.fillStyle = theme.primary;
      ctx.textAlign = 'center';
      ctx.fillText(tagText, w / 2, tagY + 31);

      // 4) 거대 이모지 & 푹신한 파스텔 원형 배경 (Pedestal)
      var emojiCenterY = 275;
      var emojiPedestalR = 82;
      ctx.beginPath();
      ctx.arc(w / 2, emojiCenterY, emojiPedestalR, 0, Math.PI * 2);
      var emojiGrad = ctx.createRadialGradient(w / 2, emojiCenterY - 20, 10, w / 2, emojiCenterY, emojiPedestalR);
      emojiGrad.addColorStop(0, '#ffffff');
      emojiGrad.addColorStop(1, theme.soft);
      ctx.fillStyle = emojiGrad;
      ctx.shadowColor = theme.primary + '30';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // 이모지 주변 링 테두리
      ctx.strokeStyle = theme.primary + '35';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 이모지 렌더링
      ctx.font = '105px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data.emoji, w / 2, emojiCenterY + 36);

      // 이모지 양옆 귀여운 미니 데코 (별 & 하트)
      ctx.font = '28px sans-serif';
      ctx.fillText('💫', w / 2 - 120, emojiCenterY - 25);
      ctx.fillText('💖', w / 2 + 120, emojiCenterY + 25);

      // 5) 결과명 (귀여운 Jua 볼드 폰트 + 형광펜 하이라이트)
      var nameY = 430;
      ctx.font = 'bold 58px "Jua", "Gowun Dodum", sans-serif';
      var nameW = ctx.measureText(data.name).width;

      // 형광펜 효과
      ctx.fillStyle = theme.primary + '25';
      drawRoundRect(ctx, (w - nameW) / 2 - 14, nameY - 20, nameW + 28, 30, 15);
      ctx.fill();

      // 결과명 텍스트
      ctx.fillStyle = '#1e272e';
      ctx.fillText(data.name, w / 2, nameY + 6);

      // 6) 요약 멘트 말풍선 박스 ("...")
      var quoteY = 475;
      ctx.font = '500 27px "Gowun Dodum", -apple-system, sans-serif';
      var quoteText = '“ ' + data.summary + ' ”';
      ctx.fillStyle = '#4b5563';
      wrapText(ctx, quoteText, w / 2, quoteY + 20, 780, 36);

      // 7) 배지 (소비지수, 점수, 정답수 등)
      var contentStartY = 550;
      if (data.badge) {
        ctx.font = 'bold 23px "Jua", "Gowun Dodum", sans-serif';
        var badgeW = ctx.measureText(data.badge).width + 46;
        var badgeX = (w - badgeW) / 2;
        var badgeY = contentStartY;
        drawRoundRect(ctx, badgeX, badgeY, badgeW, 42, 21);
        var badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY);
        badgeGrad.addColorStop(0, theme.gradient[0]);
        badgeGrad.addColorStop(1, theme.gradient[1]);
        ctx.fillStyle = badgeGrad;
        ctx.shadowColor = theme.primary + '40';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        ctx.fill();
        ctx.shadowColor = 'transparent';

        ctx.fillStyle = '#ffffff';
        ctx.fillText('✨ ' + data.badge, w / 2, badgeY + 29);
        contentStartY = 620;
      }

      // 8) 핵심 특징 리스트 박스 (둥글고 귀여운 카드형)
      var boxX = 100, boxY = contentStartY + 10, boxW = 880, boxH = 430;
      drawRoundRect(ctx, boxX, boxY, boxW, boxH, 32);
      ctx.fillStyle = theme.soft + '80'; // 은은한 파스텔 배경
      ctx.fill();
      ctx.strokeStyle = theme.primary + '20';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 특징 박스 헤더
      ctx.fillStyle = '#2c2a33';
      ctx.font = 'bold 28px "Jua", "Gowun Dodum", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('💖  나의 핵심 특징 & 매력', boxX + 40, boxY + 54);

      // 특징 항목 3개 (개별 미니 화이트 카드)
      var itemY = boxY + 86;
      var itemH = 92;
      var itemW = boxW - 60;
      var icons = ['🍀', '⭐', '⚡', '🌷'];

      data.traits.forEach(function (tr, idx) {
        // 개별 특징 화이트 라운드 바
        drawRoundRect(ctx, boxX + 30, itemY, itemW, itemH, 20);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.04)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        ctx.fill();
        ctx.shadowColor = 'transparent';

        // 미니 아이콘/숫자 뱃지
        drawRoundRect(ctx, boxX + 48, itemY + 22, 48, 48, 14);
        ctx.fillStyle = theme.soft;
        ctx.fill();
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(icons[idx % icons.length], boxX + 72, itemY + 56);

        // 특징 문구 텍스트
        ctx.fillStyle = '#2d3748';
        ctx.font = '500 26px "Gowun Dodum", -apple-system, sans-serif';
        ctx.textAlign = 'left';
        wrapText(ctx, tr, boxX + 115, itemY + 54, itemW - 135, 34);

        itemY += itemH + 16;
      });

      // 9) 카드 하단 인스타/카톡 유도 배너 & 워터마크
      var footY = boxY + boxH + 60;
      var ctaW = 540;
      var ctaH = 64;
      var ctaX = (w - ctaW) / 2;
      drawRoundRect(ctx, ctaX, footY, ctaW, ctaH, 32);
      var ctaGrad = ctx.createLinearGradient(ctaX, footY, ctaX + ctaW, footY);
      ctaGrad.addColorStop(0, theme.gradient[0]);
      ctaGrad.addColorStop(1, theme.gradient[1]);
      ctx.fillStyle = ctaGrad;
      ctx.shadowColor = theme.primary + '50';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 6;
      ctx.fill();
      ctx.shadowColor = 'transparent';

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px "Jua", "Gowun Dodum", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👉  너도 해봐! mind.chatgpts.kr', w / 2, footY + 43);

      // 최하단 카피라이트
      ctx.fillStyle = '#9ca3af';
      ctx.font = '500 20px "Gowun Dodum", sans-serif';
      ctx.fillText('마인드테스트 · 3분이면 끝나는 심리테스트 모음', w / 2, footY + 105);

      callback(canvas);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(render).catch(render);
    } else {
      render();
    }
  }

  // 둥근 사각형 그리기 헬퍼
  function drawRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // 줄바꿈 텍스트 헬퍼
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split('');
    var line = '';
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n];
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  /* ── 5. 이미지 다운로드 헬퍼 ── */
  function downloadCanvasImage(canvas, filename) {
    try {
      var link = document.createElement('a');
      link.download = filename + '-result-card.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (e) {
      console.error('Download failed', e);
      return false;
    }
  }

  /* ── 5-1. 모바일 & 데스크톱 결과 카드 미리보기 모달 ── */
  function showCardModal(canvas, data, lb) {
    var existing = document.getElementById('card-preview-modal');
    if (existing) existing.remove();

    var dataUrl = canvas.toDataURL('image/png');

    var modal = document.createElement('div');
    modal.id = 'card-preview-modal';
    modal.className = 'card-modal-backdrop';

    modal.innerHTML = [
      '<div class="card-modal-content" role="dialog" aria-modal="true">',
      '  <div class="card-modal-header">',
      '    <div class="card-modal-title">' + lb.modalTitle + '</div>',
      '    <button type="button" class="card-modal-close-btn" id="modal-close-x" aria-label="Close">✕</button>',
      '  </div>',
      '  <div class="card-modal-img-wrap">',
      '    <img src="' + dataUrl + '" class="card-modal-img" alt="' + data.name + ' 결과 카드" />',
      '  </div>',
      '  <p class="card-modal-tip">' + lb.modalTip + '</p>',
      '  <div class="card-modal-actions">',
      '    <button type="button" class="card-modal-btn-download" id="modal-btn-download">',
      '      ' + lb.btnDownload,
      '    </button>',
      '    <button type="button" class="card-modal-btn-copy" id="modal-btn-copy">',
      '      ' + lb.copySmart,
      '    </button>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);

    // 강제 리플로우 후 표시
    modal.offsetHeight;
    modal.classList.add('show');

    function closeModal() {
      modal.classList.remove('show');
      setTimeout(function () {
        if (modal.parentNode) modal.parentNode.removeChild(modal);
      }, 250);
    }

    // 닫기 이벤트
    document.getElementById('modal-close-x').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // 다운로드 버튼
    document.getElementById('modal-btn-download').addEventListener('click', function () {
      var ok = downloadCanvasImage(canvas, data.filename);
      if (ok) showToast(lb.imgSaved);
    });

    // 멘트 복사 버튼
    document.getElementById('modal-btn-copy').addEventListener('click', function () {
      var msg = buildWittyMessage(data);
      copyText(msg, lb.copied);
    });
  }

  /* ── 6. 토스트 알림 ── */
  function showToast(msg) {
    var toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 2400);
  }

  /* ── 7. 클립보드 복사 헬퍼 ── */
  function copyText(text, successMsg) {
    if (navigator.clipboard && location.protocol !== 'file:') {
      navigator.clipboard.writeText(text).then(
        function () { showToast(successMsg); },
        function () { fallbackCopy(text, successMsg); }
      );
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
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
    showToast(ok ? successMsg : '복사하지 못했습니다. 주소창의 링크를 복사해주세요.');
  }

  /* ── 8. 모바일 네이티브 공유 및 통합 액션 ── */
  function handleMainShare(data) {
    var wittyText = buildWittyMessage(data);

    // 캔버스 생성 후 파일 공유 시도
    generateCardCanvas(data, function (canvas) {
      if (canvas.toBlob && navigator.canShare) {
        canvas.toBlob(function (blob) {
          if (!blob) {
            fallbackShare(wittyText, data);
            return;
          }
          var file = new File([blob], data.filename + '.png', { type: 'image/png' });

          if (navigator.canShare({ files: [file] })) {
            navigator.share({
              title: data.kicker + ' — ' + data.name,
              text: wittyText,
              files: [file]
            }).catch(function (err) {
              if (err.name !== 'AbortError') {
                fallbackShare(wittyText, data);
              }
            });
          } else {
            fallbackShare(wittyText, data);
          }
        }, 'image/png');
      } else {
        fallbackShare(wittyText, data);
      }
    });
  }

  function fallbackShare(wittyText, data) {
    if (navigator.share) {
      navigator.share({
        title: data.kicker + ' — ' + data.name,
        text: wittyText,
        url: data.url
      }).catch(function (e) {});
    } else {
      copyText(wittyText, '🚀 재치있는 멘트와 링크를 복사했어요! 카톡에 붙여넣어 보세요 🎉');
    }
  }

  /* ── 9. 공유 UI 렌더링 및 주입 ── */
  function injectShareUI() {
    var oldBtnRow = document.querySelector('.btn-row.two');
    if (!oldBtnRow || document.getElementById('smart-share-box')) return;

    var data = getPageData();
    var l = data.lang;

    // 언어별 UI 라벨
    var LABELS = {
      ko: {
        shareMain: '🚀 친구에게 결과 공유하기',
        shareSub: '이미지 + 재치있는 멘트 + 링크 함께 전송',
        saveImg: '🖼️ 모바일 결과 카드 저장',
        copySmart: '💬 재치있는 멘트+링크 복사',
        tip: '💡 카톡·인스타·단톡방에 공유하고 친구의 유형과 비교해보세요!',
        imgSaved: '🖼️ 결과 카드 이미지가 저장되었어요! 갤러리를 확인해보세요.',
        copied: '💬 재치있는 멘트와 링크를 복사했어요! 카톡에 붙여넣어 보세요 🎉',
        modalTitle: '🖼️ 내 결과 카드 미리보기 & 저장',
        modalTip: '💡 모바일(카톡/인스타)에서는 카드를 길게 꾹 눌러서 바로 사진첩에 저장하실 수 있어요! 📸',
        btnDownload: '📥 이미지 파일로 저장하기'
      },
      en: {
        shareMain: '🚀 Share Result with Friends',
        shareSub: 'Send result image + witty text + link together',
        saveImg: '🖼️ Save Result Card Image',
        copySmart: '💬 Copy Witty Message & Link',
        tip: '💡 Share to WhatsApp, Instagram & group chats to compare types!',
        imgSaved: '🖼️ Result card image saved to your device!',
        copied: '💬 Witty message & link copied! Paste it in your chat 🎉',
        modalTitle: '🖼️ Result Card Preview & Save',
        modalTip: '💡 On mobile, touch and hold the card to save directly to your photos! 📸',
        btnDownload: '📥 Download Card Image'
      },
      ja: {
        shareMain: '🚀 友達に結果をシェアする',
        shareSub: '画像＋ユニークな文面＋リンクをまとめて送信',
        saveImg: '🖼️ 結果カード画像を保存',
        copySmart: '💬 楽しい文面とリンクをコピー',
        tip: '💡 LINEやInstagramで友達とタイプを比べてみよう！',
        imgSaved: '🖼️ 結果カード画像を保存しました！',
        copied: '💬 メッセージとリンクをコピーしました！LINEに貼り付けてね 🎉'
      },
      zh: {
        shareMain: '🚀 分享结果给好友',
        shareSub: '结果图片 + 趣味文案 + 链接一并分享',
        saveImg: '🖼️ 保存手机结果卡片',
        copySmart: '💬 复制趣味文案与链接',
        tip: '💡 分享到微信、朋友圈，和好友对比性格类型！',
        imgSaved: '🖼️ 结果图片已保存至相册！',
        copied: '💬 趣味文案与链接已复制！去粘贴分享吧 🎉'
      },
      es: {
        shareMain: '🚀 Compartir con amigos',
        shareSub: 'Imagen del resultado + texto divertido + enlace',
        saveImg: '🖼️ Guardar imagen de tarjeta',
        copySmart: '💬 Copiar mensaje ingenioso',
        tip: '💡 ¡Comparte en WhatsApp o Instagram y compara con tus amigos!',
        imgSaved: '🖼️ ¡Imagen de resultado guardada!',
        copied: '💬 ¡Mensaje y enlace copiados con éxito! 🎉'
      },
      pt: {
        shareMain: '🚀 Compartilhar com amigos',
        shareSub: 'Imagem do resultado + texto divertido + link',
        saveImg: '🖼️ Salvar cartão de imagem',
        copySmart: '💬 Copiar mensagem e link',
        tip: '💡 Compartilhe no WhatsApp ou Instagram e compare com amigos!',
        imgSaved: '🖼️ Cartão de imagem salvo!',
        copied: '💬 Mensagem divertida e link copiados! Cole no WhatsApp 🎉'
      }
    };

    var lb = LABELS[l] || LABELS.ko;

    var container = document.createElement('div');
    container.id = 'smart-share-box';
    container.className = 'smart-share-box';

    container.innerHTML = [
      '<button type="button" class="btn btn-share-hero" id="btn-share-all">',
      '  <div class="share-hero-content">',
      '    <span class="share-hero-title">' + lb.shareMain + '</span>',
      '    <span class="share-hero-sub">' + lb.shareSub + '</span>',
      '  </div>',
      '</button>',
      '<div class="btn-share-sub-row">',
      '  <button type="button" class="btn btn-share-sub" id="btn-save-card">',
      '    ' + lb.saveImg,
      '  </button>',
      '  <button type="button" class="btn btn-share-sub" id="btn-copy-witty">',
      '    ' + lb.copySmart,
      '  </button>',
      '</div>',
      '<p class="smart-share-tip">' + lb.tip + '</p>'
    ].join('');

    // 기존의 단순 링크 복사 버튼 대체 (트위터 링크 등 기존 편의성 보존)
    oldBtnRow.parentNode.insertBefore(container, oldBtnRow);
    oldBtnRow.style.display = 'none'; // 기존 단순 복사 버튼 영역 숨김

    // 이벤트 리스너 연결
    document.getElementById('btn-share-all').addEventListener('click', function () {
      handleMainShare(data);
    });

    document.getElementById('btn-save-card').addEventListener('click', function () {
      generateCardCanvas(data, function (canvas) {
        downloadCanvasImage(canvas, data.filename);
        showCardModal(canvas, data, lb);
        showToast(lb.imgSaved);
      });
    });

    document.getElementById('btn-copy-witty').addEventListener('click', function () {
      var msg = buildWittyMessage(data);
      copyText(msg, lb.copied);
    });
  }

  // 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectShareUI);
  } else {
    injectShareUI();
  }
})();
