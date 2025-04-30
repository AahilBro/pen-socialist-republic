// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
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
const db = getFirestore(app);

// Fetch the era data from Firestore
async function getEraData() {
  const eraRef = doc(db, "eras", "eras"); // The document ID is "eras"
  const docSnap = await getDoc(eraRef);

  if (docSnap.exists()) {
    const eraData = docSnap.data();
    console.log("Era Data: ", eraData);

    // Show era name on the page if element exists
    const eraNameElement = document.getElementById("eraNameDisplay");
    if (eraNameElement) {
      eraNameElement.textContent = eraData.eraName;
    }

    // Apply theme colors
    document.documentElement.style.setProperty('--primary-color', eraData.primaryColor || "#b91c1c");
    document.documentElement.style.setProperty('--background-color', eraData.backgroundColor || "#fffafa");

    // Show admin section if logged-in user is era admin
    const currentUserDisplayName = "Aahil Jawad"; // Replace with dynamic user info later
    if (currentUserDisplayName === eraData.eraAdmin) {
      const adminSection = document.getElementById("adminSection");
      if (adminSection) {
        adminSection.style.display = "block";
      }
    }
  } else {
    console.log("No such era document!");
  }
}

// Load the era data
getEraData();
