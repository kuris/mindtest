/* ============================================================
   마인드테스트 - Supabase 접속 상수 (supabase-config.js)

   [이 파일이 새로 생긴 이유]
   마인드테스트는 원래 Supabase 를 전혀 쓰지 않는 완전 정적 사이트입니다.
   관리자 통계를 남기려면 접속 정보가 한 번은 필요하므로, 다른 4개 서비스
   (한자/단어/역사/운세)와 **완전히 동일한 값**을, 한자야 놀자의
   js/supabase-client.js 와 같은 형태의 파일 하나로만 선언합니다.

   - publishable(anon) 키는 브라우저에 공개되어도 되는 키이며,
     실제 데이터 보호는 Supabase RLS 가 담당합니다.
     (supabase/migration-admin.sql 의 page_views 정책 참고)
   - 이 파일은 상수만 선언합니다. 로그인·클라이언트 생성을 하지 않으므로
     기존 테스트 진행/결과 화면 동작에는 아무 영향이 없습니다.
   ============================================================ */

(function () {
  if (typeof window === 'undefined') return;
  window.SUPABASE_URL = 'https://ybhiznlelnpwaicyoifa.supabase.co';
  window.SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_H4gFRiLEjE8h8s_EX4tKzg__ZKpsBR1';
  window.SUPABASE_AUTH_STORAGE_KEY = 'sb-mindtest-auth-token';   // 관리자 로그인 전용
})();
