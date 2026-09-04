# 마인드테스트 (mindtest.chatgpts.kr)

모바일 우선 **정적 심리테스트 사이트**. 백엔드 없음, 프레임워크 없음, 빌드 단계 없음.
바닐라 HTML/CSS/JS 파일을 Vercel에 그대로 올리면 끝난다.

- 배포 도메인: `https://mindtest.chatgpts.kr` (첫 배포는 `mindtest.vercel.app` → DNS 연결 후 전환)
- 자매 사이트: [한자야 놀자!](https://hanja.chatgpts.kr/) (`kuris/playhanja`)

## 지금 들어있는 것

| 테스트 | 엔진 | 문항 | 결과 |
|---|---|---|---|
| 연애 스타일 | `engine-type.js` (4축 부호 조합) | 12 | 16유형 |
| 꼰대력 | `engine-score.js` (합산 → 백분율) | 10 | 5등급 |
| 한자어 어휘력 | `engine-quiz.js` (채점 → 급수) | 10 | 6급수 |

정적 페이지 31개 (홈 1 + 테스트 3 + 결과 27), 전부 고유 `title` / `description` / `canonical` / OG 태그 보유.

## 구조

```
index.html  love.html  kkondae.html  vocab.html
result/     결과 27페이지 (공유·검색 노출 단위. 각각 고유 URL + OG)
js/         engine-type|score|quiz.js  +  data-love|kkondae|vocab.js
css/style.css
og/         OG 이미지 넣는 곳 (README 참고, 아직 비어 있음)
tools/build.js   데이터 → HTML 31개 + sitemap.xml 생성기 (개발용)
robots.txt  sitemap.xml  ads.txt  vercel.json
docs/       원본 기획서·명세서
```

### 왜 결과가 개별 HTML 파일인가

카카오톡에 공유됐을 때 **결과마다 다른 미리보기 카드**가 떠야 하고, 결과 페이지 하나하나가
검색 노출 단위이기 때문이다. JS로 같은 페이지에 결과를 그리면 둘 다 불가능하다.

### 페이지 수정하는 법

결과 페이지 27개는 손으로 고치지 말 것. **데이터를 고치고 생성기를 다시 돌린다.**

```bash
vim js/data-love.js      # 유형명·설명·문항 수정
node tools/build.js      # HTML 31개 + sitemap.xml 재생성
```

생성기는 개발용이고, 배포되는 산출물은 전부 정적 HTML이다 (사이트에 런타임 의존성 0).

### 테스트를 새로 추가하려면

엔진은 이미 3종 다 있으므로 **데이터 파일 1개 + 진행 페이지 1개**만 추가하면 된다.
`tools/build.js` 의 `buildTestPage` / `build*Results` 를 그대로 따라 쓰면 된다.

## 배포 (Vercel)

1. Vercel에서 이 repo를 Import → **Framework Preset: Other**, 빌드 명령 없음, 출력 디렉터리 루트
2. 배포되면 `mindtest.vercel.app` 으로 먼저 확인
3. Vercel 프로젝트 → Settings → Domains 에 `mindtest.chatgpts.kr` 추가
4. 가비아 DNS에 `mindtest` CNAME → Vercel이 알려주는 값
5. Settings → Analytics 에서 **Web Analytics 활성화** (스크립트 태그는 이미 전 페이지에 들어있음)

### DNS 연결이 끝난 뒤에 할 것

`mindtest.vercel.app` 으로도 사이트가 그대로 열리면 검색엔진 입장에서 같은 콘텐츠가 두 주소에
존재하게 된다. DNS가 정상 동작하는 걸 확인한 **다음에** `vercel.json` 에 아래를 추가한다.

```json
"redirects": [
  {
    "source": "/((?!ads\\.txt|robots\\.txt|sitemap\\.xml).*)",
    "has": [{ "type": "host", "value": "mindtest.vercel.app" }],
    "destination": "https://mindtest.chatgpts.kr/$1",
    "permanent": false
  }
]
```

⚠️ DNS 연결 **전에** 넣으면 `mindtest.vercel.app` 이 아직 뜨지도 않는 주소로 리다이렉트되어
사이트 전체가 접속 불가가 된다. 순서를 반드시 지킬 것.

## 애드센스

- 게시자 ID `ca-pub-3321070604000141`, `ads.txt` 루트에 배치 완료
- **자동 광고** 스크립트가 31개 페이지 `<head>` 에 전부 들어있다. 애드센스 콘솔에서
  이 사이트의 자동 광고를 켜면 바로 게재된다 (chatgpts.kr 서브도메인이라 별도 심사 불필요)
- 수동 광고 단위를 쓰려면 각 페이지 `.ad-slot` 안의 주석을 풀고 `data-ad-slot` 값을 교체.
  단 결과 페이지는 생성물이므로 `tools/build.js` 의 `adSlot()` 함수를 고치고 재생성할 것
- ⚠️ `tfat=1` 을 붙이지 말 것. 이 사이트는 아동 대상이 아니며, 붙이면 단가만 손해다
- ⚠️ "결과를 보려면 광고 시청" 류의 강제 삽입 금지 (정책 위반 소지)

## 배포 직후 체크리스트

- [ ] 구글 서치콘솔 등록 (URL 접두어 + HTML 메타태그 방식) → `sitemap.xml` 제출
- [ ] 네이버 서치어드바이저 등록 → 사이트맵 제출
      (네이버 콘솔은 브라우저 자동화가 접근 불가. 콘솔 조작은 직접 해야 한다)
- [ ] OG 이미지 31장 제작 → `og/` 에 배치 (`og/README.md` 참고). **공유 전환율에 제일 크게 영향**
- [ ] 애드센스 자동 광고 ON

메타태그 방식 인증 코드는 `tools/build.js` 의 `head()` 함수에 한 줄 추가하고 재생성하면
31개 페이지에 한 번에 들어간다.

## 규칙 (어기면 재작업)

1. 외부 프레임워크·번들러 금지. CDN은 구글 웹폰트만
2. 결과는 반드시 개별 정적 HTML. JS로 같은 페이지에 그리지 말 것
3. **MBTI 라는 단어와 공식 문항·축 명칭 사용 금지** (상표·저작권).
   16유형 "구조"만 차용했고 축·문항·유형명은 전부 창작이다
4. 강제 언어 리다이렉트 금지 (다국어 확장 시 크롤러 차단 문제)
5. 모든 페이지에 canonical + 고유 title/description

## 검증

```bash
# 로컬 실행
python3 -m http.server 8899

# 금지어 검사
grep -rin mbti index.html love.html kkondae.html vocab.html result js css

# 재생성 후 링크·sitemap 정합성이 깨지지 않았는지
node tools/build.js
```

## 다음 단계

- 테스트 백로그: 여행 스타일, 카톡 답장 유형, 맞춤법, MZ력, 번아웃 지수 (엔진 재사용, 데이터만 추가)
- 글로벌 확장: 반응 온 테스트만 `/en/` 경로 추가 + hreflang 상호 태그.
  결과 이름은 번역이 아니라 영어권 밈으로 다시 짓는다. 강제 리다이렉트는 하지 않는다
