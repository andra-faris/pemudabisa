// =================================================================================
// SADAR APP SCRIPT - VERSI GABUNGAN & FINAL
// Deskripsi: Skrip tunggal untuk mengelola seluruh alur aplikasi,
// mulai dari splash screen, login, hingga fitur-fitur utama.
// =================================================================================

// BAGIAN 1: KONFIGURASI, IMPOR, & INISIALISASI
// ===============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Ganti dengan kredensial Anda jika berbeda
const firebaseConfig = {
  apiKey: "AIzaSyAemm2qCSpMkJwHYeFqmBUl6eANKO66-dc",
  authDomain: "sadar-by-bisa.firebaseapp.com",
  projectId: "sadar-by-bisa",
  storageBucket: "sadar-by-bisa.appspot.com",
  messagingSenderId: "115946460349",
  appId: "1:115946460349:web:a5f7eb27c98f7a34ac53d4",
};
const GOOGLE_CLIENT_ID =
  "115946460349-n6vhst1jhcdhhpk9e3tqigefmerv6bpu.apps.googleusercontent.com";
const IMGBB_API_KEY = "b728ec02a82aba65cb983b6d7b242b7b";

// Inisialisasi semua layanan Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// BAGIAN 2: STATE APLIKASI & REFERENSI DOM
// ============================================
// State (data yang bisa berubah)
let localUserData = {};
let selectedAvatarValue = null;
let selectedFile = null;
let carouselCurrentIndex = 0;
let carouselInterval;

// Referensi Elemen DOM (akan diinisialisasi nanti)
let DOMElements = {};

// Palet warna untuk postingan
const postColorMap = {
  blue: "bg-sky-200 text-sky-900",
  green: "bg-green-200 text-green-900",
  pink: "bg-pink-200 text-pink-900",
  yellow: "bg-yellow-200 text-yellow-900",
};
const postColors = Object.keys(postColorMap);

const verifiedIcon = `<div class="svg w-5 h-5 bg-(image:--verified) bg-cover bg-no-repeat bg-center"></div>`;

// BAGIAN 3: TITIK MASUK UTAMA & ALUR APLIKASI
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  // --- Langkah A: Inisialisasi semua referensi DOM ---
  initializeDOMElements();

  // --- Langkah B: Deklarasi semua fungsi ---
  // Semua fungsi dideklarasikan di sini agar saling mengenali dan tidak ada ReferenceError

  // UIManager: Mengelola Tampilan
  const UIManager = createUIManager();
  // LogicHandler: Menangani Event dan Proses Data
  const LogicHandler = createLogicHandler();
  // FeatureManager: Menjalankan Fitur Spesifik
  const FeatureManager = createFeatureManager();

  // --- Langkah C: Jalankan Alur Utama ---
  runSplashAndApp();

  // --- Definisi Fungsi-Fungsi ---

  function initializeDOMElements() {
    DOMElements = {
      splashScreen: document.getElementById("splash-screen"),
      authContainer: document.getElementById("auth-container"),
      appContainer: document.getElementById("app-container"),
      loadingView: document.getElementById("loading-view"),
      loginView: document.getElementById("login-view"),
      gsiButtonContainer: document.getElementById("gsi-button-container"),
      profileFormLogin: document.getElementById("profile-form"),
      profileFormLoginContainer: document.getElementById(
        "profile-form-container"
      ),
      navButtons: document.querySelectorAll(".bnav"),
      backButton: document.querySelectorAll(".btn_back"),
      contentPages: document.querySelectorAll(".page_content"),
      logoutButton: document.getElementById("btn_logout"),
      missionListContainer: document.getElementById("mission_list"),
      popup: document.getElementById("success-popup"),
      popupMessage: document.getElementById("popup-message"),
      closePopupButton: document.getElementById("close-popup"),
      homeAvatar: document.getElementById("homeAvatar"),
      mainAvatar: document.querySelector(".d-avatar > div"),
      editAvatarTrigger: document.querySelector("#edit-avatar"),
      avatarPopup: document.getElementById("avatar-popup"),
      googlePhotoChoice: document.getElementById("google-photo-choice"),
      defaultAvatarsGrid: document.getElementById("default-avatars-grid"),
      saveAvatarButton: document.getElementById("save-avatar-change"),
      cancelAvatarButton: document.getElementById("cancel-avatar-change"),
      profileFormEditContainer: document.getElementById(
        "profile-edit-form-container"
      ),
      profileFormEdit: document.getElementById("profile-edit-form"),
      editProfileButton: document.getElementById("edit-profile-button"),
      cancelEditButton: document.getElementById("cancel-edit-button"),
      inputs: {
        name: document.getElementById("input-name"),
        gender: document.getElementById("input-gender"),
        dob: document.getElementById("input-dob"),
        editName: document.getElementById("input-edit-name"),
        editGender: document.getElementById("input-edit-gender"),
        editDob: document.getElementById("input-edit-dob"),
      },
      leaderboardContainer: document.getElementById("leaderboard_section"),
      communityWallContainer: document.getElementById("community_wall"),
      createPostButton: document.getElementById("create-post-button"),
      postFormPopup: document.getElementById("post-form-popup"),
      postForm: document.getElementById("post-form"),
      postTextarea: document.getElementById("post-textarea"),
      cancelPostButton: document.getElementById("cancel-post-button"),
      imageUploadInput: document.getElementById("image-upload-input"),
      imagePreviewContainer: document.getElementById("image-preview-container"),
      imagePreview: document.getElementById("image-preview"),
      removeImageButton: document.getElementById("remove-image-button"),
      articleContainer: document.getElementById("article_list"),
      videoContainer: document.getElementById("video_list"),
      slidesContainer: document.getElementById("slides_container"),
      dotsContainer: document.getElementById("dots_container"),
      calmSpaceButton: document.getElementById("menu_calmspace"),
      calmSpacePage: document.getElementById("calmspace_page"),
      communityWallButton: document.getElementById("menu_communitywall"),
      communityWallPage: document.getElementById("community_wall_page"),
      petkuButton: document.getElementById("menu_petku"),
      petkuPage: document.getElementById("petku_page"),
    };
  }

  function createUIManager() {
    return {
      showLoading: () => {
        if (DOMElements.loadingView)
          DOMElements.loadingView.classList.remove("hidden");
        if (DOMElements.loginView)
          DOMElements.loginView.classList.add("hidden");
        if (DOMElements.profileFormLoginContainer)
          DOMElements.profileFormLoginContainer.classList.add("hidden");
      },
      showLoginView: () => {
        if (DOMElements.authContainer)
          DOMElements.authContainer.classList.remove("hidden");
        if (DOMElements.appContainer)
          DOMElements.appContainer.classList.add("hidden");
        if (DOMElements.loadingView)
          DOMElements.loadingView.classList.add("hidden");
        if (DOMElements.loginView)
          DOMElements.loginView.classList.remove("hidden");
        if (DOMElements.profileFormLoginContainer)
          DOMElements.profileFormLoginContainer.classList.add("hidden");
      },
      showAppView: () => {
        if (DOMElements.authContainer)
          DOMElements.authContainer.classList.add("hidden");
        if (DOMElements.appContainer)
          DOMElements.appContainer.classList.remove("hidden");
      },
      showInitialProfileForm: () => {
        const user = auth.currentUser;
        if (!user || !DOMElements.inputs.name) return;
        DOMElements.inputs.name.value = user.displayName || "";
        if (DOMElements.loadingView)
          DOMElements.loadingView.classList.add("hidden");
        if (DOMElements.loginView)
          DOMElements.loginView.classList.add("hidden");
        if (DOMElements.profileFormLoginContainer)
          DOMElements.profileFormLoginContainer.classList.remove("hidden");
      },
      updatePerformanceDisplay: () => {
        const levelElement = document.querySelector(
          "#performa_display span.text-\\[20px\\]"
        );
        const progressBars = document.querySelectorAll(
          "#performa_display progress"
        );
        if (!levelElement || progressBars.length < 3) return;
        levelElement.textContent = `LV. ${localUserData.level ?? 0}`;
        progressBars[0].value = localUserData.streak ?? 0;
        progressBars[1].value = localUserData.fisik ?? 0;
        progressBars[2].value = localUserData.mental ?? 0;
      },
      updatePointsDisplay: () => {
        const pointsContainer = document.querySelector(
          "#harapan_display .flex-row"
        );
        if (pointsContainer && pointsContainer.childNodes.length > 2) {
          pointsContainer.childNodes[1].nodeValue = ` ${
            localUserData.poin ?? 0
          } `;
        }
      },
      updateProfilePage: () => {
        const nameElement = document.getElementById("name");
        const name2Element = document.getElementById("name2");
        const poinElement = document.getElementById("profile_poin_display");
        const emailElement = document.getElementById("email");
        const genderIconElement = document.getElementById("gender_icon");
        const genderElement = document.getElementById("gender");
        const ageElement = document.getElementById("age");
        if (
          !nameElement ||
          !name2Element ||
          !poinElement ||
          !emailElement ||
          !genderIconElement ||
          !genderElement ||
          !ageElement
        )
          return;
        nameElement.textContent = localUserData.name || "Nama Pengguna";
        name2Element.textContent = localUserData.name || "Nama Pengguna";
        poinElement.textContent = `${localUserData.poin || 0} Harapan`;
        emailElement.textContent = localUserData.email || "";
        genderElement.textContent = localUserData.gender || "Belum diatur";
        if (localUserData.tanggalLahir) {
          const birthDate = new Date(localUserData.tanggalLahir);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
            age--;
          ageElement.textContent = `${age} Tahun`;
        } else {
          ageElement.textContent = "Usia belum diatur";
        }
        if (localUserData.gender === "Laki-laki") {
          genderIconElement.innerHTML = `<div class="svg w-6 h-6 bg-(image:--male) bg-contain bg-center bg-no-repeat"></div>`;
        } else if (localUserData.gender === "Perempuan") {
          genderIconElement.innerHTML = `<div class="svg w-6 h-6 bg-(image:--female) bg-contain bg-center bg-no-repeat"></div>`;
        } else {
          genderIconElement.innerHTML = "";
        }
      },
      updateAvatarDisplay: () => {
        if (!DOMElements.mainAvatar || !localUserData.avatar) return;
        const avatar = localUserData.avatar;
        [DOMElements.mainAvatar, DOMElements.homeAvatar].forEach((el) => {
          if (!el) return;
          el.style.backgroundImage = "";
          el.className =
            el.id === "homeAvatar"
              ? "img-src w-[50px] h-[50px] bg-cover bg-center bg-no-repeat rounded-full"
              : "img-src ring-amber-600 ring-offset-base-200 w-30 rounded-full ring-4 ring-offset-4 bg-center bg-cover bg-no-repeat";
          if (avatar.startsWith("http")) {
            el.style.backgroundImage = `url(${avatar})`;
          } else if (avatar.startsWith("--ava")) {
            el.classList.add(`bg-(image:${avatar})`);
          }
        });
      },
      showCompletionPopup: (mission) => {
        if (!DOMElements.popup || !DOMElements.popupMessage) return;
        DOMElements.popupMessage.textContent = `Selamat! Kamu udah nyelesain "${mission.name}" dan dapat +${mission.points} Poin Harapan & +${mission.rewards.xp} XP.`;
        DOMElements.popup.classList.remove("hidden");
      },
      hideCompletionPopup: () => {
        if (DOMElements.popup) DOMElements.popup.classList.add("hidden");
      },
      showProfileEditForm: () => {
        if (!DOMElements.profileFormEditContainer) return;
        DOMElements.inputs.editName.value = localUserData.name || "";
        DOMElements.inputs.editGender.value = localUserData.gender || "";
        DOMElements.inputs.editDob.value = localUserData.tanggalLahir || "";
        DOMElements.profileFormEditContainer.classList.remove("hidden");
      },
      hideProfileEditForm: () => {
        if (DOMElements.profileFormEditContainer)
          DOMElements.profileFormEditContainer.classList.add("hidden");
      },
    };
  }

  function createLogicHandler() {
    return {
      handleCredentialResponse: async (response) => {
        UIManager.showLoading();
        const idToken = response.credential;
        const credential = GoogleAuthProvider.credential(idToken);
        try {
          await signInWithCredential(auth, credential);
        } catch (error) {
          console.error("Gagal login dengan Firebase:", error);
          UIManager.showLoginView();
        }
      },
      handleSaveInitialProfile: async (event) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (!user) return;
        const profileData = {
          name: DOMElements.inputs.name.value,
          gender: DOMElements.inputs.gender.value,
          tanggalLahir: DOMElements.inputs.dob.value,
        };
        if (
          !profileData.name ||
          !profileData.gender ||
          !profileData.tanggalLahir
        ) {
          return alert("Harap lengkapi semua data.");
        }
        UIManager.showLoading();
        try {
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, profileData, { merge: true });
          window.location.reload();
        } catch (error) {
          console.error("Error saat menyimpan profil: ", error);
          UIManager.showInitialProfileForm();
        }
      },
      handleSaveProfileEdit: async (event) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (!user) return;
        const updatedData = {
          name: DOMElements.inputs.editName.value,
          gender: DOMElements.inputs.editGender.value,
          tanggalLahir: DOMElements.inputs.editDob.value,
        };
        if (
          !updatedData.name ||
          !updatedData.gender ||
          !updatedData.tanggalLahir
        ) {
          return alert("Harap lengkapi semua data.");
        }
        const saveButton = DOMElements.profileFormEdit.querySelector(
          'button[type="submit"]'
        );
        saveButton.textContent = "Menyimpan...";
        saveButton.disabled = true;
        try {
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, updatedData);
          localUserData = { ...localUserData, ...updatedData };
          UIManager.updateProfilePage();
          UIManager.hideProfileEditForm();
          alert("Profil berhasil diperbarui!");
        } catch (error) {
          console.error("Gagal memperbarui profil:", error);
        } finally {
          saveButton.textContent = "Simpan";
          saveButton.disabled = false;
        }
      },
      handleLogout: () => {
        signOut(auth).catch((error) => console.error("Gagal logout:", error));
      },
      navigateTo: (pageId) => {
        if (!DOMElements.contentPages) return;
        DOMElements.contentPages.forEach((page) =>
          page.classList.add("hidden")
        );
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.remove("hidden");
        DOMElements.navButtons.forEach((btn) => {
          const buttonIcon = btn.querySelector(".bnav_icon");
          const isActive = btn.dataset.target === pageId;
          btn.classList.toggle("text-amber-600", isActive);
          btn.classList.toggle("text-gray-600", !isActive);
          if (buttonIcon) {
            buttonIcon.classList.toggle("bg-amber-600", isActive);
            buttonIcon.classList.toggle("bg-gray-600", !isActive);
          }
        });
        window.scrollTo(0, 0);
      },
      processMissionRewards: async (userId, mission) => {
        const userDocRef = doc(db, "users", userId);
        const rewards = mission.rewards;
        const updates = {
          poin: increment(mission.points || 0),
          xp: increment(rewards.xp || 0),
          streak: increment(rewards.streak || 0),
          fisik: increment(rewards.fisik || 0),
          mental: increment(rewards.mental || 0),
          completedMissionsToday: arrayUnion(mission.id),
        };
        let newLevel = localUserData.level ?? 0;
        let newXp = (localUserData.xp ?? 0) + (rewards.xp || 0);
        let newXpForNextLevel = localUserData.xpForNextLevel || 100;
        if (newXp >= newXpForNextLevel) {
          newLevel++;
          newXp -= newXpForNextLevel;
          newXpForNextLevel = Math.floor(newXpForNextLevel * 1.5);
          updates.level = newLevel;
          updates.xp = newXp;
          updates.xpForNextLevel = newXpForNextLevel;
          setTimeout(
            () => alert(`🎉 Selamat! Kamu naik ke Level ${newLevel}!`),
            500
          );
        }
        try {
          await updateDoc(userDocRef, updates);
          const updatedDoc = await getDoc(userDocRef);
          if (updatedDoc.exists()) localUserData = updatedDoc.data();
          return true;
        } catch (error) {
          console.error("Gagal sinkronisasi statistik:", error);
          return false;
        }
      },
      handlePostSubmit: async (event) => {
        event.preventDefault();
        const content = DOMElements.postTextarea.value.trim();
        if (!content && !selectedFile)
          return alert("Harap tulis sesuatu atau lampirkan gambar.");
        const submitButton = DOMElements.postForm.querySelector(
          'button[type="submit"]'
        );
        submitButton.disabled = true;
        submitButton.textContent = "Mengirim...";
        let imageUrl = null;
        try {
          if (selectedFile) {
            const formData = new FormData();
            formData.append("key", IMGBB_API_KEY);
            formData.append("image", selectedFile);
            const response = await fetch("https://api.imgbb.com/1/upload", {
              method: "POST",
              body: formData,
            });
            const result = await response.json();
            if (result.success) imageUrl = result.data.url;
            else throw new Error(result.error.message);
          }
          const newPost = {
            content: content,
            imageUrl: imageUrl,
            authorId: auth.currentUser.uid,
            authorName: localUserData.name,
            authorIsVerified: localUserData.isVerified || false,
            timestamp: serverTimestamp(),
            color: postColors[Math.floor(Math.random() * postColors.length)],
          };
          await addDoc(collection(db, "posts"), newPost);
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            lastPostTimestamp: serverTimestamp(),
          });
          DOMElements.postForm.reset();
          DOMElements.removeImageButton.click();
          if (DOMElements.postFormPopup)
            DOMElements.postFormPopup.classList.add("hidden");
          FeatureManager.generatePosts();
        } catch (error) {
          console.error("Gagal mengirim postingan:", error);
          alert(`Gagal mengirim postingan: ${error.message}`);
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = "Kirim";
        }
      },
    };
  }

  function createFeatureManager() {
    return {
      handleDailyTasksAndFetchMissions: async (userId, userData) => {
        const date = new Date();
        const today = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        if (userData.lastLoginDate !== today) {
          const userDocRef = doc(db, "users", userId);
          await updateDoc(userDocRef, {
            completedMissionsToday: [],
            streak: 0,
            lastLoginDate: today,
          });
          localUserData.completedMissionsToday = [];
          localUserData.streak = 0;
          localUserData.lastLoginDate = today;
        }
        const dailyMissionsDocRef = doc(db, "daily_missions", today);
        const dailyMissionsSnap = await getDoc(dailyMissionsDocRef);
        if (!dailyMissionsSnap.exists()) return [];
        const missionIds = dailyMissionsSnap.data().missionIds;
        if (!missionIds || missionIds.length === 0) return [];
        const missionPromises = missionIds.map((id) =>
          getDoc(doc(db, "missions", id))
        );
        const missionDocs = await Promise.all(missionPromises);
        return missionDocs
          .map((docSnap) =>
            docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
          )
          .filter(Boolean);
      },
      createMissionElement: (mission, allMissions) => {
        const missionWrapper = document.createElement("div");
        const missionDiv = document.createElement("div");
        const isCompleted =
          localUserData.completedMissionsToday?.includes(mission.id) || false;
        const baseClasses =
          "mission-item flex flex-col gap-2.5 p-5 bg-white rounded-xl shadow-sm";
        const statusClasses = isCompleted
          ? "text-gray-400 line-through cursor-not-allowed opacity-60"
          : "cursor-pointer hover:shadow-md transition";
        missionDiv.className = `${baseClasses} ${statusClasses}`;
        missionDiv.innerHTML = `<div class="flex justify-between items-center"><span class="text-[16px] font-medium">${
          mission.name
        }</span><span class="font-bold text-[13px] ${
          isCompleted ? "text-gray-400" : "text-amber-600"
        }">+${mission.points} Poin</span></div>`;
        if (!isCompleted) {
          const actionButtonsDiv = document.createElement("div");
          actionButtonsDiv.className =
            "action-buttons flex justify-end space-x-2 text-[12px]";
          actionButtonsDiv.style.display = "none";
          actionButtonsDiv.innerHTML = `<button data-action="finish" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Selesai</button>`;
          missionDiv.appendChild(actionButtonsDiv);
          const finishButton = actionButtonsDiv.querySelector(
            '[data-action="finish"]'
          );
          finishButton.addEventListener("click", async (e) => {
            e.stopPropagation();
            finishButton.disabled = true;
            finishButton.textContent = "Memproses...";
            const success = await LogicHandler.processMissionRewards(
              auth.currentUser.uid,
              mission
            );
            if (success) {
              UIManager.showCompletionPopup(mission);
              UIManager.updatePerformanceDisplay();
              UIManager.updatePointsDisplay();
              FeatureManager.renderAllMissions(allMissions);
            } else {
              alert("Gagal selesain misi. Coba lagi yuk.");
              finishButton.disabled = false;
              finishButton.textContent = "Selesai";
            }
          });
          missionDiv.addEventListener("click", () => {
            const isVisible = actionButtonsDiv.style.display === "flex";
            document
              .querySelectorAll(".action-buttons")
              .forEach((btn) => (btn.style.display = "none"));
            actionButtonsDiv.style.display = isVisible ? "none" : "flex";
          });
        }
        missionWrapper.appendChild(missionDiv);
        return missionWrapper;
      },
      renderAllMissions: (missionsToRender) => {
        if (!DOMElements.missionListContainer) return;
        DOMElements.missionListContainer.innerHTML = "";
        if (!missionsToRender || missionsToRender.length === 0) {
          DOMElements.missionListContainer.innerHTML =
            '<p class="text-center text-gray-500">Tidak ada misi hari ini. Cek lagi besok!</p>';
          return;
        }
        missionsToRender
          .sort((a, b) => {
            const aCompleted = localUserData.completedMissionsToday?.includes(
              a.id
            );
            const bCompleted = localUserData.completedMissionsToday?.includes(
              b.id
            );
            return aCompleted - bCompleted;
          })
          .forEach((mission) => {
            const missionElement = FeatureManager.createMissionElement(
              mission,
              missionsToRender
            );
            DOMElements.missionListContainer.appendChild(missionElement);
          });
      },
      generateLeaderboard: async () => {
        if (!DOMElements.leaderboardContainer) return;
        DOMElements.leaderboardContainer.innerHTML =
          '<p class="text-center text-gray-500">Memuat peringkat...</p>';

        try {
          const q = query(collection(db, "users"), orderBy("poin", "desc"));
          const querySnapshot = await getDocs(q);

          DOMElements.leaderboardContainer.innerHTML = "";
          let rank = 1;

          querySnapshot.forEach((docSnap) => {
            const player = docSnap.data();
            let rankColor, medal, bgColor;

            switch (rank) {
              case 1:
                rankColor = "bg-orange-400";
                medal = "🥇";
                bgColor = "bg-amber-100";
                break;
              case 2:
                rankColor = "bg-gray-400";
                medal = "🥈";
                bgColor = "bg-indigo-100";
                break;
              case 3:
                rankColor = "bg-amber-600";
                medal = "🥉";
                bgColor = "bg-orange-200";
                break;
              default:
                rankColor = "bg-gray-300";
                medal = "";
                bgColor = "bg-gray-100";
            }

            const playerEntry = document.createElement("div");
            playerEntry.className = `flex items-center p-3 rounded-xl shadow-sm ${bgColor}`;

            // --- PERBAIKAN DI SINI ---
            playerEntry.innerHTML = `
                <div class="flex items-center gap-4">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${rankColor}">${rank}</span>
                    <div class="w-8 h-8 rounded-full bg-cover bg-center" style="background-image: url('${
                      player.avatar && player.avatar.startsWith("http")
                        ? player.avatar
                        : "https://placehold.co/40x40/e2e8f0/334155?text=" +
                          player.name.charAt(0)
                    }');"></div>
                    <span class="flex flex-row gap-1.5 font-semibold text-gray-800 items-center">${
                      player.name
                    } ${medal} ${player.isVerified ? verifiedIcon : ""}</span>
                </div>
                <div class="ml-auto mr-1 text-right">
                    <span class="font-bold text-lg text-amber-800">${
                      player.poin ?? 0
                    }</span>
                    <span class="text-xs text-gray-500 block">Harapan</span>
                </div>
            `;
            DOMElements.leaderboardContainer.appendChild(playerEntry);
            rank++;
          });
        } catch (error) {
          console.error("Gagal memuat leaderboard:", error);
          if (DOMElements.leaderboardContainer) {
            DOMElements.leaderboardContainer.innerHTML =
              '<p class="text-center text-red-500">Gagal memuat peringkat.</p>';
          }
        }
      },
      generatePosts: async () => {
        if (!DOMElements.communityWallContainer) return;
        DOMElements.communityWallContainer.innerHTML =
          '<p class="text-center text-gray-500">Memuat postingan...</p>';
        try {
          const q = query(
            collection(db, "posts"),
            orderBy("timestamp", "desc")
          );
          const querySnapshot = await getDocs(q);
          DOMElements.communityWallContainer.innerHTML = "";
          querySnapshot.forEach((docSnap) => {
            const post = docSnap.data();
            const postCard = document.createElement("div");
            postCard.className = `p-4 rounded-xl shadow-sm ${
              postColorMap[post.color] || "bg-gray-200"
            }`;
            const date =
              post.timestamp?.toDate().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
              }) || "Baru saja";
            postCard.innerHTML = `${
              post.imageUrl
                ? `<img src="${post.imageUrl}" alt="Post image" class="mb-3 rounded-lg w-full">`
                : ""
            }<p class="text-base">${
              post.content
            }</p><div class="flex justify-between items-center mt-4"><div class="flex flex-row items-center gap-1"><span class="text-sm font-semibold">by ${
              post.authorName
            }</span>${
              post.authorIsVerified ? verifiedIcon : ""
            }</div><span class="text-xs">${date}</span></div>`;
            DOMElements.communityWallContainer.appendChild(postCard);
          });
        } catch (error) {
          console.error("Gagal memuat postingan:", error);
        }
      },
      checkPostEligibility: () => {
        if (!DOMElements.createPostButton) return;
        const requiredPoints = 100;
        if (localUserData.poin >= requiredPoints)
          DOMElements.createPostButton.classList.remove("hidden");
        else DOMElements.createPostButton.classList.add("hidden");
      },
      generateRandomArticles: async () => {
        if (!DOMElements.articleContainer) return;
        DOMElements.articleContainer.innerHTML =
          '<p class="text-center text-gray-500">Memuat artikel...</p>';
        try {
          const querySnapshot = await getDocs(collection(db, "articles"));
          let articles = [];
          querySnapshot.forEach((doc) =>
            articles.push({ id: doc.id, ...doc.data() })
          );
          for (let i = articles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [articles[i], articles[j]] = [articles[j], articles[i]];
          }
          const randomArticles = articles.slice(0, 3);
          DOMElements.articleContainer.innerHTML = "";
          randomArticles.forEach((article) => {
            const articleCard = document.createElement("div");
            articleCard.className =
              "flex flex-row w-full bg-white rounded-xl shadow-xl overflow-hidden";
            const highlight =
              article.highlight || article.content.substring(0, 100) + "...";
            articleCard.innerHTML = `<div class="flex w-[40%] max-w-[140px]"><img class="flex object-cover w-full h-full" src="${article.thumbnailUrl}" alt="${article.title}"></div><div class="flex flex-col w-full py-3 pl-4 pr-2.5 gap-3 justify-evenly"><h3 class="font-bold text-gray-800 text-base/5">${article.title}</h3><p class="text-xs/4 text-gray-600">${highlight}</p><button class="py-1.5 text-sm font-semibold bg-amber-600 text-white rounded-full read-more-btn" data-id="${article.id}">Lebih Lengkap &rarr;</button></div>`;
            DOMElements.articleContainer.appendChild(articleCard);
          });
          DOMElements.articleContainer
            .querySelectorAll(".read-more-btn")
            .forEach((button) => {
              button.addEventListener("click", (e) => {
                const articleId = e.target.dataset.id;
                const selectedArticle = articles.find(
                  (art) => art.id === articleId
                );
                alert(
                  `Judul: ${selectedArticle.title}\n\nKonten Lengkap:\n${selectedArticle.content}`
                );
              });
            });
        } catch (error) {
          console.error("Gagal memuat artikel:", error);
        }
      },
      getYouTubeVideoId: (url) => {
        const regExp =
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
      },
      generateDynamicVideos: async () => {
        if (!DOMElements.videoContainer) return;
        DOMElements.videoContainer.innerHTML =
          '<p class="text-center text-gray-500">Memuat video...</p>';
        try {
          const querySnapshot = await getDocs(collection(db, "videos"));
          const videoPromises = querySnapshot.docs.map((doc) => {
            const videoUrl = doc.data().url;
            return fetch(`https://noembed.com/embed?url=${videoUrl}`)
              .then((response) => response.json())
              .then((data) => ({ ...data, originalUrl: videoUrl }));
          });
          const videos = await Promise.all(videoPromises);
          DOMElements.videoContainer.innerHTML = "";
          videos.forEach((video) => {
            const videoId = FeatureManager.getYouTubeVideoId(video.originalUrl);
            const youtubeAppUrl = `youtube://watch?v=${videoId}`;
            const videoCard = document.createElement("div");
            videoCard.className =
              "flex flex-row bg-white rounded-xl px-3 py-4 overflow-hidden items-center-safe shadow-xl";
            videoCard.innerHTML = `<img src="${video.thumbnail_url}" alt="${video.title}" class="w-38 h-26 ml-1.5 object-cover flex-shrink-0 rounded-xl"><div class="flex flex-col w-full pr-0 pl-3 py-2 gap-2.5 justify-evenly"><h3 class="font-bold text-base text-gray-800 leading-tight">${video.title}</h3><p class="text-xs text-gray-500 mt-1 flex-grow">oleh: ${video.author_name}</p><a href="${youtubeAppUrl}" target="_blank" class="flex flex-row mt-2 text-sm bg-red-700 w-full px-4 py-1.5 rounded-full font-semibold text-white justify-center">Tonton Video &rarr;</a></div>`;
            DOMElements.videoContainer.appendChild(videoCard);
          });
        } catch (error) {
          console.error("Gagal memuat video:", error);
        }
      },
      initCarousel: () => {
        if (!DOMElements.slidesContainer || !DOMElements.dotsContainer) return;
        const bannerImages = [
          "https://placehold.co/600x300/a5f3fc/0ea5e9?text=Selamat+Datang!",
          "https://placehold.co/600x300/f59e0b/ffffff?text=Info+Terbaru",
          "https://placehold.co/600x300/ec4899/ffffff?text=Event+Spesial",
        ];
        const showSlide = (index) => {
          if (!DOMElements.slidesContainer) return;
          DOMElements.slidesContainer.style.transform = `translateX(-${
            index * 100
          }%)`;
          const dots =
            DOMElements.dotsContainer.querySelectorAll(".carousel-dot");
          dots.forEach((dot, i) => {
            dot.classList.toggle("bg-gray-800", i === index);
            dot.classList.toggle("bg-gray-300", i !== index);
          });
          carouselCurrentIndex = index;
        };
        const startAutoplay = () => {
          clearInterval(carouselInterval);
          carouselInterval = setInterval(() => {
            const nextIndex = (carouselCurrentIndex + 1) % bannerImages.length;
            showSlide(nextIndex);
          }, 4000);
        };
        DOMElements.slidesContainer.innerHTML = "";
        DOMElements.dotsContainer.innerHTML = "";
        bannerImages.forEach((src) => {
          const slide = document.createElement("div");
          slide.className = "w-full h-full flex-shrink-0";
          slide.innerHTML = `<img src="${src}" class="w-full h-full object-cover" alt="Banner Image">`;
          DOMElements.slidesContainer.appendChild(slide);
        });
        bannerImages.forEach((_, index) => {
          const dot = document.createElement("button");
          dot.className =
            "carousel-dot w-2.5 h-2.5 rounded-full transition-colors duration-300";
          dot.addEventListener("click", () => {
            showSlide(index);
            startAutoplay();
          });
          DOMElements.dotsContainer.appendChild(dot);
        });
        showSlide(0);
        startAutoplay();
      },
      openAvatarPopup: () => {
        if (!auth.currentUser || !DOMElements.avatarPopup) return;
        selectedAvatarValue = localUserData.avatar || auth.currentUser.photoURL;
        DOMElements.googlePhotoChoice.innerHTML = `<img src="${auth.currentUser.photoURL}" class="w-16 h-16 rounded-full">`;
        DOMElements.defaultAvatarsGrid.innerHTML = "";
        ["--ava-1", "--ava-2", "--ava-3", "--ava-4", "--ava-5"].forEach(
          (avaVar) => {
            const div = document.createElement("div");
            div.className =
              "img-src avatar-choice w-16 h-16 rounded-full cursor-pointer bg-cover bg-center";
            div.classList.add(`bg-(image:${avaVar})`);
            div.dataset.value = avaVar;
            DOMElements.defaultAvatarsGrid.appendChild(div);
          }
        );
        FeatureManager.updateSelectionVisual();
        DOMElements.avatarPopup.classList.remove("hidden");
      },
      closeAvatarPopup: () => {
        if (DOMElements.avatarPopup)
          DOMElements.avatarPopup.classList.add("hidden");
      },
      updateSelectionVisual: () => {
        document.querySelectorAll(".avatar-choice").forEach((el) => {
          el.classList.remove("selected");
          if (
            el.dataset.value === selectedAvatarValue ||
            (el.id === "google-photo-choice" &&
              selectedAvatarValue.startsWith("http"))
          ) {
            el.classList.add("selected");
          }
        });
      },
      selectAvatar: (value) => {
        selectedAvatarValue = value;
        FeatureManager.updateSelectionVisual();
      },
      saveAvatarChoice: async () => {
        if (!selectedAvatarValue || !DOMElements.saveAvatarButton) return;
        DOMElements.saveAvatarButton.textContent = "Menyimpan...";
        DOMElements.saveAvatarButton.disabled = true;
        try {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(userDocRef, { avatar: selectedAvatarValue });
          localUserData.avatar = selectedAvatarValue;
          UIManager.updateAvatarDisplay();
          FeatureManager.closeAvatarPopup();
        } catch (error) {
          console.error("Gagal menyimpan avatar:", error);
        } finally {
          DOMElements.saveAvatarButton.textContent = "Simpan";
          DOMElements.saveAvatarButton.disabled = false;
        }
      },
    };
  }

  function runSplashAndApp() {
    const SPLASH_TIMEOUT_MS = 1 * 60 * 60 * 1000; // 1 Jam
    const now = new Date().getTime();
    const lastSplashTime = localStorage.getItem("lastSplashTime");

    const showContent = () => {
      if (DOMElements.splashScreen) {
        DOMElements.splashScreen.classList.add(
          "opacity-0",
          "pointer-events-none"
        );
      }
      initializeEventListeners();

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().tanggalLahir) {
            localUserData = userDoc.data();
            UIManager.showAppView();
            runAppFeatures();
          } else {
            if (!userDoc.exists()) {
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
                completedMissionsToday: [],
                lastLoginDate: null,
                isVerified: false,

                // DITAMBAHKAN: Status peliharaan awal
                petStats: {
                  health: 100,
                  hunger: 100,
                  thirst: 100,
                  happiness: 100,
                  cleanliness: 100,
                },
                lastPetUpdate: serverTimestamp(), // Waktu update terakhir

                // Inventaris & Misi
                inventory: {},
                completedMissionsToday: [],
                lastLoginDate: null,
                lastPostTimestamp: null,
                petUrl: null,
                petName: "Pet",

                settings: {
                  bgmOn: false,
                },
              };
              await setDoc(doc(db, "users", user.uid), initialUserData);
            }
            UIManager.showLoginView();
            UIManager.showInitialProfileForm();
          }
        } else {
          if (typeof google !== "undefined" && google.accounts?.id) {
            localStorage.removeItem("lastSplashTime");
            google.accounts.id.initialize({
              client_id: GOOGLE_CLIENT_ID,
              callback: LogicHandler.handleCredentialResponse,
            });
            google.accounts.id.renderButton(DOMElements.gsiButtonContainer, {
              theme: "outline",
              size: "large",
              shape: "pill",
              text: "continue_with",
            });
            UIManager.showLoginView();
          }
        }
      });
    };

    if (lastSplashTime && now - lastSplashTime < SPLASH_TIMEOUT_MS) {
      showContent();
    } else {
      setTimeout(() => {
        localStorage.setItem("lastSplashTime", now);
        showContent();
      }, 3000);
    }
  }

  function initializeEventListeners() {
    if (DOMElements.profileFormLogin)
      DOMElements.profileFormLogin.addEventListener(
        "submit",
        LogicHandler.handleSaveInitialProfile
      );
    if (DOMElements.logoutButton)
      DOMElements.logoutButton.addEventListener(
        "click",
        LogicHandler.handleLogout
      );
    DOMElements.navButtons?.forEach((button) => {
      button.addEventListener("click", () =>
        LogicHandler.navigateTo(button.dataset.target)
      );
    });
    DOMElements.backButton?.forEach((button) => {
      button.addEventListener("click", () =>
        LogicHandler.navigateTo("homepage")
      );
    });
    if (DOMElements.closePopupButton)
      DOMElements.closePopupButton.addEventListener(
        "click",
        UIManager.hideCompletionPopup
      );
    if (DOMElements.editProfileButton)
      DOMElements.editProfileButton.addEventListener(
        "click",
        UIManager.showProfileEditForm
      );
    if (DOMElements.cancelEditButton)
      DOMElements.cancelEditButton.addEventListener(
        "click",
        UIManager.hideProfileEditForm
      );
    if (DOMElements.profileFormEdit)
      DOMElements.profileFormEdit.addEventListener(
        "submit",
        LogicHandler.handleSaveProfileEdit
      );
    if (DOMElements.editAvatarTrigger)
      DOMElements.editAvatarTrigger.addEventListener(
        "click",
        FeatureManager.openAvatarPopup
      );
    if (DOMElements.cancelAvatarButton)
      DOMElements.cancelAvatarButton.addEventListener(
        "click",
        FeatureManager.closeAvatarPopup
      );
    if (DOMElements.saveAvatarButton)
      DOMElements.saveAvatarButton.addEventListener(
        "click",
        FeatureManager.saveAvatarChoice
      );
    if (DOMElements.googlePhotoChoice)
      DOMElements.googlePhotoChoice.addEventListener("click", () =>
        FeatureManager.selectAvatar(auth.currentUser.photoURL)
      );
    if (DOMElements.defaultAvatarsGrid)
      DOMElements.defaultAvatarsGrid.addEventListener("click", (e) => {
        if (e.target.matches(".avatar-choice"))
          FeatureManager.selectAvatar(e.target.dataset.value);
      });
    if (DOMElements.createPostButton)
      DOMElements.createPostButton.addEventListener("click", () =>
        DOMElements.postFormPopup.classList.remove("hidden")
      );
    if (DOMElements.cancelPostButton)
      DOMElements.cancelPostButton.addEventListener("click", () =>
        DOMElements.postFormPopup.classList.add("hidden")
      );
    if (DOMElements.postForm)
      DOMElements.postForm.addEventListener(
        "submit",
        LogicHandler.handlePostSubmit
      );
    if (DOMElements.imageUploadInput)
      DOMElements.imageUploadInput.addEventListener("change", (event) => {
        if (event.target.files && event.target.files[0]) {
          selectedFile = event.target.files[0];
          DOMElements.imagePreview.src = URL.createObjectURL(selectedFile);
          DOMElements.imagePreviewContainer.classList.remove("hidden");
        }
      });
    if (DOMElements.removeImageButton)
      DOMElements.removeImageButton.addEventListener("click", () => {
        selectedFile = null;
        DOMElements.imageUploadInput.value = "";
        DOMElements.imagePreview.src = "";
        DOMElements.imagePreviewContainer.classList.add("hidden");
      });
    if (DOMElements.calmSpaceButton)
      DOMElements.calmSpaceButton.addEventListener("click", () => {
        LogicHandler.navigateTo("calmspace_page");
      });
    if (DOMElements.communityWallButton)
      DOMElements.communityWallButton.addEventListener("click", () => {
        LogicHandler.navigateTo("community_wall_page");
      });
    if (DOMElements.petkuButton)
      DOMElements.petkuButton.addEventListener("click", async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            // Ambil ID Token terbaru dari pengguna yang sedang login
            const idToken = await user.getIdToken();
            // Buka halaman petku di tab baru dengan token di URL
            window.open(`petku.html?token=${idToken}`, "_blank");
          } catch (error) {
            console.error("Gagal mendapatkan token:", error);
            alert("Gagal membuka halaman Petku, silakan coba lagi.");
          }
        } else {
          alert("Anda harus login untuk mengakses halaman Petku.");
        }
      });
  }

  async function runAppFeatures() {
    UIManager.updatePerformanceDisplay();
    UIManager.updatePointsDisplay();
    UIManager.updateProfilePage();
    UIManager.updateAvatarDisplay();
    FeatureManager.initCarousel();
    const activeMissions =
      await FeatureManager.handleDailyTasksAndFetchMissions(
        auth.currentUser.uid,
        localUserData
      );
    FeatureManager.renderAllMissions(activeMissions);
    FeatureManager.generateLeaderboard();
    FeatureManager.generatePosts();
    FeatureManager.checkPostEligibility();
    FeatureManager.generateRandomArticles();
    FeatureManager.generateDynamicVideos();
  }

  // --- Langkah D: Jalankan Alur Aplikasi ---
  runSplashAndApp();
});
