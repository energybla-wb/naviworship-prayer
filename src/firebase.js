// ============================================
// Firebase 설정 파일
// 아래 값들을 본인의 Firebase 프로젝트 정보로 교체하세요.
// Firebase Console > 프로젝트 설정 > 일반 > 내 앱 에서 확인 가능
// ============================================

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb78imD8ZKwA62d-oBdibRkkZKRyQv_ko",
  authDomain: "naviworship-prayer.firebaseapp.com",
  projectId: "naviworship-prayer",
  storageBucket: "naviworship-prayer.firebasestorage.app",
  messagingSenderId: "880422706773",
  appId: "1:880422706773:web:9f910fdd5a1b69a45abedc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
