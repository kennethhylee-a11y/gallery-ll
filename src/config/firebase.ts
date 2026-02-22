import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase 配置 - 用戶需要替換為自己的配置
const firebaseConfig = {
  apiKey: "AIzaSyAxfCzbBaqGUlbQPll1HOtnifhJNZV5bYU",
  authDomain: "galleryll.firebaseapp.com",
  projectId: "galleryll",
  storageBucket: "galleryll.appspot.com",
  messagingSenderId: "136456771676",
  appId: "1:136456771676:web:efc8e6a556e73094f0ee99",
  measurementId: "G-K77SW4N1RM"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
