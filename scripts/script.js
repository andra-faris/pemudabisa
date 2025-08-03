/* #region Splash Screen */
document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");

  const showMainContent = () => {
    // Efek fade out untuk splash screen
    splashScreen.classList.add("opacity-0");
    // Setelah efek selesai, sembunyikan total dan tampilkan konten
    setTimeout(() => {
      splashScreen.classList.add("hidden");
    }, 900); // Durasi transisi opacity
  };

  // Cek apakah splash screen sudah pernah ditampilkan di sesi ini
  if (sessionStorage.getItem("splashShown") === "true") {
    // Jika sudah, langsung tampilkan konten utama
    splashScreen.classList.add("hidden");
  } else {
    // Jika belum, tampilkan splash screen selama 3 detik
    setTimeout(() => {
      sessionStorage.setItem("splashShown", "true"); // Tandai sudah ditampilkan
      showMainContent();
    }, 3000); // 3000 milidetik = 3 detik
  }
});
/* #endregion */

/* #region firebase imports & env */
// BAGIAN 1: KONFIGURASI DAN INISIALISASI ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
/* #endregion */

/* #region Home: Status Display */
// BAGIAN 2: DATA DAN VARIABEL GLOBAL
// ====================================
// Variabel untuk menyimpan data pengguna yang aktif secara lokal
let localUserData = {};

// Referensi Elemen DOM
const missionListContainer = document.getElementById("mission_list");
const popup = document.getElementById("success-popup");
const popupMessage = document.getElementById("popup-message");
const closePopupButton = document.getElementById("close-popup");

// --- FUNGSI TAMPILAN (UI) ---
const updatePerformanceDisplay = () => {
  const levelElement = document.querySelector(
    "#performa_display span.text-\\[20px\\]"
  );
  const progressBars = document.querySelectorAll("#performa_display progress");
  if (!levelElement || progressBars.length < 3) return;

  levelElement.textContent = `LV. ${localUserData.level ?? 0}`;
  progressBars[0].value = localUserData.streak ?? 0;
  progressBars[1].value = localUserData.fisik ?? 0;
  progressBars[2].value = localUserData.mental ?? 0;
};

const updatePointsDisplay = () => {
  const pointsContainer = document.querySelector("#harapan_display .flex-row");
  if (pointsContainer && pointsContainer.childNodes.length > 2) {
    pointsContainer.childNodes[2].nodeValue = ` ${localUserData.poin ?? 0} `;
  }
};

const showCompletionPopup = (mission) => {
  if (!popup || !popupMessage) return;
  popupMessage.textContent = `Selamat! Anda menyelesaikan "${mission.name}" dan mendapatkan +${mission.points} Poin & +${mission.rewards.xp} XP.`;
  popup.classList.remove("hidden");
};

const hideCompletionPopup = () => {
  if (popup) popup.classList.add("hidden");
};

// --- LOGIKA INTI (SINKRONISASI & PEMBUATAN ELEMEN) ---

// Fungsi untuk menangani reset harian dan mengambil misi aktif
const handleDailyTasksAndFetchMissions = async (userId, userData) => {
  const date = new Date();
  const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
  const lastLoginDate = userData.lastLoginDate;

  if (lastLoginDate !== today) {
    console.log("Hari baru terdeteksi, mereset statistik harian...");
    const userDocRef = doc(db, "users", userId);
    try {
      await updateDoc(userDocRef, {
        completedMissionsToday: [],
        streak: 0,
        lastLoginDate: today,
      });
      // Perbarui data lokal setelah reset berhasil
      localUserData.completedMissionsToday = [];
      localUserData.streak = 0;
      localUserData.lastLoginDate = today;
    } catch (error) {
      console.error("Gagal mereset data harian:", error);
    }
  }

  const dailyMissionsDocRef = doc(db, "daily_missions", today);
  const dailyMissionsSnap = await getDoc(dailyMissionsDocRef);

  if (!dailyMissionsSnap.exists()) {
    console.error(
      `Dokumen misi harian TIDAK ditemukan untuk tanggal ${today}.`
    );
    return [];
  }

  const missionIds = dailyMissionsSnap.data().missionIds;
  if (!missionIds || missionIds.length === 0) {
    console.warn(
      `Field 'missionIds' kosong atau tidak ada di dokumen ${today}.`
    );
    return [];
  }

  console.log("ID Misi yang akan diambil:", missionIds);
  const missionPromises = missionIds.map((id) =>
    getDoc(doc(db, "missions", id))
  );
  const missionDocs = await Promise.all(missionPromises);

  const activeMissions = missionDocs
    .map((docSnap) => (docSnap.exists() ? docSnap.data() : null))
    .filter(Boolean);
  console.log("Data misi aktif:", activeMissions);
  return activeMissions;
};

// Fungsi untuk sinkronisasi hadiah misi ke Firestore
const processMissionRewards = async (userId, mission) => {
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
    setTimeout(() => alert(`🎉 Selamat! Anda naik ke Level ${newLevel}!`), 500);
  }

  try {
    await updateDoc(userDocRef, updates);
    console.log("Statistik berhasil disinkronkan ke Firestore.");

    // Cukup ambil data terbaru dari server untuk memastikan konsistensi
    const updatedDoc = await getDoc(userDocRef);
    if (updatedDoc.exists()) {
      localUserData = updatedDoc.data(); // Perbarui data lokal dengan data server
    }
    return true;
  } catch (error) {
    console.error("Gagal sinkronisasi statistik:", error);
    return false;
  }
};

const createMissionElement = (mission, allMissions) => {
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

  missionDiv.innerHTML = `
        <div class="flex justify-between items-center">
            <span class="text-[16px] font-medium">${mission.name}</span>
            <span class="font-bold text-[13px] ${
              isCompleted ? "text-gray-400" : "text-amber-600"
            }">+${mission.points} Poin</span>
        </div>`;

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
      const success = await processMissionRewards(
        auth.currentUser.uid,
        mission
      );
      if (success) {
        showCompletionPopup(mission);
        updatePerformanceDisplay();
        updatePointsDisplay();
        renderAllMissions(allMissions); // Render ulang dengan daftar misi yang sama
      } else {
        alert("Gagal menyelesaikan misi. Coba lagi.");
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
};

// --- FUNGSI RENDER UTAMA (Dipanggil dari onAuthStateChanged) ---
const renderAllMissions = (missionsToRender) => {
  if (!missionListContainer) return;
  missionListContainer.innerHTML = "";

  if (!missionsToRender || missionsToRender.length === 0) {
    missionListContainer.innerHTML =
      '<p class="text-center text-gray-500">Tidak ada misi hari ini. Cek lagi besok!</p>';
    return;
  }

  missionsToRender
    .sort((a, b) => {
      const aCompleted = localUserData.completedMissionsToday?.includes(a.id);
      const bCompleted = localUserData.completedMissionsToday?.includes(b.id);
      return aCompleted - bCompleted;
    })
    .forEach((mission) => {
      const missionElement = createMissionElement(mission, missionsToRender); // Kirim daftar misi
      missionListContainer.appendChild(missionElement);
    });
};

// BAGIAN 5: TITIK MASUK UTAMA APLIKASI (ENTRY POINT)
// ====================================================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Pengguna login:", user.uid);
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      localUserData = docSnap.data(); // Simpan data ke variabel global
      console.log("Data pengguna:", localUserData);
      const activeMissions = await handleDailyTasksAndFetchMissions(
        user.uid,
        localUserData
      );

      // Panggil semua fungsi update/render setelah data siap
      updatePerformanceDisplay();
      updatePointsDisplay();
      renderAllMissions(activeMissions);
      updateProfilePage();
      updateAvatarDisplay(); // <-- PANGGIL DI SINI
      initializeAvatarEditor();
      generateLeaderboard();
    } else {
      console.error("Data pengguna tidak ditemukan di Firestore!");
      window.location.href = "./other-features/login-page.html"; // Redirect jika data tidak ada
    }
  } else {
    console.log(
      "Tidak ada pengguna yang login. Mengarahkan ke halaman login..."
    );
    window.location.href = "./other-features/login-page.html"; // Redirect jika tidak login
  }
});

// Event listener untuk tombol popup
if (closePopupButton)
  closePopupButton.addEventListener("click", hideCompletionPopup);

// --- Fungsi untuk memperbarui tampilan Halaman Profil ---
const updateProfilePage = () => {
  // Referensi ke elemen-elemen di halaman profil
  const nameElement = document.getElementById("name");
  const name2Element = document.getElementById("name2");
  const poinElement = document.getElementById("profile_poin_display");
  const emailElement = document.getElementById("email");
  const genderIconElement = document.getElementById("gender_icon");
  const genderElement = document.getElementById("gender");
  const ageElement = document.getElementById("age");

  // Pastikan semua elemen ada sebelum melanjutkan
  if (
    !nameElement ||
    !name2Element ||
    !poinElement ||
    !emailElement ||
    !genderIconElement ||
    !genderElement ||
    !ageElement
  ) {
    return;
  }

  // Isi elemen dengan data dari `localUserData`
  nameElement.textContent = localUserData.name || "Nama Pengguna";
  name2Element.textContent = localUserData.name || "Nama Pengguna";
  poinElement.textContent = `${localUserData.poin || 0} Poin`;
  emailElement.textContent = localUserData.email || "";
  genderElement.textContent = localUserData.gender || "Belum diatur";

  // Tampilkan ikon yang sesuai berdasarkan jenis kelamin
  if (localUserData.gender === "Laki-laki") {
    genderIconElement.innerHTML = `<div class="svg w-6 h-6 bg-(image:--male) bg-contain bg-center bg-no-repeat"></div>`;
  } else if (localUserData.gender === "Perempuan") {
    genderIconElement.innerHTML = `<div class="svg w-6 h-6 bg-(image:--female) bg-contain bg-center bg-no-repeat"></div>`;
  } else {
    genderIconElement.innerHTML = ""; // Kosongkan jika tidak ada data
  }

  // --- LOGIKA BARU UNTUK USIA ---
  if (localUserData.tanggalLahir) {
    const birthDate = new Date(localUserData.tanggalLahir);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    ageElement.textContent = `${age} Tahun`;
  } else {
    ageElement.textContent = "Usia belum diatur";
  }
};

// --- LOGIKA LOGOUT ---
const logoutButton = document.getElementById("btn_logout");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        // Logout berhasil.
        console.log("Pengguna berhasil logout.");
        // Arahkan kembali ke halaman login.
        window.location.href = "./other-features/login-page.html";
      })
      .catch((error) => {
        // Terjadi error saat logout.
        console.error("Gagal logout:", error);
        alert("Gagal untuk logout, silakan coba lagi.");
      });
  });
}

/* #endregion */

/* #region Avatar Selection */
// --- LOGIKA EDITOR AVATAR ---

// Referensi Elemen DOM untuk Avatar
const homeAvatarContainer = document.getElementById("homeAvatar");
const mainAvatarContainer = document.querySelector(".d-avatar > div");
// const editAvatarTrigger = document.querySelector(".d-avatar");
const editAvatarTrigger = document.querySelector("#edit-avatar");
const avatarPopup = document.getElementById("avatar-popup");
const googlePhotoChoice = document.getElementById("google-photo-choice");
const defaultAvatarsGrid = document.getElementById("default-avatars-grid");
const saveAvatarButton = document.getElementById("save-avatar-change");
const cancelAvatarButton = document.getElementById("cancel-avatar-change");

// Variabel untuk menyimpan pilihan sementara
let selectedAvatarValue = null;

// Fungsi untuk menampilkan avatar utama pengguna
const updateAvatarDisplay = () => {
  if (!mainAvatarContainer || !localUserData.avatar) return;

  const avatar = localUserData.avatar;
  // Hapus style lama
  mainAvatarContainer.style.backgroundImage = "";
  homeAvatarContainer.style.backgroundImage = "";
  mainAvatarContainer.className =
    "img-src ring-amber-600 ring-offset-base-200 w-30 rounded-full ring-4 ring-offset-4 bg-center bg-cover bg-no-repeat";
  homeAvatarContainer.className =
    "img-src w-[50px] h-[50px] bg-contain bg-center bg-no-repeat rounded-full";
  if (avatar.startsWith("http")) {
    // Jika avatar adalah URL dari Google
    mainAvatarContainer.style.backgroundImage = `url(${avatar})`;
    homeAvatarContainer.style.backgroundImage = `url(${avatar})`;
  } else if (avatar.startsWith("--ava")) {
    // Jika avatar adalah variabel CSS
    mainAvatarContainer.classList.add(`bg-(image:${avatar})`);
  }
};

// Fungsi untuk membuka popup
const openAvatarPopup = () => {
  if (!auth.currentUser) return;

  // 1. Set nilai terpilih saat ini
  selectedAvatarValue = localUserData.avatar || auth.currentUser.photoURL;

  // 2. Tampilkan pratinjau foto Google
  googlePhotoChoice.innerHTML = `<img src="${auth.currentUser.photoURL}" class="w-16 h-16 rounded-full">`;

  // 3. Tampilkan pratinjau avatar default
  defaultAvatarsGrid.innerHTML = ""; // Kosongkan dulu
  ["--ava-1", "--ava-2", "--ava-3", "--ava-4", "--ava-5"].forEach((avaVar) => {
    const div = document.createElement("div");
    div.className =
      "img-src avatar-choice w-16 h-16 rounded-full cursor-pointer bg-cover bg-center";
    div.classList.add(`bg-(image:${avaVar})`);
    div.dataset.value = avaVar; // Simpan nilai di data-attribute
    defaultAvatarsGrid.appendChild(div);
  });

  // 4. Update tampilan visual pilihan
  updateSelectionVisual();

  // 5. Tampilkan popup
  avatarPopup.classList.remove("hidden");
};

// Fungsi untuk menutup popup
const closeAvatarPopup = () => avatarPopup.classList.add("hidden");

// Fungsi untuk update cincin/ring seleksi
const updateSelectionVisual = () => {
  document.querySelectorAll(".avatar-choice").forEach((el) => {
    // Hapus seleksi dari semua
    el.classList.remove("selected");
    // Tambahkan seleksi ke yang cocok
    if (
      el.dataset.value === selectedAvatarValue ||
      (el.id === "google-photo-choice" &&
        selectedAvatarValue.startsWith("http"))
    ) {
      el.classList.add("selected");
    }
  });
};

// Inisialisasi semua event listener untuk editor avatar
const initializeAvatarEditor = () => {
  if (!editAvatarTrigger) return;

  // Buka popup saat avatar utama diklik
  editAvatarTrigger.addEventListener("click", openAvatarPopup);

  // Tutup popup saat tombol batal diklik
  cancelAvatarButton.addEventListener("click", closeAvatarPopup);

  // Event listener untuk pilihan foto Google
  googlePhotoChoice.addEventListener("click", () => {
    selectedAvatarValue = auth.currentUser.photoURL;
    updateSelectionVisual();
  });

  // Event listener untuk pilihan avatar default (menggunakan event delegation)
  defaultAvatarsGrid.addEventListener("click", (e) => {
    if (e.target.matches(".avatar-choice")) {
      selectedAvatarValue = e.target.dataset.value;
      updateSelectionVisual();
    }
  });

  // Event listener untuk tombol simpan
  saveAvatarButton.addEventListener("click", async () => {
    if (!selectedAvatarValue) return;

    saveAvatarButton.textContent = "Menyimpan...";
    saveAvatarButton.disabled = true;

    const userDocRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        avatar: selectedAvatarValue,
      });
      // Update data lokal & tampilan
      localUserData.avatar = selectedAvatarValue;
      updateAvatarDisplay();
      closeAvatarPopup();
    } catch (error) {
      console.error("Gagal menyimpan avatar:", error);
      alert("Gagal menyimpan perubahan.");
    } finally {
      saveAvatarButton.textContent = "Simpan";
      saveAvatarButton.disabled = false;
    }
  });
};
/* #endregion */

/* #region Profile Customization */
const profileFormContainer = document.getElementById("profile-form-container");
const profileForm = document.getElementById("profile-form");
const editProfileButton = document.getElementById("edit-profile-button");
const cancelEditButton = document.getElementById("cancel-edit-button");
const inputName = document.getElementById("input-name");
const inputGender = document.getElementById("input-gender");
const inputDob = document.getElementById("input-dob");

const showProfileForm = () => {
  if (!profileFormContainer) return;

  // Isi form dengan data pengguna saat ini
  inputName.value = localUserData.name || "";
  inputGender.value = localUserData.gender || "";
  inputDob.value = localUserData.tanggalLahir || "";

  profileFormContainer.classList.remove("hidden");
};

const hideProfileForm = () => {
  if (profileFormContainer) profileFormContainer.classList.add("hidden");
};

const handleSaveProfile = async (event) => {
  event.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const updatedData = {
    name: inputName.value,
    gender: inputGender.value,
    tanggalLahir: inputDob.value,
  };

  if (!updatedData.name || !updatedData.gender || !updatedData.tanggalLahir) {
    alert("Harap lengkapi semua data.");
    return;
  }

  const saveButton = profileForm.querySelector('button[type="submit"]');
  saveButton.textContent = "Menyimpan...";
  saveButton.disabled = true;

  try {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, updatedData);

    // Update data lokal dan segarkan UI
    localUserData = { ...localUserData, ...updatedData };
    updateProfilePage();

    hideProfileForm();
    alert("Profil berhasil diperbarui!");
  } catch (error) {
    console.error("Gagal memperbarui profil:", error);
    alert("Gagal menyimpan perubahan.");
  } finally {
    saveButton.textContent = "Simpan";
    saveButton.disabled = false;
  }
};

// --- Inisialisasi Event Listener untuk Form ---
if (editProfileButton)
  editProfileButton.addEventListener("click", showProfileForm);
if (cancelEditButton)
  cancelEditButton.addEventListener("click", hideProfileForm);
if (profileForm) profileForm.addEventListener("submit", handleSaveProfile);
/* #endregion */

/* #region Home Banner */
// ⚙️ PENGATURAN CAROUSEL
const bannerImages = [
  "https://placehold.co/600x300/FFF/000?text=Banner+1",
  "https://placehold.co/600x300/FFF/000?text=Banner+2",
  "https://placehold.co/600x300/FFF/000?text=Banner+3",
  "https://placehold.co/600x300/FFF/000?text=Banner+4",
];

// Ambil elemen dari DOM
const slidesContainer = document.getElementById("slides_container");
const dotsContainer = document.getElementById("dots_container");

let currentIndex = 0;
let slideInterval;

// Fungsi utama untuk pindah slide dan update dot
const showSlide = (index) => {
  // Pindahkan kontainer slide
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  // Update kelas aktif pada dot indikator
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-gray-800", i === index);
    dot.classList.toggle("bg-gray-300", i !== index);
  });

  currentIndex = index;
};

// Fungsi untuk memulai autoplay
const startAutoplay = () => {
  slideInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % bannerImages.length;
    showSlide(nextIndex);
  }, 4000); // Bergerak setiap 4 detik
};

// Inisialisasi Carousel
const initCarousel = () => {
  // Buat elemen slide dari array bannerImages
  bannerImages.forEach((src) => {
    const slide = document.createElement("div");
    slide.className = "w-full h-full flex-shrink-0";
    slide.innerHTML = `<img src="${src}" class="w-full h-full object-cover" alt="Banner Image">`;
    slidesContainer.appendChild(slide);
  });

  // Buat elemen dot indikator
  bannerImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className =
      "carousel-dot w-2.5 h-2.5 rounded-full transition-colors duration-300";
    dot.addEventListener("click", () => {
      showSlide(index);
      // Reset autoplay saat dot diklik
      clearInterval(slideInterval);
      startAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  // Tampilkan slide pertama dan mulai autoplay
  showSlide(0);
  startAutoplay();
};

initCarousel();
/* #endregion */

/* #region Navigation Logics */
// Ambil semua elemen navigasi
const navButtons = document.querySelectorAll(".bnav");
const backBtn = document.getElementById("btn_back");
const contentPages = document.querySelectorAll(".page_content");
const homepage = document.getElementById("homepage"); // ID untuk halaman utama Anda

/**
 * Fungsi terpusat untuk menangani semua navigasi halaman.
 * @param {string} pageId - ID dari elemen halaman yang ingin ditampilkan.
 */
function navigateTo(pageId) {
  // 1. Sembunyikan semua halaman terlebih dahulu
  contentPages.forEach((page) => {
    page.classList.add("hidden");
  });

  // 2. Tampilkan halaman yang dituju
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove("hidden");
  }

  // 3. Perbarui status aktif tombol navigasi bawah
  navButtons.forEach((btn) => {
    const buttonIcon = btn.querySelector(".bnav_icon");
    // Cek apakah tombol ini adalah tombol untuk halaman yang sedang aktif
    if (btn.dataset.target === pageId) {
      // Terapkan style aktif
      btn.classList.add("text-amber-600");
      btn.classList.remove("text-gray-600");
      if (buttonIcon) {
        buttonIcon.classList.add("bg-amber-600");
        buttonIcon.classList.remove("bg-gray-600");
      }
    } else {
      // Terapkan style non-aktif
      btn.classList.remove("text-amber-600");
      btn.classList.add("text-gray-600");
      if (buttonIcon) {
        buttonIcon.classList.remove("bg-amber-600");
        buttonIcon.classList.add("bg-gray-600");
      }
    }
  });
}

// Pasang event listener untuk semua tombol navigasi utama
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    navigateTo(targetId);

    // Scroll ke atas setiap kali pindah halaman
    window.scrollTo(0, 0);
  });
});

// Pasang event listener untuk tombol kembali
if (backBtn) {
  backBtn.addEventListener("click", () => {
    navigateTo("homepage"); // Langsung panggil fungsi navigasi ke homepage
  });
}
/* #endregion */

/* #region Leaderboard Display */
const generateLeaderboard = async () => {
  const leaderboardContainer = document.getElementById("leaderboard_section");
  if (!leaderboardContainer) return;

  // Tampilkan pesan memuat
  leaderboardContainer.innerHTML =
    '<p class="text-center text-gray-500">Memuat peringkat...</p>';

  try {
    // 1. Buat query untuk mengambil semua user, diurutkan berdasarkan 'poin' secara menurun
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("poin", "desc"));

    // 2. Eksekusi query
    const querySnapshot = await getDocs(q);

    // Kosongkan kontainer sebelum mengisi dengan data baru
    leaderboardContainer.innerHTML = "";
    let rank = 1;

    // 3. Ulangi setiap dokumen hasil query untuk membuat baris peringkat
    querySnapshot.forEach((docSnap) => {
      const player = docSnap.data();

      // Tentukan style berdasarkan peringkat (sama seperti sebelumnya)
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
      playerEntry.innerHTML = `
                <div class="flex items-center gap-4">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${rankColor}">${rank}</span>
                    <div class="w-8 h-8 rounded-full bg-cover bg-center" style="background-image: url('${
                      player.avatar && player.avatar.startsWith("http")
                        ? player.avatar
                        : "https://placehold.co/40x40/e2e8f0/334155?text=" +
                          player.name.charAt(0)
                    }');"></div>
                    <span class="font-semibold text-gray-800">${
                      player.name
                    } ${medal}</span>
                </div>
                <div class="ml-auto text-right">
                    <span class="font-bold text-lg text-amber-800">${
                      player.poin
                    }</span>
                    <span class="text-xs text-gray-500 block">Poin</span>
                </div>
            `;
      leaderboardContainer.appendChild(playerEntry);

      rank++; // Naikkan peringkat untuk pemain selanjutnya
    });
  } catch (error) {
    console.error("Gagal memuat leaderboard:", error);
    leaderboardContainer.innerHTML =
      '<p class="text-center text-red-500">Gagal memuat peringkat. Coba lagi nanti.</p>';
  }
};
/* #endregion */
