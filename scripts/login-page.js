// BAGIAN 1: KONFIGURASI, IMPOR, & INISIALISASI (Aman di luar event listener)
// =======================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Ganti dengan kredensial Anda
const firebaseConfig = {
  apiKey: "AIzaSyAemm2qCSpMkJwHYeFqmBUl6eANKO66-dc",
  authDomain: "sadar-by-bisa.firebaseapp.com",
  projectId: "sadar-by-bisa",
  storageBucket: "sadar-by-bisa.firebasestorage.app",
  messagingSenderId: "115946460349",
  appId: "1:115946460349:web:a5f7eb27c98f7a34ac53d4",
};
const GOOGLE_CLIENT_ID =
  "115946460349-n6vhst1jhcdhhpk9e3tqigefmerv6bpu.apps.googleusercontent.com";

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// BAGIAN 2: DEKLARASI FUNGSI (Aman di luar event listener)
// =========================================================
// Di sini kita hanya 'mendefinisikan' fungsi, belum menjalankannya.
let DOMElements = {};
let UIManager = {};
let LogicHandler = {};

function setupFunctions() {
  DOMElements = {
    splashScreen: document.getElementById("splash-screen"),
    mainContent: document.getElementById("auth-container"),
    loadingView: document.getElementById("loading-view"),
    loginView: document.getElementById("login-view"),
    gsiButtonContainer: document.getElementById("gsi-button-container"),
    formContainer: document.getElementById("profile-form-container"),
    form: document.getElementById("profile-form"),
    inputs: {
      name: document.getElementById("input-name"),
      gender: document.getElementById("input-gender"),
      dob: document.getElementById("input-dob"),
    },
  };

  UIManager = {
    showLoading: () => {
      DOMElements.loadingView.classList.remove("hidden");
      DOMElements.loginView.classList.add("hidden");
      DOMElements.formContainer.classList.add("hidden");
    },
    showLoginButton: () => {
      DOMElements.loadingView.classList.add("hidden");
      DOMElements.loginView.classList.remove("hidden");
      DOMElements.formContainer.classList.add("hidden");
    },
    showProfileForm: () => {
      const user = auth.currentUser;
      if (!user) return;
      DOMElements.inputs.name.value = user.displayName || "";
      DOMElements.loadingView.classList.add("hidden");
      DOMElements.loginView.classList.add("hidden");
      DOMElements.formContainer.classList.remove("hidden");
    },
  };

  LogicHandler = {
    handleCredentialResponse: async (response) => {
      UIManager.showLoading();
      const idToken = response.credential;
      const credential = GoogleAuthProvider.credential(idToken);
      try {
        await signInWithCredential(auth, credential);
      } catch (error) {
        console.error("Gagal login dengan Firebase:", error);
        UIManager.showLoginButton();
      }
    },
    handleSaveProfile: async (event) => {
      event.preventDefault();
      const user = auth.currentUser;
      if (!user) return;
      const profileData = {
        name: DOMElements.inputs.name.value,
        gender: DOMElements.inputs.gender.value,
        tanggalLahir: DOMElements.inputs.dob.value,
      };
      if (!profileData.gender || !profileData.tanggalLahir) {
        return alert("Harap lengkapi semua data.");
      }
      UIManager.showLoading();
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, profileData, { merge: true });
        window.location.href = "../sadar_dev.html";
      } catch (error) {
        console.error("Error saat menyimpan profil: ", error);
        UIManager.showProfileForm();
      }
    },
  };
}

// BAGIAN 3: TITIK MASUK UTAMA & ALUR EKSEKUSI (Setelah DOM Siap)
// ==================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi semua referensi DOM dan fungsi yang bergantung padanya
  setupFunctions();

  // 2. Fungsi untuk menjalankan aplikasi utama (setelah splash screen)
  const runMainApp = () => {
    UIManager.showLoading();
    if (typeof google === "undefined" || !google.accounts?.id) {
      return console.error("Google Identity Services tidak termuat.");
    }
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: LogicHandler.handleCredentialResponse,
    });
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists() && docSnap.data().tanggalLahir) {
          window.location.href = "../sadar_dev.html";
        } else {
          if (!docSnap.exists()) {
            const initialUserData = {
              avatar: user.photoURL,
              name: user.displayName,
              email: user.email,
              level: 0,
              xp: 0,
              xpForNextLevel: 100,
              streak: 0,
              fisik: 0,
              mental: 0,
              poin: 0,
            };
            await setDoc(userDocRef, initialUserData);
          }
          UIManager.showProfileForm();
        }
      } else {
        google.accounts.id.renderButton(DOMElements.gsiButtonContainer, {
          shape: "pill",
          theme: "outline",
          size: "large",
          text: "continue_with",
        });
        UIManager.showLoginButton();
      }
    });
  };

  // 3. Logika Splash Screen yang mengontrol kapan aplikasi utama berjalan
  const SPLASH_TIMEOUT_MS = 1 * 60 * 60 * 1000; // 1 Jam
  const now = new Date().getTime();
  const lastSplashTime = localStorage.getItem("lastSplashTime");

  const showMainContent = () => {
    DOMElements.splashScreen.classList.add("opacity-0");
    setTimeout(() => {
      DOMElements.splashScreen.classList.add("hidden");
      DOMElements.mainContent.classList.remove("hidden");
      runMainApp(); // <-- Jalankan aplikasi utama HANYA setelah splash screen selesai
    }, 1500);
  };

  if (lastSplashTime && now - lastSplashTime < SPLASH_TIMEOUT_MS) {
    DOMElements.splashScreen.classList.add("hidden");
  } else {
    setTimeout(() => {
      localStorage.setItem("lastSplashTime", now);
      showMainContent();
    }, 3000); // Tampilkan selama 3 detik
  }

  // 4. Pasang event listener
  DOMElements.form.addEventListener("submit", LogicHandler.handleSaveProfile);
});
