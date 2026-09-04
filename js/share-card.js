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

    // 배지 점수 (burnout, digital, kkondae)
    var badgeEl = document.querySelector('.score-badge');
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
    love:    { primary: '#ff5e62', gradient: ['#ff9966', '#ff5e62'], soft: '#fff1f0', badge: '#ff4757' },
    kkondae: { primary: '#4a5b8c', gradient: ['#5b6e9c', '#384872'], soft: '#eef2fb', badge: '#2f3542' },
    vocab:   { primary: '#27ae60', gradient: ['#2ecc71', '#27ae60'], soft: '#eafaf1', badge: '#1e824c' },
    burnout: { primary: '#8e44ad', gradient: ['#9b59b6', '#8e44ad'], soft: '#f5eef8', badge: '#6c3483' },
    digital: { primary: '#0984e3', gradient: ['#74b9ff', '#0984e3'], soft: '#e8f4fd', badge: '#00cec9' },
    tmi:     { primary: '#e67e22', gradient: ['#f39c12', '#e67e22'], soft: '#fef5ec', badge: '#d35400' }
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

  /* ── 4. 모바일용 고화질 결과 카드 Canvas 생성 (1080 × 1400) ── */
  function generateCardCanvas(data, callback) {
    var canvas = document.createElement('canvas');
    var w = 1080;
    var h = 1420;
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');

    var theme = THEME_COLORS[data.testId] || THEME_COLORS.love;

    // 1) 배경 그라디언트
    var bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#fdfbfb');
    bgGrad.addColorStop(1, '#ebedee');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 배경 상단 테마 오로라 글로우
    var auraGrad = ctx.createRadialGradient(w / 2, 260, 50, w / 2, 260, 550);
    auraGrad.addColorStop(0, theme.primary + '33');
    auraGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = auraGrad;
    ctx.fillRect(0, 0, w, 800);

    // 2) 메인 화이트 라운드 카드
    var cx = 60, cy = 70, cw = 960, ch = 1280, cr = 48;
    drawRoundRect(ctx, cx, cy, cw, ch, cr);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 16;
    ctx.fill();
    ctx.shadowColor = 'transparent'; // 그림자 리셋

    // 카드 테두리
    ctx.strokeStyle = theme.primary + '25';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3) 상단 브랜드 캡슐 태그
    var tagText = '마인드테스트  ·  ' + (data.kicker || '심리테스트 결과');
    ctx.font = '600 26px -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif';
    var tagW = ctx.measureText(tagText).width + 50;
    var tagX = (w - tagW) / 2;
    var tagY = 120;
    drawRoundRect(ctx, tagX, tagY, tagW, 46, 23);
    ctx.fillStyle = theme.soft;
    ctx.fill();
    ctx.fillStyle = theme.primary;
    ctx.textAlign = 'center';
    ctx.fillText(tagText, w / 2, tagY + 32);

    // 4) 거대 이모지
    ctx.font = '120px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(data.emoji, w / 2, 330);

    // 5) 결과명 (볼드)
    ctx.fillStyle = '#1e272e';
    ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif';
    ctx.fillText(data.name, w / 2, 420);

    // 6) 요약 멘트 ("...")
    ctx.fillStyle = '#57606f';
    ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif';
    wrapText(ctx, '“' + data.summary + '”', w / 2, 475, 820, 38);

    // 7) 배지 (있는 경우)
    var contentStartY = 540;
    if (data.badge) {
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif';
      var badgeW = ctx.measureText(data.badge).width + 44;
      var badgeX = (w - badgeW) / 2;
      drawRoundRect(ctx, badgeX, 530, badgeW, 42, 21);
      ctx.fillStyle = theme.primary + '18';
      ctx.fill();
      ctx.fillStyle = theme.primary;
      ctx.fillText(data.badge, w / 2, 560);
      contentStartY = 600;
    }

    // 8) 핵심 특징 리스트 박스
    var boxX = 110, boxY = contentStartY + 15, boxW = 860, boxH = 410;
    drawRoundRect(ctx, boxX, boxY, boxW, boxH, 32);
    ctx.fillStyle = '#f8f9fa';
    ctx.fill();
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 특징 박스 헤더
    ctx.fillStyle = '#2f3542';
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('✨  주요 특징', boxX + 36, boxY + 54);

    // 특징 항목 3개
    var tY = boxY + 115;
    data.traits.forEach(function (tr, idx) {
      // 불릿 아이콘
      drawRoundRect(ctx, boxX + 36, tY - 24, 28, 28, 8);
      ctx.fillStyle = theme.primary;
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(idx + 1), boxX + 50, tY - 3);

      // 특징 텍스트
      ctx.fillStyle = '#2f3542';
      ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif';
      ctx.textAlign = 'left';
      wrapText(ctx, tr, boxX + 80, tY, 730, 36);

      tY += 95;
    });

    // 9) 카드 하단 푸터 & CTA
    var footY = boxY + boxH + 65;
    ctx.textAlign = 'center';
    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif';
    ctx.fillText('너는 어떤 유형이야? 지금 확인해봐 👉', w / 2, footY);

    ctx.fillStyle = '#a4b0be';
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('mindtest.chatgpts.kr', w / 2, footY + 45);

    callback(canvas);
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
        copied: '💬 재치있는 멘트와 링크를 복사했어요! 카톡에 붙여넣어 보세요 🎉'
      },
      en: {
        shareMain: '🚀 Share Result with Friends',
        shareSub: 'Send result image + witty text + link together',
        saveImg: '🖼️ Save Result Card Image',
        copySmart: '💬 Copy Witty Message & Link',
        tip: '💡 Share to WhatsApp, Instagram & group chats to compare types!',
        imgSaved: '🖼️ Result card image saved to your device!',
        copied: '💬 Witty message & link copied! Paste it in your chat 🎉'
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
        var ok = downloadCanvasImage(canvas, data.filename);
        if (ok) showToast(lb.imgSaved);
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
