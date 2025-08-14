// Impor semua modul Firebase yang dibutuhkan
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --- LANGKAH 1: Titik Masuk Utama ---
// Seluruh aplikasi dimulai dari sini setelah HTML siap.
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Siap. Memulai aplikasi Petku...");
  initPetkuApp();
});

// --- LANGKAH 2: Fungsi Inisialisasi Utama ---
// Fungsi ini mengontrol seluruh alur setup aplikasi.
function initPetkuApp() {
  // --- Bagian A: Konfigurasi dan Inisialisasi Firebase ---
  const firebaseConfig = {
    apiKey: "AIzaSyAemm2qCSpMkJwHYeFqmBUl6eANKO66-dc",
    authDomain: "sadar-by-bisa.firebaseapp.com",
    projectId: "sadar-by-bisa",
    storageBucket: "sadar-by-bisa.firebasestorage.app",
    messagingSenderId: "115946460349",
    appId: "1:115946460349:web:a5f7eb27c98f7a34ac53d4",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const GOOGLE_CLIENT_ID =
  "115946460349-n6vhst1jhcdhhpk9e3tqigefmerv6bpu.apps.googleusercontent.com";

  // --- Bagian B: State & Referensi DOM ---
  let localUserData = {};
  let currentState = "idle";
  let currentShopCollection = "foods";
  let temporarilySelectedPetSrc = null;

  const midiUrl = "https://files.catbox.moe/rt4vtl.mid";

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.05,
      decay: 0.2,
      sustain: 0.6,
      release: 1.0,
    },
  }).toDestination();

  synth.volume.value = -10;

  let midiData;
  let isLoading = false;

  let onConfirmAction = null;

  // Kumpulkan semua referensi elemen di satu tempat
  const DOMElements = {
    petOptions: [
      "https://drive.google.com/thumbnail?id=1QUqyOUGO7cpaBYeXGOw9QEUyTotOAAwz&sz=w500",
      "https://drive.google.com/thumbnail?id=1Sa-8i88UbEO_AEEU5DOvff81KxtMC0x2&sz=w500",
      "https://drive.google.com/thumbnail?id=1qPoXkW9IpTZ1N3qvoaGNQIofc8S2ZoCq&sz=w500",
      "https://drive.google.com/thumbnail?id=1NnNPU2gdr7BQ5Br9N41aLrXLjhRxKt0t&sz=w500",
      "https://drive.google.com/thumbnail?id=1FJR8nU93O0KMZKMigObivhIGfLjh0BXy&sz=w500",
    ],
    pet: document.getElementById("the_pet"),
    petContainer: document.getElementById("pet_container"),
    feedButton: document.getElementById("feed_pet_btn"),
    drinkButton: document.getElementById("drink_pet_btn"),
    playButton: document.getElementById("play_pet_btn"),
    foodImage: document.getElementById("pet_food"),
    drinkImage: document.getElementById("pet_drink"),
    toyImage: document.getElementById("pet_toy"),
    shopButton: document.getElementById("shop_btn"),
    shopPopup: document.getElementById("shop-popup"),
    closeShopButton: document.getElementById("close-shop-btn"),
    shopTabs: document.querySelectorAll(".shop-tab"),
    shopUserPoints: document.getElementById("shop-user-points"),
    shopItemsGrid: document.getElementById("shop-items-grid"),
    inventoryPanel: document.getElementById("inventory-panel"),
    inventoryBlank: document.getElementById("inventory_blank"),
    inventoryTitle: document.getElementById("inventory-title"),
    inventoryItemsGrid: document.getElementById("inventory-items-grid"),
    inventoryCloseBtn: document.getElementById("close_inventory"),
    petkuButton: document.getElementById("petku_btn"),
    changePetPopup: document.getElementById("change-pet-popup"),
    petSelectionGrid: document.getElementById("pet-selection-grid"),
    savePetButton: document.getElementById("save-pet-selection"),
    cancelPetButton: document.getElementById("cancel-pet-selection"),
    mainPetImage: document.getElementById("the_pet"),
    confirmationPopup: document.getElementById("confirmation-popup"),
    confirmationTitle: document.getElementById("confirmation-title"),
    confirmationMessage: document.getElementById("confirmation-message"),
    confirmCancelBtn: document.getElementById("confirm-cancel-btn"),
    confirmActionBtn: document.getElementById("confirm-action-btn"),
    settingsPopup: document.getElementById("settings-popup"),
    petNameInput: document.getElementById("pet-name-input"),
    bgmToggleSwitch: document.getElementById("bgm-toggle-switch"),
    petMenuPopup: document.getElementById("pet-menu-popup"),
    petMenuName: document.getElementById("pet-menu-name"),
    petStatsDetails: document.getElementById("pet-stats-details"),
    menuButton: document.getElementById("menu-pet-btn"),
    settingsButton: document.getElementById("settings-btn"),
    closeMenuButton: document.getElementById("close-menu-btn"),
    closeSettingsButton: document.getElementById("close-settings-btn"),
    savePetNameButton: document.getElementById("save-pet-name-btn"),
    bgmToggle: document.getElementById("bgm-toggle"),
    iconMute: document.getElementById("icon_mute"),
    iconUnmute: document.getElementById("icon_unmute"),
    loginOverlay: document.getElementById('login-overlay'),
    gsiButtonContainer: document.getElementById('gsi-button-container'),
  };

  // --- Bagian C: Definisi Semua Fungsi Helper ---
  // (Salin-tempel semua fungsi Anda yang sudah ada di sini: setPetState, decideNextAction,
  // populateShop, purchaseItem, showInventory, consumeItem, openPetSelectionPopup,
  // savePetSelection, updatePetStatusBars, calculateStatusDecay, showConfirmation, dll.)

  /**
   * Mengatur status dan kelas animasi pet, serta item yang terkait.
   * @param {'idle' | 'walk' | 'jump' | 'eat' | 'drink' | 'play'} state - Status baru untuk pet.
   */
  function setPetState(state) {
    // ... kode fungsi setPetState Anda ...
    // Jangan jalankan ulang animasi yang sama (kecuali untuk aksi singkat seperti melompat)
    if (currentState === state && state !== "jump") return;

    // --- Langkah 1: Reset Total ---
    // Hapus semua kelas animasi sebelumnya dari pet
    DOMElements.pet.className = "pet";
    // Sembunyikan semua item (makanan, minuman, mainan)
    if (DOMElements.foodImage)
      DOMElements.foodImage.classList.remove("food-visible");
    if (DOMElements.drinkImage)
      DOMElements.drinkImage.classList.remove("drink-visible");
    if (DOMElements.toyImage)
      DOMElements.toyImage.classList.remove("toy-visible");

    currentState = state; // Perbarui status saat ini
    const backToIdle = () => setPetState("idle");

    // --- Langkah 2: Terapkan Animasi & Item Baru ---
    switch (state) {
      case "idle":
        DOMElements.pet.classList.add("pet-idle");
        break;

      case "walk":
        DOMElements.pet.classList.add("pet-walk");
        // Untuk animasi yang berulang, kita atur kembali ke idle via setInterval di luar
        break;

      case "jump":
        DOMElements.pet.classList.add("pet-jump");
        DOMElements.pet.addEventListener("animationend", backToIdle, {
          once: true,
        });
        break;

      case "eat":
        DOMElements.pet.classList.add("pet-eat");
        if (DOMElements.foodImage)
          DOMElements.foodImage.classList.add("food-visible"); // Tampilkan makanan
        DOMElements.pet.addEventListener("animationend", backToIdle, {
          once: true,
        });
        break;

      case "drink":
        DOMElements.pet.classList.add("pet-drink");

        if (DOMElements.drinkImage)
          DOMElements.drinkImage.classList.add("drink-visible"); // Tampilkan minuman
        DOMElements.pet.addEventListener("animationend", backToIdle, {
          once: true,
        });
        break;

      case "play":
        DOMElements.pet.classList.add("pet-play");
        if (DOMElements.toyImage)
          DOMElements.toyImage.classList.add("toy-visible"); // Tampilkan mainan
        DOMElements.pet.addEventListener("animationend", backToIdle, {
          once: true,
        });
        break;

      default:
        DOMElements.pet.classList.add("pet-idle");
        break;
    }
  }

  /**
   * Memutuskan aksi acak berikutnya untuk pet, HANYA jika pet sedang diam.
   */
  function decideNextAction() {
    // 1. PERBAIKAN UTAMA: Cek status pet saat ini.
    // Jika pet sedang sibuk (berjalan, melompat, makan, dll.), jangan lakukan apa-apa.
    if (currentState !== "idle") {
      // console.log(`Pet sedang ${currentState}, menunggu giliran berikutnya.`); // Opsional: untuk debugging
      return;
    }

    // 2. Logika probabilitas (tetap sama seperti milik Anda)
    // Pet hanya akan memilih aksi baru jika sedang dalam keadaan 'idle'.
    const rand = Math.random();

    if (rand < 0.5) {
      // 50% kemungkinan untuk tetap diam
      setPetState("idle");
    } else if (rand < 0.9) {
      // 40% kemungkinan untuk berjalan
      setPetState("walk");
    } else {
      // 10% kemungkinan untuk melompat
      setPetState("jump");
    }
  }

  const populateShop = async (collectionName) => {
    if (!DOMElements.shopItemsGrid) return;
    DOMElements.shopUserPoints.textContent = localUserData.poin ?? 0;
    DOMElements.shopItemsGrid.innerHTML =
      '<p class="col-span-full text-center">Memuat item...</p>';

    try {
      const itemsRef = collection(db, collectionName);
      const querySnapshot = await getDocs(itemsRef);

      DOMElements.shopItemsGrid.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() };
        const itemEl = document.createElement("div");
        itemEl.className =
          "flex flex-col items-center p-2 rounded-lg bg-white/50 cursor-pointer hover:bg-amber-200 transition-colors";
        itemEl.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="w-16 h-16 object-contain">
                <span class="text-xs font-semibold mt-1 text-center">${item.name}</span>
                <span class="text-xs text-amber-700 font-bold">${item.price} Poin</span>
            `;
        itemEl.addEventListener("click", () =>
          purchaseItem(item.id, item.price)
        );
        DOMElements.shopItemsGrid.appendChild(itemEl);
      });
    } catch (error) {
      console.error(`Gagal memuat ${collectionName}:`, error);
      DOMElements.shopItemsGrid.innerHTML =
        '<p class="col-span-full text-center text-red-500">Gagal memuat item.</p>';
    }
  };

  const purchaseItem = async (itemId, price) => {
    if (localUserData.poin < price) {
      return alert("Poin kamu tidak cukup!");
    }

    showConfirmation(
      "Konfirmasi Pembelian",
      `Beli item ini seharga ${price} poin harapan?`,
      async () => {
        // Ini adalah fungsi onConfirm
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        try {
          await updateDoc(userDocRef, {
            poin: increment(-price),
            [`inventory.${itemId}`]: increment(1),
          });

          localUserData.poin -= price;
          if (!localUserData.inventory) localUserData.inventory = {};
          localUserData.inventory[itemId] =
            (localUserData.inventory[itemId] || 0) + 1;

          updatePointsDisplay();
          DOMElements.shopUserPoints.textContent = localUserData.poin;
          // Tampilkan notifikasi sukses setelah pembelian
        } catch (error) {
          console.error("Gagal membeli item:", error);
        }
      }
    );
  };

  /**
   * Fungsi serbaguna untuk menampilkan item dari inventaris (makanan atau minuman).
   * @param {'foods' | 'drinks'} itemType - Tipe item yang ingin ditampilkan.
   */
  const showInventory = async (itemType) => {
    console.log(`petku.js: showInventory - Dipanggil untuk tipe: ${itemType}`);

    // Pastikan semua elemen yang dibutuhkan ada
    if (
      !DOMElements.inventoryItemsGrid ||
      !DOMElements.inventoryTitle ||
      !DOMElements.inventoryPanel
    )
      return;

    // Tutup panel lain jika terbuka untuk menghindari tumpang tindih
    DOMElements.inventoryPanel.classList.add("hidden");

    // Atur judul panel secara dinamis
    DOMElements.inventoryTitle.textContent =
      itemType === "foods" ? "Pilih Makanan:" : "Pilih Minuman:";
    DOMElements.inventoryItemsGrid.innerHTML = "";

    const inventory = localUserData.inventory || {};
    const ownedItemIds = Object.keys(inventory).filter(
      (id) => inventory[id] > 0
    );

    if (ownedItemIds.length === 0) {
      DOMElements.inventoryBlank.classList.remove("hidden");
    } else {
      // Ambil detail item dari koleksi yang sesuai (foods atau drinks)
      const itemPromises = ownedItemIds.map((id) =>
        getDoc(doc(db, itemType, id))
      );
      const itemDocs = await Promise.all(itemPromises);

      let itemsFound = 0;
      itemDocs.forEach((docSnap) => {
        if (!docSnap.exists()) return; // Lewati jika item tidak ada di koleksi ini
        DOMElements.inventoryBlank.classList.add("hidden");
        itemsFound++;
        const item = { id: docSnap.id, ...docSnap.data() };
        const itemEl = document.createElement("div");
        itemEl.className =
          "p-1 rounded-md cursor-pointer hover:bg-amber-200 transition-colors";
        itemEl.innerHTML = `<img src="${item.imageUrl}" alt="${item.name}" class="w-12 h-12 object-contain">`;
        itemEl.addEventListener("click", () => consumeItem(item, itemType));
        DOMElements.inventoryItemsGrid.appendChild(itemEl);
      });

      if (itemsFound === 0) {
        DOMElements.inventoryBlank.classList.remove("hidden");
      }
    }
    // Tampilkan panel setelah diisi
    DOMElements.inventoryPanel.classList.remove("hidden");
  };

  /**
   * Fungsi serbaguna untuk mengonsumsi item dan memutar animasi yang sesuai.
   * @param {string} item - ID item yang dikonsumsi.
   * @param {'foods' | 'drinks'} itemType - Tipe item yang dikonsumsi.
   */
  const consumeItem = async (item, itemType) => {
    if (DOMElements.inventoryPanel)
      DOMElements.inventoryPanel.classList.add("hidden");

    let statToUpdate = {};

    let imageElement;
    let animationState;

    if (itemType === "foods") {
      imageElement = DOMElements.foodImage;
      animationState = "eat";
      // setPetState("eat");
      statToUpdate = {
        "petStats.hunger": increment(20), // Tambah 20 poin lapar
        "petStats.happiness": increment(5),
      };
    } else if (itemType === "drinks") {
      imageElement = DOMElements.drinkImage;
      animationState = "drink";
      // setPetState("drink");
      statToUpdate = { "petStats.thirst": increment(20) };
    }

    if (imageElement && item.imageUrl) {
      imageElement.src = item.imageUrl;
    }

    setPetState(animationState);

    const userDocRef = doc(db, "users", auth.currentUser.uid);

    try {
      await updateDoc(userDocRef, {
        [`inventory.${item.id}`]: increment(-1), // Kurangi jumlah item
      });
      // 1. Pastikan petStats ada di data lokal sebelum diubah
      if (!localUserData.petStats) {
        localUserData.petStats = {
          health: 100,
          hunger: 0,
          thirst: 0,
          happiness: 0,
          cleanliness: 100,
        };
      }

      // 2. Perbarui data lokal dengan aman
      localUserData.inventory[item.id]--;
      if (itemType === "foods") {
        localUserData.petStats.hunger = Math.min(
          100,
          (localUserData.petStats.hunger || 0) + 20
        );
        localUserData.petStats.happiness = Math.min(
          100,
          (localUserData.petStats.happiness || 0) + 5
        );
      } else {
        localUserData.petStats.thirst = Math.min(
          100,
          (localUserData.petStats.thirst || 0) + 20
        );
      }

      updatePetStatusBars(); // Segarkan tampilan bar
    } catch (error) {
      console.error(`Gagal mengonsumsi ${itemType}:`, error);
    }
  };

  const openPetSelectionPopup = () => {
    if (!DOMElements.changePetPopup || !DOMElements.petSelectionGrid) return;

    // Simpan pilihan saat ini sebagai default
    temporarilySelectedPetSrc = DOMElements.mainPetImage.src;

    // Kosongkan grid dan isi dengan pilihan pet
    DOMElements.petSelectionGrid.innerHTML = "";
    DOMElements.petOptions.forEach((petSrc) => {
      const petChoice = document.createElement("img");
      petChoice.src = petSrc;
      petChoice.className = "pet-choice aspect-square object-contain p-1";

      // Tandai sebagai terpilih jika cocok dengan pet saat ini
      if (petSrc === temporarilySelectedPetSrc) {
        petChoice.classList.add("selected");
      }

      // Tambahkan event listener untuk memilih
      petChoice.addEventListener("click", () => {
        // Hapus 'selected' dari semua pilihan
        DOMElements.petSelectionGrid
          .querySelectorAll(".pet-choice")
          .forEach((el) => el.classList.remove("selected"));
        // Tambahkan 'selected' ke yang diklik
        petChoice.classList.add("selected");
        // Simpan pilihan sementara
        temporarilySelectedPetSrc = petSrc;
      });

      DOMElements.petSelectionGrid.appendChild(petChoice);
    });

    DOMElements.changePetPopup.classList.remove("hidden");
  };

  const closePetSelectionPopup = () => {
    if (DOMElements.changePetPopup)
      DOMElements.changePetPopup.classList.add("hidden");
  };

  const savePetSelection = async () => {
    if (!DOMElements.mainPetImage || !temporarilySelectedPetSrc) return;

    // Terapkan perubahan di tampilan secara langsung
    DOMElements.mainPetImage.src = temporarilySelectedPetSrc;

    // --- LOGIKA BARU UNTUK MENYIMPAN KE FIRESTORE ---
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        // Update field 'petUrl' di dokumen pengguna
        await updateDoc(userDocRef, {
          petUrl: temporarilySelectedPetSrc,
        });
        // Perbarui juga data lokal agar konsisten
        localUserData.petUrl = temporarilySelectedPetSrc;
      } catch (error) {}
    }
    closePetSelectionPopup();
  };

  const updatePetStatusBars = () => {
    if (!localUserData.petStats) return;
    document.getElementById(
      "health-bar"
    ).style.width = `${localUserData.petStats.health}%`;
    document.getElementById(
      "hunger-bar"
    ).style.width = `${localUserData.petStats.hunger}%`;
    document.getElementById(
      "thirst-bar"
    ).style.width = `${localUserData.petStats.thirst}%`;
    document.getElementById(
      "happiness-bar"
    ).style.width = `${localUserData.petStats.happiness}%`;
  };

  const calculateStatusDecay = async () => {
    if (!localUserData.lastPetUpdate) {
      // Jika belum pernah diupdate, set waktu sekarang
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        lastPetUpdate: serverTimestamp(),
      });
      return;
    }

    const lastUpdate = localUserData.lastPetUpdate.toDate();
    const now = new Date();
    const hoursPassed =
      (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);

    if (hoursPassed < 1) return; // Update hanya jika sudah lewat satu jam

    // Hitung penurunan (misal: 5 poin per jam)
    const decayAmount = Math.floor(hoursPassed) * 5;

    const newStats = {
      hunger: Math.max(0, (localUserData.petStats.hunger || 100) - decayAmount),
      thirst: Math.max(0, (localUserData.petStats.thirst || 100) - decayAmount),
      happiness: Math.max(
        0,
        (localUserData.petStats.happiness || 100) - decayAmount
      ),
    };

    // Update data di Firestore
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      "petStats.hunger": newStats.hunger,
      "petStats.thirst": newStats.thirst,
      "petStats.happiness": newStats.happiness,
      lastPetUpdate: serverTimestamp(),
    });

    // Perbarui data lokal
    localUserData.petStats.hunger = newStats.hunger;
    localUserData.petStats.thirst = newStats.thirst;
    localUserData.petStats.happiness = newStats.happiness;

    console.log(`Status pet diperbarui. Berkurang ${decayAmount} poin.`);
  };

  /**
   * Menampilkan popup konfirmasi dengan pesan dinamis.
   * @param {string} title - Judul popup.
   * @param {string} message - Pesan yang ingin ditampilkan.
   * @param {Function} onConfirm - Fungsi yang akan dijalankan jika pengguna menekan "Ya".
   */
  const showConfirmation = (title, message, onConfirm) => {
    if (!DOMElements.confirmationPopup) return;

    DOMElements.confirmationTitle.textContent = title;
    DOMElements.confirmationMessage.textContent = message;

    onConfirmAction = onConfirm;

    DOMElements.confirmationPopup.classList.remove("hidden");

    // Hapus event listener lama untuk menghindari penumpukan
    // const newActionBtn = DOMElements.confirmActionBtn.cloneNode(true);
    // DOMElements.confirmActionBtn.parentNode.replaceChild(
    //   newActionBtn,
    //   DOMElements.confirmActionBtn
    // );

    // // Pasang event listener yang baru
    // newActionBtn.addEventListener("click", () => {
    //   onConfirm(); // Jalankan aksi
    //   DOMElements.confirmationPopup.classList.add("hidden"); // Tutup popup
    // });

    // DOMElements.confirmationPopup.classList.remove("hidden");
  };

  const handleSaveSettings = async (field, value) => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        [field]: value,
      });
      // Perbarui data lokal
      if (field.startsWith("settings.")) {
        const key = field.split(".")[1];
        if (!localUserData.settings) localUserData.settings = {};
        localUserData.settings[key] = value;
      } else {
        localUserData[field] = value;
      }
      console.log(`Pengaturan ${field} berhasil disimpan.`);
    } catch (error) {
      console.error("Gagal menyimpan pengaturan:", error);
    }
  };

  const closeSettingsPopup = () => {
    if (DOMElements.settingsPopup)
      DOMElements.settingsPopup.classList.add("hidden");
  };

  const openSettingsPopup = () => {
    if (!DOMElements.settingsPopup) return;

    // Isi form dengan data pengguna saat ini
    DOMElements.petNameInput.value = localUserData.petName || "";

    // Atur toggle switch sesuai data
    // Defaultnya true (menyala) jika belum ada pengaturan
    DOMElements.bgmToggleSwitch.checked =
      localUserData.settings?.bgmOn ?? false;
    DOMElements.settingsPopup.classList.remove("hidden");
  };

  const openPetMenuPopup = () => {
    if (!DOMElements.petMenuPopup || !localUserData.petStats) return;

    // Isi nama dan statistik dari data pengguna
    DOMElements.petMenuName.textContent =
      localUserData.petName || "Peliharaanku";

    DOMElements.petStatsDetails.innerHTML = `
        <div class="flex justify-between"><span>❤️ Kesehatan:</span><span class="font-bold">${localUserData.petStats.health}/100</span></div>
        <div class="flex justify-between"><span>🍖 Kelaparan:</span><span class="font-bold">${localUserData.petStats.hunger}/100</span></div>
        <div class="flex justify-between"><span>💧 Kehausan:</span><span class="font-bold">${localUserData.petStats.thirst}/100</span></div>
        <div class="flex justify-between"><span>😊 Kebahagiaan:</span><span class="font-bold">${localUserData.petStats.happiness}/100</span></div>
    `;
    DOMElements.petMenuPopup.classList.remove("hidden");
  };

  const closePetMenuPopup = () => {
    if (DOMElements.petMenuPopup)
      DOMElements.petMenuPopup.classList.add("hidden");
  };


  const handleCredentialResponse = async (response) => {
    // Tampilkan loading saat Firebase memproses login
    DOMElements.loginOverlay.innerHTML = '<p class="text-gray-600">Memverifikasi...</p>';

    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);
    try {
        await signInWithCredential(auth, credential);
        // Setelah berhasil, onAuthStateChanged akan otomatis terpicu lagi
        // dan menjalankan alur untuk pengguna yang sudah login.
    } catch (error) {
        console.error("Gagal login dengan kredensial GSI:", error);
        alert("Terjadi kesalahan saat login. Silakan coba lagi.");
        // Muat ulang untuk memulai kembali proses
        window.location.reload();
    }
  };

  // --- Bagian D: Fungsi Pemasangan Event Listener ---
  function initializeEventListeners() {
    console.log("Memasang semua event listener...");
    DOMElements.pet.addEventListener("click", () => setPetState("jump"));
    DOMElements.feedButton.addEventListener("click", () =>
      showInventory("foods")
    );
    DOMElements.drinkButton.addEventListener("click", () =>
      showInventory("drinks")
    );
    DOMElements.playButton.addEventListener("click", () => setPetState("play"));
    if (DOMElements.inventoryCloseBtn)
      DOMElements.inventoryCloseBtn.addEventListener("click", () =>
        DOMElements.inventoryPanel.classList.add("hidden")
      );
    DOMElements.shopButton.addEventListener("click", () => {
      populateShop(currentShopCollection);
      DOMElements.shopPopup.classList.remove("hidden");
    });
    DOMElements.closeShopButton.addEventListener("click", () =>
      DOMElements.shopPopup.classList.add("hidden")
    );
    if (DOMElements.menuButton)
      DOMElements.menuButton.addEventListener("click", openPetMenuPopup);
    if (DOMElements.closeMenuButton)
      DOMElements.closeMenuButton.addEventListener("click", closePetMenuPopup);
    if (DOMElements.petkuButton)
      DOMElements.petkuButton.addEventListener("click", openPetSelectionPopup);
    if (DOMElements.cancelPetButton)
      DOMElements.cancelPetButton.addEventListener(
        "click",
        closePetSelectionPopup
      );
    if (DOMElements.savePetButton)
      DOMElements.savePetButton.addEventListener("click", savePetSelection);
    if (DOMElements.settingsButton)
      DOMElements.settingsButton.addEventListener("click", openSettingsPopup);
    if (DOMElements.closeSettingsButton)
      DOMElements.closeSettingsButton.addEventListener(
        "click",
        closeSettingsPopup
      );
    if (DOMElements.savePetNameButton) {
      DOMElements.savePetNameButton.addEventListener("click", () => {
        const newName = DOMElements.petNameInput.value.trim();
        if (newName) {
          handleSaveSettings("petName", newName);
          alert("Nama peliharaan berhasil disimpan!");
        }
      });
    }
    if (DOMElements.bgmToggleSwitch) {
      DOMElements.bgmToggleSwitch.addEventListener("change", (e) => {
        const isBgmOn = e.target.checked;
        handleSaveSettings("settings.bgmOn", isBgmOn);
        // Tambahkan logika BGM Anda di sini
        if (isBgmOn) Tone.Transport.start();
        else Tone.Transport.stop();
      });
    }
    if (DOMElements.bgmToggle) {
      DOMElements.bgmToggle.addEventListener("click", async () => {
        DOMElements.iconMute.classList.add("hidden");
        DOMElements.iconUnmute.classList.remove("hidden");

        // Mulai AudioContext (hanya sekali)
        if (Tone.context.state !== "running") {
          await Tone.start();
          console.log("AudioContext berhasil dimulai!");
        }

        // Logika untuk toggle Play/Stop
        if (Tone.Transport.state !== "started") {
          // Jika musik belum dimainkan, ambil dan mainkan
          if (!midiData && !isLoading) {
            isLoading = true;
            const bgmLoading = document.createElement("span");
            bgmLoading.id = "bgm_loading_indicator";
            bgmLoading.textContent = "Loading...";
            bgmLoading.style.marginLeft = "8px";
            DOMElements.bgmToggle.appendChild(bgmLoading);

            try {
              // Gunakan @tonejs/midi untuk mengambil & mem-parsing file dari URL
              midiData = await Midi.fromUrl(midiUrl);

              // Atur tempo BGM sesuai data dari file MIDI
              Tone.Transport.bpm.value = midiData.header.tempos[0].bpm;

              // Buat Part untuk memainkan melodi dari trek yang diinginkan
              // (Trek melodi utama seringkali bukan di trek 0)
              const melodyTrack = midiData.tracks[0]; // Mengakses trek pertama yang ada

              const melodyPart = new Tone.Part((time, note) => {
                synth.triggerAttackRelease(
                  note.name,
                  note.duration,
                  time,
                  note.velocity
                );
              }, melodyTrack.notes).start(0);

              melodyPart.loop = true;
              melodyPart.loopEnd = melodyTrack.duration;
            } catch (e) {
              isLoading = false;
              bgmLoading.textContent = "Error";
              return; // Hentikan jika error
            }

            DOMElements.iconMute.classList.add("hidden");
            DOMElements.iconUnmute.classList.remove("hidden");
            isLoading = false;
            bgmLoading.remove();
          }

          // Mulai Transport untuk memainkan musik
          Tone.Transport.start();
        } else {
          // Jika musik sedang berjalan, hentikan
          Tone.Transport.stop();
          DOMElements.iconMute.classList.remove("hidden");
          DOMElements.iconUnmute.classList.add("hidden");
        }
      });
    }
    if (DOMElements.shopButton) {
      DOMElements.shopButton.addEventListener("click", () => {
        populateShop(currentShopCollection);
        DOMElements.shopPopup.classList.remove("hidden");
      });
    }
    if (DOMElements.closeShopButton)
      DOMElements.closeShopButton.addEventListener("click", () =>
        DOMElements.shopPopup.classList.add("hidden")
      );
    DOMElements.shopTabs?.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Ganti style tab aktif
        DOMElements.shopTabs.forEach((t) => {
          t.classList.remove("border-amber-600", "text-amber-800");
          t.classList.add("border-transparent", "text-gray-500");
        });
        tab.classList.add("border-amber-600", "text-amber-800");
        tab.classList.remove("border-transparent", "text-gray-500");

        // Muat ulang item sesuai koleksi yang dipilih
        currentShopCollection = tab.dataset.collection;
        populateShop(currentShopCollection);
      });
    });
    if (DOMElements.confirmCancelBtn) {
      DOMElements.confirmCancelBtn.addEventListener("click", () => {
        DOMElements.confirmationPopup.classList.add("hidden");
      });
    }
    if (DOMElements.confirmCancelBtn) {
      DOMElements.confirmCancelBtn.addEventListener("click", () => {
        DOMElements.confirmationPopup.classList.add("hidden");
        onConfirmAction = null; // Hapus aksi saat dibatalkan
      });
    }
    if (DOMElements.confirmActionBtn) {
      DOMElements.confirmActionBtn.addEventListener("click", () => {
        // Jika ada aksi yang tersimpan, jalankan
        if (typeof onConfirmAction === "function") {
          onConfirmAction();
        }
        DOMElements.confirmationPopup.classList.add("hidden"); // Tutup popup
        onConfirmAction = null; // Hapus aksi setelah dijalankan
      });
    }
    // ... (lanjutkan dengan semua addEventListener Anda yang lain) ...
  }

  // --- Bagian E: Alur Utama Pengecekan Autentikasi ---
  // Ini adalah "jantung" aplikasi Anda.
  const signInWithToken = async (token) => {
    try {
      const credential = GoogleAuthProvider.credential(token);
      await signInWithCredential(auth, credential);
      // Setelah ini, onAuthStateChanged akan otomatis terpicu dengan data pengguna
    } catch (error) {
      console.error("Login dengan token gagal:", error);
      // Jika token tidak valid, tampilkan pesan error
      document.body.innerHTML =
        '<div class="w-screen h-screen flex items-center justify-center"><p class="text-red-500">Sesi tidak valid atau telah kedaluwarsa. Silakan kembali ke aplikasi utama dan coba lagi.</p></div>';
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    // Jika ada token di URL, coba login dengannya
    signInWithToken(token);
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (DOMElements.loginOverlay) loginOverlay.classList.add('hidden');
      console.log("onAuthStateChanged: Pengguna terdeteksi:", user.uid);
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        localUserData = docSnap.data();
        console.log(
          "onAuthStateChanged: Data pengguna berhasil dimuat.",
          localUserData
        );

        // ALUR YANG BENAR:
        // 1. Perbarui tampilan dengan data
        await calculateStatusDecay();
        updatePetStatusBars();
        if (localUserData.petUrl)
          DOMElements.mainPetImage.src = localUserData.petUrl;

        // 2. Aktifkan semua tombol
        initializeEventListeners();

        // 3. Mulai perilaku pet
        setPetState("idle");
        setInterval(decideNextAction, 7000);
      } else {
        console.error(
          "onAuthStateChanged: Data pengguna tidak ada di Firestore. Mengarahkan ke login..."
        );
        window.location.href = "https://sadar.pemudabisa.com"; // Ganti dengan path login Anda
      }
    } else {
      console.warn(
        "onAuthStateChanged: Tidak ada pengguna yang login. Mengarahkan ke login..."
      );
      if (DOMElements.loginOverlay) DOMElements.loginOverlay.classList.remove('hidden');
        
        if (typeof google !== 'undefined' && google.accounts?.id) {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID, // Pastikan variabel ini ada
                callback: handleCredentialResponse
            });
            // Render tombol GSI di dalam wadah yang sudah disiapkan
            google.accounts.id.renderButton(gsiButtonContainer, {
                theme: "outline",
                size: "large",
                shape: "pill",
                text: "continue_with"
            });
        }
      //startLoginProcess();
      //window.location.href = "https://sadar.pemudabisa.com"; // Ganti dengan path login Anda
    }
  });
}




