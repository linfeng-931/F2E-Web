import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// 初始化 Firebase
const firebaseConfig = {
    apiKey: "AIzaSyByU9jZMSzKyxOw2QETKwpd5FkBiUFd8vA",
    authDomain: "f2e01-donate.firebaseapp.com",
    projectId: "f2e01-donate",
    storageBucket: "f2e01-donate.firebasestorage.app",
    messagingSenderId: "553423823090",
    appId: "1:553423823090:web:3edd79e9bd2615fc5e706b",
    measurementId: "G-9LT6VJLKM9"
  };
firebase.initializeApp(firebaseConfig);

// 取得 Firestore 資料庫
const db = firebase.firestore();

// 註冊函式
function registerUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // 註冊成功
      const user = userCredential.user;
      console.log('註冊成功：', user);

      // 將用戶資料寫入 Firestore
      db.collection('users').doc(user.uid).set({
        email: user.email,
        // 其他用戶資料
      })
        .then(() => {
          console.log('用戶資料寫入成功！');
        })
        .catch((error) => {
          console.error('寫入用戶資料失敗：', error);
        });
    })
    .catch((error) => {
      // 註冊失敗
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('註冊失敗：', errorCode, errorMessage);
    });
}

// 呼叫註冊函式
registerUser('user@example.com', 'password123');
