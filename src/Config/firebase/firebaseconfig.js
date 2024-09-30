// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJWTziShXKS4myT7yx22OGclsZSIqT1sI",
  authDomain: "bloging-app-react.firebaseapp.com",
  projectId: "bloging-app-react",
  storageBucket: "bloging-app-react.appspot.com",
  messagingSenderId: "677263997158",
  appId: "1:677263997158:web:2407412a0cc20766522327",
  measurementId: "G-BS6XCZ2Z84"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export default app
