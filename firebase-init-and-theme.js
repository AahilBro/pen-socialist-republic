// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Your Firebase config
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

// Load Era data AFTER login
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const eraRef = doc(db, "eras", "eras");
  const docSnap = await getDoc(eraRef);

  if (docSnap.exists()) {
    const eraData = docSnap.data();

    // Set era name
    const eraNameElement = document.getElementById("eraNameDisplay");
    if (eraNameElement) {
      eraNameElement.textContent = eraData.eraName;
    }

    // Apply theme
    document.documentElement.style.setProperty('--primary-color', eraData.primaryColor || "#b91c1c");
    document.documentElement.style.setProperty('--background-color', eraData.backgroundColor || "#fffafa");

    // Show admin features
    if (user.displayName === eraData.eraAdmin) {
      const adminSection = document.getElementById("adminSection");
      if (adminSection) {
        adminSection.style.display = "block";
      }
    }
  } else {
    console.log("No such era document!");
  }
});
