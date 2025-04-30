// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase configuration
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

// Log Firebase initialization to verify it's working
console.log("Firebase initialized");

// Load Era data AFTER login
onAuthStateChanged(auth, async (user) => {
  console.log("User state changed:", user);

  if (!user) {
    console.log("No user logged in");
    return; // If no user is logged in, stop here.
  }

  console.log("User logged in:", user.displayName);

  // Reference to the Firestore document where era data is stored
  const eraRef = doc(db, "eras", "eras");
  const docSnap = await getDoc(eraRef);

  if (docSnap.exists()) {
    const eraData = docSnap.data();
    console.log("Era data fetched:", eraData);

    // Set era name in the UI
    const eraNameElement = document.getElementById("eraNameDisplay");
    if (eraNameElement) {
      eraNameElement.textContent = eraData.eraName;
    }

    // Apply theme
    document.documentElement.style.setProperty('--primary-color', eraData.primaryColor || "#b91c1c");
    document.documentElement.style.setProperty('--background-color', eraData.backgroundColor || "#fffafa");

    // Show admin section if user is the era admin
    if (user.displayName === eraData.eraAdmin) {
      console.log("User is the era admin");
      const adminSection = document.getElementById("adminSection");
      if (adminSection) {
        adminSection.style.display = "block";
      }
    }
  } else {
    console.log("No such era document!");
  }
});
