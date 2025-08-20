# 다독이다 (Dadokida)

심리상담을 위한 웹 애플리케이션입니다.

## 🚀 시작하기

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

### AI 기능 설정

채팅에서 실제 AI 응답을 받으려면 OpenAI API 키를 설정해야 합니다:

1. **OpenAI API 키 발급**
   - [OpenAI Platform](https://platform.openai.com/api-keys)에서 API 키를 발급받으세요
   - 무료 크레딧으로 시작할 수 있습니다

2. **API 키 설정**
   - 앱에서 "마이페이지" → "AI 설정"으로 이동
   - 발급받은 API 키를 입력하고 저장
   - 또는 `.env` 파일에 `VITE_OPENAI_API_KEY=your-api-key-here` 추가

3. **사용법**
   - 일반 사용자 모드에서 채팅 시 AI가 전문가처럼 응답
   - 전문가 모드에서는 일반 채팅으로 사용

## 📱 주요 기능

- **고민 작성**: 개인적인 고민을 책 형태로 작성
- **전문가 상담**: AI 기반 심리상담 서비스
- **책장 관리**: 작성한 고민들을 책장에서 관리
- **실시간 채팅**: AI와의 실시간 대화

## 🛠 기술 스택

- React 19
- Vite
- Styled Components
- React Router
- OpenAI API

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
