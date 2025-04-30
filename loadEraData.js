import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore();

// Fetch the era data from Firestore
async function getEraData() {
  const eraRef = doc(db, "eras", "eras");  // The document ID is "eras"
  const docSnap = await getDoc(eraRef);

  if (docSnap.exists()) {
    const eraData = docSnap.data();
    console.log("Era Data: ", eraData);

    // Example: Display the era name
    const eraNameElement = document.getElementById("eraNameDisplay");
    if (eraNameElement) {
      eraNameElement.textContent = eraData.eraName;
    }

    // Apply the theme colors to the website
    document.documentElement.style.setProperty('--primary-color', eraData.primaryColor || "#b91c1c");  // Fallback to red if not set
    document.documentElement.style.setProperty('--background-color', eraData.backgroundColor || "#fffafa");  // Fallback to light background if not set

    // Optionally, check if the logged-in user is the era admin
    const currentUserDisplayName = "Aahil Jawad";  // This would come from the logged-in user
    if (currentUserDisplayName === eraData.eraAdmin) {
      // Show admin features if the current user is the era admin
      const adminSection = document.getElementById("adminSection");
      if (adminSection) {
        adminSection.style.display = "block";
      }
    }
  } else {
    console.log("No such era document!");
  }
}

// Call the function to load the era data
getEraData();
