# weddingmarch-site — 이 저장소의 규칙 (정본)

춘천 웨딩마치 실사이트 **https://ccweddingmarch.com** 의 정본이다.
여기 없는 규칙은 이 저장소의 규칙이 아니다. 어느 기기에서 열든 이 파일이 먼저다.

## 제1조 — main push = 즉시 실사이트 배포

`.github/workflows/deploy.yml` 이 `push → main` 에서 돌아 GitHub Pages로 나간다.
**보호 브랜치·리뷰 게이트 없음**(2026-08-13 실측: rulesets 0건, main protection 404).
즉 `git push origin main` 한 줄이 곧 대외 게시다 — **사람 승인 없이 하지 않는다.**

작업은 항상 브랜치에서 한다:

```bash
git switch -c fix/무엇을-고치나
npm run dev            # http://localhost:8092 에서 눈으로 확인
git push -u origin fix/무엇을-고치나   # 배포 아님 — 안전
```

사장님이 "배포해"라고 한 뒤에만 main에 합친다.

## 제2조 — 정본은 기기가 아니라 origin이다

로컬에만 쌓인 커밋은 **없는 작업**이다. 2026-06-12 인트로 최종형(미닫이 순백골드 문 + 시네 슬라이드,
커밋 체인 `a223a53…c04e5c0`)은 구맥 로컬에만 있고 origin에 없어 지금 아무도 쓸 수 없다.
작업이 끝나면 그날 안에 브랜치를 push한다. 여러 맥에서 일하므로 시작 전 `git pull` 은 의무다.

## 제3조 — 어디를 고치면 무엇이 바뀌나

| 고칠 것 | 파일 |
|---|---|
| 색·폰트 토큰 (rose-gold·champagne·Playfair·Pretendard) | `tailwind.config.mjs` |
| 공통 뼈대·헤더·푸터·메타 | `src/layouts/Layout.astro` |
| 메인 / 가격 / 갤러리 / 상담 페이지 | `src/pages/index.astro` · `packages.astro` · `gallery.astro` · `contact.astro` |
| 사진 | `public/images/` (bg · bg-new · hero · events · instagram, 3,042장·311MB) |

`_` 로 시작하는 `src/pages/_preview*.astro`, `index.astro.qh-redesign`,
`__contact.astro.backup2` 는 **빌드되지 않는 폐기·참고본**이다. 실사이트로 착각하지 않는다.

## 제4조 — 손대지 않는 것

- `src/data/crm-website-content.json` — 웨딩마치 CRM 앱의 승인 발행이 쓰는 파일이다.
  손으로 고치면 다음 발행 때 덮어써진다. 문구 6종(intro·prices·notice·refund·channels·hours)은
  코드가 아니라 CRM에서 바꾼다. 읽기 전용으로 본다.
- `public/CNAME` — 도메인 결박. 지우면 사이트가 죽는다.
- `git push --force`, 커밋 이력 삭제 — 금지. 되돌릴 땐 되돌리는 새 커밋으로 한다.

## 제5조 — 안전 경계 (사람 승인 전 실행 금지)

main push·머지 · 파일 삭제 · 도메인/Pages 설정 변경 · 결제 · 외부 발송.
아래 방이 조일 수는 있어도 풀 수는 없다.

## 환경

Node 20 · `npm ci` · dev/preview 포트 8092(`--host 0.0.0.0` 이라 같은 와이파이의 폰에서도 보인다).
빌드 확인은 `npm run build`, CRM 콘텐츠 검사는 `npm run verify:crm-content`.
