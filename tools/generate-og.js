#!/usr/bin/env node
/**
 * generate-og.js
 * og/ 폴더에 34장의 OG 이미지를 SVG로 생성합니다.
 * 이미 AI로 만든 JPG 파일이 있는 슬러그는 건너뜁니다.
 * 
 * 실행: node tools/generate-og.js
 */

const fs = require('fs');
const path = require('path');

const OG_DIR = path.join(__dirname, '..', 'og');

// SVG 생성 함수
function makeSVG({ emoji, title, subtitle, bg1, bg2, brand = '마인드테스트' }) {
  // 글자 길이에 따라 폰트 크기 조절
  const titleFontSize = title.length <= 8 ? 88 : title.length <= 12 ? 72 : 60;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <!-- 배경 -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- 이모지 -->
  <text x="600" y="210" text-anchor="middle" font-size="160" font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif">${emoji}</text>
  <!-- 제목 -->
  <text x="600" y="${310 + (88 - titleFontSize) / 2}" text-anchor="middle" font-size="${titleFontSize}" font-weight="bold"
    font-family="'Gowun Dodum', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
    fill="white" letter-spacing="-2">${title}</text>
  <!-- 부제목 -->
  <text x="600" y="410" text-anchor="middle" font-size="34"
    font-family="'Gowun Dodum', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
    fill="rgba(255,255,255,0.75)">${subtitle}</text>
  <!-- 브랜드 -->
  <text x="600" y="560" text-anchor="middle" font-size="28" font-weight="bold"
    font-family="'Gowun Dodum', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
    fill="rgba(255,255,255,0.85)">${brand}</text>
</svg>`;
}

// 전체 이미지 목록
const images = [
  // ── 기본 ─────────────────────────────────────
  { file: 'default',            emoji: '🧠', title: '마인드테스트',        subtitle: '3분이면 끝나는 심리테스트', bg1: '#ff7a7a', bg2: '#e05555' },

  // ── 테스트 진입 페이지 ─────────────────────────
  { file: 'love',               emoji: '💘', title: '연애 스타일 테스트',   subtitle: '12문항 · 16유형',   bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'kkondae',            emoji: '🗿', title: '꼰대력 테스트',        subtitle: '10문항 · 5등급',    bg1: '#4a5b8c', bg2: '#35446d' },
  { file: 'vocab',              emoji: '📖', title: '한자어 어휘력 테스트',  subtitle: '10문항 · 급수 판정', bg1: '#3f9e73', bg2: '#2e7a58' },
  { file: 'burnout',            emoji: '🧠', title: '번아웃 자가진단 테스트', subtitle: '10문항 · 5단계',   bg1: '#7b5ea7', bg2: '#5c4184' },
  { file: 'digital',            emoji: '📱', title: '디지털 중독 자가진단',  subtitle: '10문항 · 5단계',    bg1: '#2196b0', bg2: '#16738a' },
  { file: 'tmi',                emoji: '🗣️', title: '나의 TMI 유형 테스트', subtitle: '9문항 · 8유형',    bg1: '#e8924a', bg2: '#c06d28' },

  // ── 연애 스타일 결과 16종 ─────────────────────
  { file: 'love-romance-express',    emoji: '🚂', title: '폭주 로맨스 기관차', subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-always-open',        emoji: '🏪', title: '24시간 편의점형',    subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-firework-confessor', emoji: '🎆', title: '불꽃 고백러',        subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-instant-deal',       emoji: '📄', title: '속전속결 계약러',     subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-slow-clinger',       emoji: '🍡', title: '느긋한 껌딱지',      subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-caring-butler',      emoji: '🧺', title: '다정한 집사형',      subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-letter-romantic',    emoji: '💌', title: '편지 쓰는 낭만러',   subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-honest-realist',     emoji: '🥗', title: '솔직 담백 실속러',   subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-quiet-flame',        emoji: '🔥', title: '티 안 내는 열정러',  subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-secret-santa',       emoji: '🎁', title: '몰래 챙겨주는 마니또', subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-push-pull-master',   emoji: '🎣', title: '밀당 장인',          subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-tactician',          emoji: '🎯', title: '눈치 백단 전략가',   subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-anxious-fairy',      emoji: '📱', title: '읽씹 걱정 요정',     subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-tsundere-master',    emoji: '😾', title: '츤데레 장인',        subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-daydream-wedding',   emoji: '💒', title: '혼자 상상 결혼식',   subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },
  { file: 'love-careful-fossil',     emoji: '🗿', title: '신중한 화석',        subtitle: '연애 스타일 테스트 결과', bg1: '#ff7a7a', bg2: '#e05555' },

  // ── 꼰대력 결과 5종 ──────────────────────────
  { file: 'kkondae-1', emoji: '💧', title: '청정수',     subtitle: '꼰대력 테스트 결과', bg1: '#4a5b8c', bg2: '#35446d' },
  { file: 'kkondae-2', emoji: '🌱', title: '새싹 꼰대',  subtitle: '꼰대력 테스트 결과', bg1: '#4a5b8c', bg2: '#35446d' },
  { file: 'kkondae-3', emoji: '⚖️', title: '반반 꼰대',  subtitle: '꼰대력 테스트 결과', bg1: '#4a5b8c', bg2: '#35446d' },
  { file: 'kkondae-4', emoji: '💼', title: '프로 꼰대',  subtitle: '꼰대력 테스트 결과', bg1: '#4a5b8c', bg2: '#35446d' },
  { file: 'kkondae-5', emoji: '🗿', title: '화석',       subtitle: '꼰대력 테스트 결과', bg1: '#4a5b8c', bg2: '#35446d' },

  // ── 어휘력 결과 6종 ──────────────────────────
  { file: 'vocab-8',  emoji: '🏆', title: '8급 한자 달인',  subtitle: '한자어 어휘력 결과', bg1: '#3f9e73', bg2: '#2e7a58' },
  { file: 'vocab-7',  emoji: '🌟', title: '7급 한자 고수',  subtitle: '한자어 어휘력 결과', bg1: '#3f9e73', bg2: '#2e7a58' },
  { file: 'vocab-6',  emoji: '📚', title: '6급 한자 중수',  subtitle: '한자어 어휘력 결과', bg1: '#3f9e73', bg2: '#2e7a58' },
  { file: 'vocab-5',  emoji: '📖', title: '5급 한자 입문',  subtitle: '한자어 어휘력 결과', bg1: '#3f9e73', bg2: '#2e7a58' },
  { file: 'vocab-4b', emoji: '✏️', title: '4b급 한자 초보', subtitle: '한자어 어휘력 결과', bg1: '#3f9e73', bg2: '#2e7a58' },
  { file: 'vocab-4',  emoji: '🌱', title: '4급 한자 새싹',  subtitle: '한자어 어휘력 결과', bg1: '#3f9e73', bg2: '#2e7a58' },

  // ── 번아웃 결과 5종 ──────────────────────────
  { file: 'burnout-1', emoji: '🟢', title: '충전 완료',    subtitle: '번아웃 자가진단 결과', bg1: '#7b5ea7', bg2: '#5c4184' },
  { file: 'burnout-2', emoji: '🟡', title: '예열 중',      subtitle: '번아웃 자가진단 결과', bg1: '#7b5ea7', bg2: '#5c4184' },
  { file: 'burnout-3', emoji: '🟠', title: '경고등 켜짐',  subtitle: '번아웃 자가진단 결과', bg1: '#7b5ea7', bg2: '#5c4184' },
  { file: 'burnout-4', emoji: '🔴', title: '방전 직전',    subtitle: '번아웃 자가진단 결과', bg1: '#7b5ea7', bg2: '#5c4184' },
  { file: 'burnout-5', emoji: '⚫', title: '완전 방전',    subtitle: '번아웃 자가진단 결과', bg1: '#7b5ea7', bg2: '#5c4184' },

  // ── 디지털 중독 결과 5종 ─────────────────────
  { file: 'digital-1', emoji: '🌿', title: '디지털 미니멀리스트', subtitle: '디지털 중독 자가진단 결과', bg1: '#2196b0', bg2: '#16738a' },
  { file: 'digital-2', emoji: '📲', title: '적당한 현대인',       subtitle: '디지털 중독 자가진단 결과', bg1: '#2196b0', bg2: '#16738a' },
  { file: 'digital-3', emoji: '🔔', title: '알림 중독 초기',      subtitle: '디지털 중독 자가진단 결과', bg1: '#2196b0', bg2: '#16738a' },
  { file: 'digital-4', emoji: '📡', title: '폰 없인 못 살아',     subtitle: '디지털 중독 자가진단 결과', bg1: '#2196b0', bg2: '#16738a' },
  { file: 'digital-5', emoji: '🤖', title: '스마트폰과 한 몸',    subtitle: '디지털 중독 자가진단 결과', bg1: '#2196b0', bg2: '#16738a' },

  // ── TMI 유형 결과 8종 ────────────────────────
  { file: 'tmi-live-reporter',  emoji: '📡', title: '실시간 중계 기자',  subtitle: 'TMI 유형 테스트 결과', bg1: '#e8924a', bg2: '#c06d28' },
  { file: 'tmi-rapid-analyst',  emoji: '🧮', title: '즉흥 분석가',       subtitle: 'TMI 유형 테스트 결과', bg1: '#e8924a', bg2: '#c06d28' },
  { file: 'tmi-warm-narrator',  emoji: '📖', title: '따뜻한 스토리텔러', subtitle: 'TMI 유형 테스트 결과', bg1: '#e8924a', bg2: '#c06d28' },
  { file: 'tmi-headline-editor',emoji: '📰', title: '헤드라인 편집자',   subtitle: 'TMI 유형 테스트 결과', bg1: '#e8924a', bg2: '#c06d28' },
  { file: 'tmi-slow-empath',    emoji: '🫂', title: '느린 공감러',       subtitle: 'TMI 유형 테스트 결과', bg1: '#e8924a', bg2: '#c06d28' },
  { file: 'tmi-cool-summarizer',emoji: '✂️', title: '쿨한 요약러',       subtitle: 'TMI 유형 테스트 결과', bg1: '#e8924a', bg2: '#c06d28' },
  { file: 'tmi-late-bloomer',   emoji: '🌱', title: '느긋한 공감형',     subtitle: 'TMI 유형 테스트 결과', bg1: '#e8924a', bg2: '#c06d28' },
  { file: 'tmi-quiet-realist',  emoji: '🧱', title: '과묵한 현실주의자', subtitle: 'TMI 유형 테스트 결과', bg1: '#e8924a', bg2: '#c06d28' },
];

let generated = 0;
let skipped = 0;

images.forEach(({ file, ...rest }) => {
  const outPath = path.join(OG_DIR, file + '.png');
  const svgPath = path.join(OG_DIR, file + '.svg');

  // 이미 PNG가 있으면 건너뜀
  if (fs.existsSync(outPath)) {
    console.log(`⏭  skip  ${file}.png (already exists)`);
    skipped++;
    return;
  }

  const svg = makeSVG(rest);
  fs.writeFileSync(svgPath, svg, 'utf8');

  // SVG를 PNG 처럼 참조할 수 없으므로, vercel이 svg를 serve할 수 있으면 og:image를 .svg로 변경 필요.
  // 여기서는 일단 SVG 파일로 저장. 브라우저/카톡은 SVG OG를 지원하지 않으므로
  // sharp 또는 Inkscape로 PNG 변환을 권장합니다.
  // sharp가 설치되어 있으면 아래 코드를 활성화하세요.

  console.log(`✅  svg   ${file}.svg`);
  generated++;
});

console.log(`\n완료: ${generated}개 SVG 생성, ${skipped}개 건너뜀`);
console.log(`\nPNG 변환이 필요하면 아래 명령을 실행하세요:`);
console.log(`  brew install librsvg && for f in og/*.svg; do rsvg-convert -w 1200 -h 630 "\${f}" > "\${f%.svg}.png" && rm "\${f}"; done`);
