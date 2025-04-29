// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAgorBeG4rQd0Uq3lglKAHCzEb4D7yhcF4",
  authDomain: "pen-socialist-republic.firebaseapp.com",
  projectId: "pen-socialist-republic",
  storageBucket: "pen-socialist-republic.firebasestorage.app",
  messagingSenderId: "750292729446",
  appId: "1:750292729446:web:03b1ca4355c4b0b16737a7",
  measurementId: "G-3QMLT1900F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Login function
window.login = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    document.getElementById('login-section').style.display = 'none'; // Hide login section
    document.getElementById('security-section').style.display = 'block'; // Show security question
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

// Security Question handling
document.getElementById('submit-security').addEventListener('click', async function () {
  const answer = document.getElementById('security-answer').value.trim();
  if (answer.toLowerCase() === 'blue') { // Example security answer
    document.getElementById('security-section').style.display = 'none'; // Hide security question
    document.getElementById('penname-section').style.display = 'block'; // Show pen name input
  } else {
    alert('Incorrect answer. Try again!');
  }
});

// Pen Name setup
document.getElementById('submit-penname').addEventListener('click', async function () {
  const penName = document.getElementById('pen-name').value.trim();
  if (penName) {
    // Save Pen Name to Firestore
    const user = auth.currentUser;
    await setDoc(doc(db, "users", user.uid), {
      penName: penName
    });

    // Show the Home page
    document.getElementById('penname-section').style.display = 'none'; // Hide pen name section
    document.getElementById('home-section').style.display = 'block'; // Show home section

    // Greet the user
    document.getElementById('welcome-message').innerText = `Welcome, ${penName}! ✊`;
  } else {
    alert('Please enter a valid Pen Name!');
  }
});
