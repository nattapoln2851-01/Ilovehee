import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3FqHqHhPfr_JecHTS5280aZrNKXcHZP4",
  authDomain: "school-library-9b913.firebaseapp.com",
  projectId: "school-library-9b913",
  storageBucket: "school-library-9b913.firebasestorage.app",
  messagingSenderId: "38181627423",
  appId: "1:38181627423:web:4132434f756f86588f572a",
  measurementId: "G-DYK5ET6CVF"
};

// เริ่มต้นใช้งาน Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ฟังก์ชันบันทึกข้อมูล (Save) เมื่อกดปุ่ม
document.getElementById('saveBtn').addEventListener('click', async () => {
  const textVal = document.getElementById('userInput').value;
  if (!textVal) return;

  try {
    await addDoc(collection(db, "messages"), {
      text: textVal,
      createdAt: new Date()
    });
    document.getElementById('userInput').value = '';
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// ฟังก์ชันดึงข้อมูลมาแสดงแบบ Real-time (Read)
onSnapshot(collection(db, "messages"), (snapshot) => {
  const dataList = document.getElementById('dataList');
  dataList.innerHTML = '';
  
  snapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.data().text;
    dataList.appendChild(li);
  });
});