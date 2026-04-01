# NAVIWORSHIP 기도제목 나눔 앱

나비워십 싱어를 위한 월별 기도제목 공유 웹 앱입니다.

---

## 배포 가이드 (처음부터 끝까지)

### 준비물
- PC (Windows/Mac 모두 가능)
- 인터넷 연결

---

### 1단계: Node.js 설치

1. https://nodejs.org 접속
2. **LTS 버전** 다운로드 후 설치 (모두 기본값으로 Next 클릭)
3. 설치 확인: 터미널(명령 프롬프트)을 열고 아래 명령어 입력
   ```
   node --version
   ```
   `v20.x.x` 같은 버전 번호가 나오면 성공

---

### 2단계: Firebase 프로젝트 만들기

1. https://console.firebase.google.com 접속 (구글 계정 로그인)
2. **"프로젝트 추가"** 클릭
3. 프로젝트 이름 입력 (예: `naviworship-prayer`)
4. Google 애널리틱스는 **끄기** → 프로젝트 만들기

#### Firestore 데이터베이스 활성화
1. 왼쪽 메뉴에서 **"빌드" → "Firestore Database"** 클릭
2. **"데이터베이스 만들기"** 클릭
3. 위치: **asia-northeast3 (서울)** 선택
4. **"테스트 모드에서 시작"** 선택 → 만들기

#### 웹 앱 등록
1. 프로젝트 설정(톱니바퀴 아이콘) → **"일반"** 탭
2. 아래쪽 **"내 앱"** 섹션에서 **웹 아이콘 `</>`** 클릭
3. 앱 닉네임 입력 (예: `prayer-web`) → **"앱 등록"**
4. 표시되는 `firebaseConfig` 값을 복사해둡니다:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "naviworship-prayer.firebaseapp.com",
     projectId: "naviworship-prayer",
     storageBucket: "naviworship-prayer.firebasestorage.app",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

#### Firebase 설정 파일 수정
- 이 프로젝트의 `src/firebase.js` 파일을 열어서
- 위에서 복사한 값으로 교체합니다

---

### 3단계: Firestore 보안 규칙 설정

Firebase Console → Firestore Database → **"규칙"** 탭에서 아래 내용으로 교체:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /prayers/{monthKey} {
      allow read, write: if true;
    }
  }
}
```

**"게시"** 클릭

> ⚠️ 이 규칙은 누구나 읽기/쓰기가 가능합니다. 소규모 비공개 그룹용으로 적합합니다.

---

### 4단계: GitHub에 코드 올리기

1. https://github.com 에서 계정 만들기 (있으면 로그인)
2. 우측 상단 **"+"** → **"New repository"**
3. 이름: `naviworship-prayer` → **Create repository**
4. PC에서 터미널을 열고:

```bash
# 이 프로젝트 폴더로 이동
cd prayer-project

# Git 초기화
git init
git add .
git commit -m "첫 배포"

# GitHub 연결 (아래 URL은 본인 것으로 교체)
git remote add origin https://github.com/본인계정/naviworship-prayer.git
git branch -M main
git push -u origin main
```

---

### 5단계: Vercel로 배포

1. https://vercel.com 접속 → **"Sign Up"** → **GitHub 계정으로 로그인**
2. **"Add New Project"** 클릭
3. GitHub 저장소 목록에서 `naviworship-prayer` 선택 → **"Import"**
4. 설정은 모두 기본값으로 두고 **"Deploy"** 클릭
5. 약 1~2분 후 배포 완료! 표시되는 URL이 앱 주소입니다
   - 예: `https://naviworship-prayer.vercel.app`

---

### 6단계: 커스텀 도메인 연결 (선택사항)

Vercel 대시보드 → 프로젝트 → **Settings** → **Domains** 에서 원하는 도메인을 연결할 수 있습니다.

---

## 배포 후 수정 방법

코드를 수정하고 싶을 때:

1. PC에서 코드를 수정
2. 터미널에서:
   ```bash
   git add .
   git commit -m "수정 내용 설명"
   git push
   ```
3. Vercel이 자동으로 재배포합니다 (1~2분 소요)

---

## 로컬에서 테스트하기

```bash
# 의존성 설치 (최초 1회)
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 관리자 로그인
- 이름: `관리자`
- 비밀번호: `admin1234`

> 관리자 비밀번호를 변경하려면 `src/App.jsx` 파일의 `ADMIN_PASSWORD` 값을 수정하세요.
