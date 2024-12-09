// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLwe09dMrX7An2fQZbCB596K08iL8Je78",
  authDomain: "donate-771bd.firebaseapp.com",
  projectId: "donate-771bd",
  storageBucket: "donate-771bd.firebasestorage.app",
  messagingSenderId: "572703763389",
  appId: "1:572703763389:web:129374bfb907c0f58f80d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Storage
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Get the form element
const form = document.getElementById("userForm");

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get user input values
  const first = document.getElementById("first").value;
  const last = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const amount = document.getElementById("amount").value;
  const card = document.getElementById("card").value;
  const expiration = document.getElementById("expiration").value;
  const expirationDate = new Date(expiration);
  const code = document.getElementById("code").value;

  // Create a reference to the 'donsations' collection
  const donations = Date.now().toString(); // Use a timestamp as a unique ID
  const usersRef = doc(db, "donations", donations);

  // Set document data
  setDoc(usersRef, {
    Name: {
      First: first,
      Last: last,
    },
    Email: email,
    Amount: amount,
    "Credit Card": {
      "Card Number": card,
      "Expiraiton Date": expirationDate,
      "Security Code": code,
    },
  })
    .then(() => {
      alert("Document successfully written!");
      form.reset(); // Reset the form after successful submission
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});
