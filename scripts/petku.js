import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
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

document.addEventListener("DOMContentLoaded", () => {
  // <!-- #region Initialization -->
  const firebaseConfig = {
    apiKey: "AIzaSyAemm2qCSpMkJwHYeFqmBUl6eANKO66-dc",
    authDomain: "sadar-by-bisa.firebaseapp.com",
    projectId: "sadar-by-bisa",
    storageBucket: "sadar-by-bisa.firebasestorage.app",
    messagingSenderId: "115946460349",
    appId: "1:115946460349:web:a5f7eb27c98f7a34ac53d4",
  };

  // Inisialisasi semua layanan Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  let localUserData = {};
  // <!-- #endregion -->

  // <!-- #region Pet Acts -->
  const pet = document.getElementById("the_pet");
  const petContainer = document.getElementById("pet_container");
  const feedButton = document.getElementById("feed_pet_btn");
  const drinkButton = document.getElementById("drink_pet_btn");
  const playButton = document.getElementById("play_pet_btn");
  const foodImage = document.getElementById("pet_food");
  const drinkImage = document.getElementById("pet_drink");
  const toyImage = document.getElementById("pet_toy");
  let currentState = "idle"; // Status awal
  let currentShopCollection = "foods"; // Set default tab

  // Fungsi untuk mengatur status dan kelas animasi pet
  function setPetState(state) {
    if (currentState === state && state !== "jump") return;
    // Mencegah animasi yang sama berjalan lagi

    // Reset semua kelas animasi
    pet.className = "pet";

    // Hapus juga kelas dari kontainer jika ada
    petContainer.classList.remove("pet-container-bob");
    if (foodImage) foodImage.classList.remove("food-visible");
    if (drinkImage) drinkImage.classList.remove("drink-visible");
    if (toyImage) toyImage.classList.remove("toy-visible");

    // Fungsi untuk kembali ke 'idle' setelah animasi selesai
    const backToIdle = () => setPetState("idle");

    switch (state) {
      case "walk":
        pet.classList.add("pet-walk");
        petContainer.classList.add("pet-container-bob");
        // Animasi jalan Anda finite, jadi kita perlu listener untuk kembali
        pet.addEventListener("animationend", backToIdle, { once: true });
        break;
      case "jump":
        // playSoundEffect("jump");
        pet.classList.add("pet-jump");
        pet.addEventListener("animationend", backToIdle, { once: true });
        break;
      case "eat": // Aksi baru
        // playSoundEffect("eat");
        pet.classList.add("pet-eat");
        if (foodImage) foodImage.classList.add("food-visible");
        pet.addEventListener("animationend", backToIdle, { once: true });
        break;
      case "drink": // Aksi baru
        // playSoundEffect("drink");
        pet.classList.add("pet-drink");
        if (drinkImage) drinkImage.classList.add("drink-visible");
        pet.addEventListener("animationend", backToIdle, { once: true });
        break;
      case "play": // Aksi baru
        pet.classList.add("pet-play");
        if (toyImage) toyImage.classList.add("toy-visible");
        pet.addEventListener("animationend", backToIdle, { once: true });
        break;
      case "idle":
      default:
        pet.classList.add("pet-idle");
        break;
    }
    currentState = state;
  }

  // Fungsi untuk memilih aksi acak
  function decideNextAction() {
    const actions = ["idle", "walk", "jump"];
    // Probabilitas: 50% diam, 40% jalan, 10% lompat
    const rand = Math.random();

    if (rand < 0.5) {
      setPetState("idle");
    } else if (rand < 0.9) {
      setPetState("walk");
    } else {
      setPetState("jump");
    }
  }

  // Mulai siklus perilaku pet
  setPetState("idle"); // Atur status awal
  setInterval(decideNextAction, 5000); // Pilih aksi baru setiap 5 detik
  // <!-- #endregion -->

  // <!-- #region Shop & Inventory -->
  const shopButton = document.getElementById("shop_btn"); // Pastikan tombol shop Anda punya ID ini
  const shopPopup = document.getElementById("shop-popup");
  const closeShopButton = document.getElementById("close-shop-btn");
  const shopTabs = document.querySelectorAll(".shop-tab");
  const shopUserPoints = document.getElementById("shop-user-points");
  const shopItemsGrid = document.getElementById("shop-items-grid");
  const inventoryPanel = document.getElementById("inventory-panel");
  const inventoryTitle = document.getElementById("inventory-title");
  const inventoryBlank = document.getElementById("inventory_blank");
  const inventoryItemsGrid = document.getElementById("inventory-items-grid");
  const inventoryCloseBtn = document.getElementById("close_inventory");
  const menuButton = document.getElementById("menu-pet-btn");
  const petMenuPopup = document.getElementById("pet-menu-popup");
  const petMenuName = document.getElementById("pet-menu-name");
  const petStatsDetails = document.getElementById("pet-stats-details");
  const closeMenuButton = document.getElementById("close-menu-btn");
  const settingsButton = document.getElementById("settings-btn");
  const settingsPopup = document.getElementById("settings-popup");
  const closeSettingsButton = document.getElementById("close-settings-btn");
  const petNameInput = document.getElementById("pet-name-input");
  const savePetNameButton = document.getElementById("save-pet-name-btn");
  const bgmToggleSwitch = document.getElementById("bgm-toggle-switch");
  const confirmationPopup = document.getElementById("confirmation-popup");
  const confirmationTitle = document.getElementById("confirmation-title");
  const confirmationMessage = document.getElementById("confirmation-message");
  const confirmCancelBtn = document.getElementById("confirm-cancel-btn");
  const confirmActionBtn = document.getElementById("confirm-action-btn");

  const openPetMenuPopup = () => {
    if (!petMenuPopup || !localUserData.petStats) return;

    // Isi nama dan statistik dari data pengguna
    petMenuName.textContent = localUserData.petName || "Peliharaanku";

    petStatsDetails.innerHTML = `
        <div class="flex justify-between"><span>❤️ Kesehatan:</span><span class="font-bold">${localUserData.petStats.health}/100</span></div>
        <div class="flex justify-between"><span>🍖 Kelaparan:</span><span class="font-bold">${localUserData.petStats.hunger}/100</span></div>
        <div class="flex justify-between"><span>💧 Kehausan:</span><span class="font-bold">${localUserData.petStats.thirst}/100</span></div>
        <div class="flex justify-between"><span>😊 Kebahagiaan:</span><span class="font-bold">${localUserData.petStats.happiness}/100</span></div>
    `;

    petMenuPopup.classList.remove("hidden");
  };

  const closePetMenuPopup = () => {
    if (petMenuPopup) petMenuPopup.classList.add("hidden");
  };

  // --- FUNGSI-FUNGSI UNTUK PENGATURAN ---
  const openSettingsPopup = () => {
    if (!settingsPopup) return;

    // Isi form dengan data pengguna saat ini
    petNameInput.value = localUserData.petName || "";

    // Atur toggle switch sesuai data
    // Defaultnya true (menyala) jika belum ada pengaturan
    bgmToggleSwitch.checked = localUserData.settings?.bgmOn ?? false;
    // sfxToggleSwitch.checked = localUserData.settings?.sfxOn ?? true;

    settingsPopup.classList.remove("hidden");
  };

  const closeSettingsPopup = () => {
    if (settingsPopup) settingsPopup.classList.add("hidden");
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

  // Fungsi helper baru untuk Efek Suara
  // const playSoundEffect = (soundType) => {
  //   // Hanya mainkan suara jika SFX diaktifkan
  //   if (localUserData.settings?.sfxOn ?? true) {
  //     // Logika untuk memainkan audio bisa ditambahkan di sini
  //     // Contoh: const audio = new Audio(`path/to/${soundType}.mp3`); audio.play();
  //     console.log(`Memainkan SFX: ${soundType}`);
  //   }
  // };

  const populateShop = async (collectionName) => {
    if (!shopItemsGrid) return;
    shopUserPoints.textContent = localUserData.poin ?? 0;
    shopItemsGrid.innerHTML =
      '<p class="col-span-full text-center">Memuat item...</p>';

    try {
      const itemsRef = collection(db, collectionName);
      const querySnapshot = await getDocs(itemsRef);

      shopItemsGrid.innerHTML = "";
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
        shopItemsGrid.appendChild(itemEl);
      });
    } catch (error) {
      console.error(`Gagal memuat ${collectionName}:`, error);
      shopItemsGrid.innerHTML =
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
          shopUserPoints.textContent = localUserData.poin;
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
    // Pastikan semua elemen yang dibutuhkan ada
    if (!inventoryItemsGrid || !inventoryTitle || !inventoryPanel) return;

    // Tutup panel lain jika terbuka untuk menghindari tumpang tindih
    inventoryPanel.classList.add("hidden");

    // Atur judul panel secara dinamis
    inventoryTitle.textContent =
      itemType === "foods" ? "Pilih Makanan:" : "Pilih Minuman:";
    inventoryItemsGrid.innerHTML = "";

    const inventory = localUserData.inventory || {};
    const ownedItemIds = Object.keys(inventory).filter(
      (id) => inventory[id] > 0
    );

    if (ownedItemIds.length === 0) {
      inventoryBlank.classList.remove("hidden");
    } else {
      // Ambil detail item dari koleksi yang sesuai (foods atau drinks)
      const itemPromises = ownedItemIds.map((id) =>
        getDoc(doc(db, itemType, id))
      );
      const itemDocs = await Promise.all(itemPromises);

      let itemsFound = 0;
      itemDocs.forEach((docSnap) => {
        if (!docSnap.exists()) return; // Lewati jika item tidak ada di koleksi ini
        inventoryBlank.classList.add("hidden");
        itemsFound++;
        const item = { id: docSnap.id, ...docSnap.data() };
        const itemEl = document.createElement("div");
        itemEl.className =
          "p-1 rounded-md cursor-pointer hover:bg-amber-200 transition-colors";
        itemEl.innerHTML = `<img src="${item.imageUrl}" alt="${item.name}" class="w-12 h-12 object-contain">`;
        itemEl.addEventListener("click", () => consumeItem(item, itemType));
        inventoryItemsGrid.appendChild(itemEl);
      });

      if (itemsFound === 0) {
        inventoryBlank.classList.remove("hidden");
      }
    }
    // Tampilkan panel setelah diisi
    inventoryPanel.classList.remove("hidden");
  };

  /**
   * Fungsi serbaguna untuk mengonsumsi item dan memutar animasi yang sesuai.
   * @param {string} item - ID item yang dikonsumsi.
   * @param {'foods' | 'drinks'} itemType - Tipe item yang dikonsumsi.
   */
  const consumeItem = async (item, itemType) => {
    if (inventoryPanel) inventoryPanel.classList.add("hidden");

    let statToUpdate = {};

    let imageElement;
    let animationState;

    if (itemType === "foods") {
      imageElement = foodImage;
      animationState = "eat";
      // setPetState("eat");
      statToUpdate = {
        "petStats.hunger": increment(20), // Tambah 20 poin lapar
        "petStats.happiness": increment(5),
      };
    } else if (itemType === "drinks") {
      imageElement = drinkImage;
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
  // <!-- #endregion -->

  // <!-- #region Pet Customization -->

  // --- Logika Ganti Pet ---

  // Daftar 5 gambar pet Anda (ganti URL sesuai kebutuhan)
  const petOptions = [
    "https://drive.google.com/thumbnail?id=1QUqyOUGO7cpaBYeXGOw9QEUyTotOAAwz&sz=w500",
    "https://drive.google.com/thumbnail?id=1Sa-8i88UbEO_AEEU5DOvff81KxtMC0x2&sz=w500",
    "https://drive.google.com/thumbnail?id=1qPoXkW9IpTZ1N3qvoaGNQIofc8S2ZoCq&sz=w500",
    "https://drive.google.com/thumbnail?id=1NnNPU2gdr7BQ5Br9N41aLrXLjhRxKt0t&sz=w500",
    "https://drive.google.com/thumbnail?id=1FJR8nU93O0KMZKMigObivhIGfLjh0BXy&sz=w500",
  ];

  // Referensi Elemen DOM
  const petkuButton = document.getElementById("petku_btn"); // Tombol pemicu
  const changePetPopup = document.getElementById("change-pet-popup");
  const petSelectionGrid = document.getElementById("pet-selection-grid");
  const savePetButton = document.getElementById("save-pet-selection");
  const cancelPetButton = document.getElementById("cancel-pet-selection");
  const mainPetImage = document.getElementById("the_pet"); // Gambar pet utama Anda

  let temporarilySelectedPetSrc = null;

  // Fungsi untuk membuka popup
  const openPetSelectionPopup = () => {
    if (!changePetPopup || !petSelectionGrid) return;

    // Simpan pilihan saat ini sebagai default
    temporarilySelectedPetSrc = mainPetImage.src;

    // Kosongkan grid dan isi dengan pilihan pet
    petSelectionGrid.innerHTML = "";
    petOptions.forEach((petSrc) => {
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
        petSelectionGrid
          .querySelectorAll(".pet-choice")
          .forEach((el) => el.classList.remove("selected"));
        // Tambahkan 'selected' ke yang diklik
        petChoice.classList.add("selected");
        // Simpan pilihan sementara
        temporarilySelectedPetSrc = petSrc;
      });

      petSelectionGrid.appendChild(petChoice);
    });

    changePetPopup.classList.remove("hidden");
  };

  // Fungsi untuk menutup popup
  const closePetSelectionPopup = () => {
    if (changePetPopup) changePetPopup.classList.add("hidden");
  };

  // Fungsi untuk menyimpan pilihan
  const savePetSelection = async () => {
    if (!mainPetImage || !temporarilySelectedPetSrc) return;

    // Terapkan perubahan di tampilan secara langsung
    mainPetImage.src = temporarilySelectedPetSrc;

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
    // ---------------------------------------------

    closePetSelectionPopup();
  };

  // Pasang semua event listener
  if (petkuButton) petkuButton.addEventListener("click", openPetSelectionPopup);
  if (cancelPetButton)
    cancelPetButton.addEventListener("click", closePetSelectionPopup);
  if (savePetButton) savePetButton.addEventListener("click", savePetSelection);
  // <!-- #endregion -->

  // <!-- #region BGM feature -->

  // const bgmToggle = document.getElementById("bgm-toggle");
  const iconMute = document.getElementById("icon_mute");
  const iconUnmute = document.getElementById("icon_unmute");
  let isPlaying = false;

  const bgmToggle = document.getElementById("bgm-toggle");

  const midiUrl = "https://files.catbox.moe/rt4vtl.mid";

  // Siapkan synth, akan digunakan nanti
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

  let midiData; // Variabel untuk menyimpan data MIDI yang sudah diparsing
  let isLoading = false; // Flag untuk mencegah klik berulang saat loading

  // <!-- #endregion -->

  function initializeEventListeners() {
    // Listener untuk aksi pet
    if (pet) pet.addEventListener("click", () => setPetState("jump"));
    foodImage.addEventListener("click", () => setPetState("jump"));
    drinkImage.addEventListener("click", () => setPetState("jump"));
    toyImage.addEventListener("click", () => setPetState("jump"));
    if (feedButton)
      feedButton.addEventListener("click", () => showInventory("foods"));
    if (drinkButton)
      drinkButton.addEventListener("click", () => showInventory("drinks"));
    if (inventoryCloseBtn)
      inventoryCloseBtn.addEventListener("click", () =>
        inventoryPanel.classList.add("hidden")
      );
    if (playButton)
      playButton.addEventListener("click", () => setPetState("play"));

    // Listener untuk Toko
    shopButton.addEventListener("click", () => {
      // Cek apakah localUserData sudah terisi sebelum menjalankan fungsi
      if (localUserData && localUserData.poin !== undefined) {
        populateShop();
        shopPopup.classList.remove("hidden");
      } else {
        alert("Data pengguna belum siap, silakan tunggu sesaat.");
      }
    });

    closeShopButton.addEventListener("click", () =>
      shopPopup.classList.add("hidden")
    );

    if (menuButton) menuButton.addEventListener("click", openPetMenuPopup);
    if (closeMenuButton)
      closeMenuButton.addEventListener("click", closePetMenuPopup);

    // Listener untuk Ganti Pet
    if (petkuButton)
      petkuButton.addEventListener("click", openPetSelectionPopup);
    if (cancelPetButton)
      cancelPetButton.addEventListener("click", closePetSelectionPopup);
    if (savePetButton)
      savePetButton.addEventListener("click", savePetSelection);

    if (settingsButton)
      settingsButton.addEventListener("click", openSettingsPopup);
    if (closeSettingsButton)
      closeSettingsButton.addEventListener("click", closeSettingsPopup);

    // Listener untuk simpan nama
    if (savePetNameButton) {
      savePetNameButton.addEventListener("click", () => {
        const newName = petNameInput.value.trim();
        if (newName) {
          handleSaveSettings("petName", newName);
          alert("Nama peliharaan berhasil disimpan!");
        }
      });
    }

    // Listener untuk toggle SFX
    // if (sfxToggleSwitch) {
    //   sfxToggleSwitch.addEventListener("change", (e) => {
    //     handleSaveSettings("settings.sfxOn", e.target.checked);
    //   });
    // }

    if (bgmToggleSwitch) {
      bgmToggleSwitch.addEventListener("change", (e) => {
        const isBgmOn = e.target.checked;
        handleSaveSettings("settings.bgmOn", isBgmOn);
        // Tambahkan logika BGM Anda di sini
        if (isBgmOn) Tone.Transport.start();
        else Tone.Transport.stop();
      });
    }

    // Listener BGM
    const bgmToggle = document.getElementById("bgm-toggle");
    if (bgmToggle) {
      bgmToggle.addEventListener("click", async () => {
        iconMute.classList.add("hidden");
        iconUnmute.classList.remove("hidden");

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
            bgmToggle.appendChild(bgmLoading);

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

            iconMute.classList.add("hidden");
            iconUnmute.classList.remove("hidden");
            isLoading = false;
            bgmLoading.remove();
          }

          // Mulai Transport untuk memainkan musik
          Tone.Transport.start();
        } else {
          // Jika musik sedang berjalan, hentikan
          Tone.Transport.stop();
          iconMute.classList.remove("hidden");
          iconUnmute.classList.add("hidden");
        }
      });
    }

    if (shopButton) {
      shopButton.addEventListener("click", () => {
        populateShop(currentShopCollection);
        shopPopup.classList.remove("hidden");
      });
    }

    if (closeShopButton)
      closeShopButton.addEventListener("click", () =>
        shopPopup.classList.add("hidden")
      );

    // Tambahkan listener untuk TAB
    shopTabs?.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Ganti style tab aktif
        shopTabs.forEach((t) => {
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
  }

  // --- FUNGSI UNTUK MENGELOLA STATUS PET ---
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
    if (!confirmationPopup) return;

    confirmationTitle.textContent = title;
    confirmationMessage.textContent = message;

    // Hapus event listener lama untuk menghindari penumpukan
    const newActionBtn = confirmActionBtn.cloneNode(true);
    confirmActionBtn.parentNode.replaceChild(newActionBtn, confirmActionBtn);

    // Pasang event listener yang baru
    newActionBtn.addEventListener("click", () => {
      onConfirm(); // Jalankan aksi
      confirmationPopup.classList.add("hidden"); // Tutup popup
    });

    confirmationPopup.classList.remove("hidden");
  };

  // Pasang listener untuk tombol batal (hanya sekali)
  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", () => {
      confirmationPopup.classList.add("hidden");
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("Pengguna login:", user.uid);
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        localUserData = docSnap.data();

        if (!localUserData.petName || !localUserData.petUrl) {
          console.log(
            "Pengguna lama terdeteksi tanpa data pet. Menambahkan data default..."
          );
          try {
            // Siapkan data pet default
            const defaultPetData = {
              petName: "Pet",
            };

            // Update dokumen di Firestore
            await updateDoc(userDocRef, defaultPetData);

            // Perbarui juga data lokal agar tampilan langsung sinkron
            localUserData.petName = defaultPetData.petName;
            localUserData.petUrl = defaultPetData.petUrl;
          } catch (error) {}
        }

        const loadUserPet = () => {
          const mainPetImage = document.getElementById("the_pet");
          // Cek apakah pengguna punya data petUrl yang tersimpan
          if (localUserData.petUrl && mainPetImage) {
            mainPetImage.src = localUserData.petUrl;
          }
        };

        // Panggil fungsi untuk memuat pet
        loadUserPet();

        // 1. Hitung penurunan status sejak kunjungan terakhir
        await calculateStatusDecay();

        // 2. Perbarui tampilan bar status
        updatePetStatusBars();

        if (!localUserData.petStats) {
          console.log();
          try {
            const initialPetStats = {
              health: 100,
              hunger: 50,
              thirst: 40,
              happiness: 80,
              cleanliness: 100,
            };
            await updateDoc(userDocRef, {
              petStats: initialPetStats,
              lastPetUpdate: serverTimestamp(),
            });
            // Perbarui data lokal setelah berhasil menyimpan ke server
            localUserData.petStats = initialPetStats;
          } catch (error) {}
        }

        // Setelah data siap, pasang semua event listener
        initializeEventListeners();
      } else {
      }
    } else {
    }
  });
});
