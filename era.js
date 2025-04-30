import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgorBeG4rQd0Uq3lglKAHCzEb4D7yhcF4",
  authDomain: "pen-socialist-republic.firebaseapp.com",
  projectId: "pen-socialist-republic",
  storageBucket: "pen-socialist-republic.appspot.com",
  messagingSenderId: "750292729446",
  appId: "1:750292729446:web:03b1ca4355c4b0b16737a7",
  measurementId: "G-3QMLT1900F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const eraNameInput = document.getElementById("eraName");
const eraAdminSelect = document.getElementById("eraAdmin");
const primaryColorInput = document.getElementById("primaryColor");
const bgColorInput = document.getElementById("bgColor");
const submitBtn = document.getElementById("submitEra");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please sign in first.");
    window.location.href = "index.html";
    return;
  }

  const snapshot = await getDocs(collection(db, "members"));
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const option = document.createElement("option");
    option.value = data.penName;
    option.textContent = data.penName;
    eraAdminSelect.appendChild(option);
  });

  const currentEraRef = doc(db, "settings", "currentEra");
  const currentEraSnap = await getDoc(currentEraRef);
  const currentEraData = currentEraSnap.exists() ? currentEraSnap.data() : null;

  const currentAdmin = currentEraData?.admin || "Aahil Jawad";
  const isAllowed = user.displayName === "Aahil Jawad" || user.displayName === currentAdmin;

  if (!isAllowed) {
    alert("Only the Era Admin can change settings.");
    window.location.href = "home.html";
    return;
  }

  submitBtn.onclick = async () => {
    const eraName = eraNameInput.value.trim();
    const admin = eraAdminSelect.value;
    const primaryColor = primaryColorInput.value;
    const bgColor = bgColorInput.value;

    if (!eraName || !admin) {
      alert("Please enter all fields.");
      return;
    }

    await setDoc(currentEraRef, {
      name: eraName,
      admin,
      primaryColor,
      bgColor,
      updatedAt: new Date().toISOString()
    });

    alert("Era updated!");
    window.location.href = "home.html";
  };
});
