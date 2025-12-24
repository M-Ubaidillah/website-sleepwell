// --- FIX NAVIGATION TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.onclick = () => {
            navLinks.classList.toggle('active');
            // Ganti ikon bars menjadi 'X' saat terbuka
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        };

        // Tutup menu saat klik link (untuk navigasi satu halaman)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.onclick = () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            };
        });
    }
});

// 2. ANIMAL MODAL LOGIC
const modal = document.getElementById('animalModal');
const modalBody = document.getElementById('modalBody');

// Data Konten Modal
const animalData = {
    owl: {
        title: "Burung Hantu (Night Owl)",
        icon: "🦉",
        desc: "Kamu lebih produktif dan kreatif di malam hari. Namun, tantangannya adalah bangun pagi untuk aktivitas sosial/kampus.",
        tips: "<ul><li>Usahakan kamar gelap total saat tidur.</li><li>Jangan minum kopi setelah jam 5 sore.</li><li>Atur alarm bertahap agar tidak kaget saat bangun.</li></ul>"
    },
    chicken: {
        title: "Ayam (Early Bird)",
        icon: "🐓",
        desc: "Kamu bangun dengan segar di pagi hari dan paling produktif sebelum jam makan siang. Namun, kamu cepat lelah di malam hari.",
        tips: "<ul><li>Manfaatkan pagi hari untuk tugas terberat (Deep Work).</li><li>Pertahankan jadwal tidur yang konsisten, bahkan di akhir pekan.</li></ul>"
    },
    cat: {
        title: "Kucing (Flexible Sleeper)",
        icon: "🐈",
        desc: "Kamu butuh tidur cukup (sekitar 7-8 jam) dan sangat menikmati tidur siang (power nap).",
        tips: "<ul><li>Power nap sebaiknya hanya 20 menit agar tidak pusing.</li><li>Jaga pola makan agar energi tetap stabil sepanjang hari.</li></ul>"
    },
    lion: {
        title: "Singa (Power Sleeper)",
        icon: "🦁",
        desc: "Kamu adalah pemimpin yang enerjik. Tidurmu mungkin tidak terlalu lama, tapi sangat berkualitas (Deep Sleep).",
        tips: "<ul><li>Fokus pada kualitas tidur, bukan hanya durasi.</li><li>Hindari gadget 1 jam sebelum tidur untuk menjaga kualitas Deep Sleep.</li></ul>"
    }
};

function openModal(animalType) {
    const data = animalData[animalType];
    const imageMap = {
        owl: 'owl.jpg',
        chicken: 'ayam.jpg',
        cat: 'kucing.jpg',
        lion: 'jean-wimmerlin-85b3IU8fKTY-unsplash.jpg'
    };

    const modal = document.getElementById('animalModal');
    
    // Set background modal dengan gambar + overlay gelap
    modal.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${imageMap[animalType]}')`;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 5rem; margin-bottom: 10px; filter: drop-shadow(2px 4px 6px black);">${data.icon}</div>
            <h2 style="color: #FFCE54; font-size: 2rem; margin-bottom: 15px; font-family: 'Poppins';">${data.title}</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">${data.desc}</p>
            <div class="tips-container">
                <strong style="color: #A0D468;"><i class="fa-solid fa-lightbulb"></i> Tips Sehat:</strong>
                <div style="margin-top: 10px; color: #f5f7fa;">${data.tips}</div>
            </div>
        </div>
    `;
    modal.style.display = "block";
}
function closeModal() {
    modal.style.display = "none";
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 3. SLEEP CLOCK SIMULATOR
const slider = document.getElementById('sleepRange');
const output = document.getElementById('sleepValue');
const feedback = document.getElementById('sleepFeedback');

slider.oninput = function() {
    const val = this.value;
    output.innerHTML = val;
    
    // Feedback Logika
    if (val < 5) {
        feedback.className = "feedback-box warning"; // class warning defined in CSS if needed, or inline style
        feedback.style.background = "#FFEBEB";
        feedback.style.color = "#DA4453";
        feedback.innerHTML = "⚠️ <strong>Bahaya!</strong> Tidur kurang dari 5 jam meningkatkan risiko penyakit jantung dan menurunkan fokus drastis.";
    } else if (val >= 5 && val < 7) {
        feedback.style.background = "#FFF3CD";
        feedback.style.color = "#856404";
        feedback.innerHTML = "✋ <strong>Hati-hati.</strong> Hampir cukup, tapi tubuhmu belum regenerasi maksimal. Coba tambah 1 jam lagi.";
    } else if (val >= 7 && val <= 9) {
        feedback.style.background = "#EBF8E1";
        feedback.style.color = "#37BC9B";
        feedback.innerHTML = "✅ <strong>Sempurna!</strong> Ini adalah durasi emas untuk kesehatan fisik & mental (Target SDG 3).";
    } else {
        feedback.style.background = "#E6F2FF";
        feedback.style.color = "#4A89DC";
        feedback.innerHTML = "💤 <strong>Kebanyakan Tidur.</strong> Hati-hati efek 'Sedentary', badan malah bisa jadi lemas dan malas.";
    }
}

// 4. DAILY TIPS GENERATOR
const tipsArray = [
    "Matikan lampu kamar 30 menit sebelum tidur untuk memicu hormon melatonin.",
    "Hindari makan berat 2 jam sebelum tidur agar pencernaanmu istirahat.",
    "Suhu kamar ideal untuk tidur nyenyak adalah sekitar 18-22 derajat Celcius.",
    "Jangan bawa masalah pekerjaan ke tempat tidur. Lakukan 'Brain Dump' di kertas sebelumnya.",
    "Olahraga rutin membantu tidur nyenyak, tapi hindari olahraga berat di malam hari.",
    "Paparan sinar matahari pagi membantu mengatur jam biologis (Sirkadian) tubuhmu."
];

function generateTip() {
    const randomIndex = Math.floor(Math.random() * tipsArray.length);
    document.getElementById('tipText').innerText = `"${tipsArray[randomIndex]}"`;
}

// 5. SIMPLE QUIZ LOGIC
function answerQuiz(option) {
    const resultDiv = document.getElementById('quizResult');
    const questionDiv = document.getElementById('quizBox');
    
    questionDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    let message = "";
    if (option === 1) {
        message = "<h3 style='color:#DA4453'>Perlu Perbaikan!</h3><p>Sering mengantuk di siang hari tandanya kualitas tidur malammu buruk. Coba perbaiki jadwal tidurmu.</p>";
    } else if (option === 2) {
        message = "<h3 style='color:#F6BB42'>Cukup Baik</h3><p>Kadang lelah itu wajar, tapi pastikan kamu tetap dapat 7-9 jam tidur mayoritas hari.</p>";
    } else {
        message = "<h3 style='color:#8CC152'>Hebat!</h3><p>Kamu punya energi yang bagus. Pertahankan pola hidup sehat ini demi SDG 3!</p>";
    }
    
    resultDiv.innerHTML = message + "<button onclick='location.reload()' style='margin-top:10px; padding:5px 10px; cursor:pointer;'>Ulangi</button>";
}

//6. FITUR PENGINGAT TIDUR
function setupReminder() {
    const timeInput = document.getElementById('reminderTime').value;
    const status = document.getElementById('reminderStatus');

    if (!timeInput) {
        status.innerText = "❌ Silakan pilih jam terlebih dahulu.";
        status.style.color = "#DA4453";
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            // Memberikan kelas animasi pada status
            status.classList.add('status-active');
            status.innerHTML = `🔔 <strong>Pengingat Aktif!</strong> Kami akan mengingatkanmu pada pukul <strong>${timeInput}</strong>.`;
            
            const checkInterval = setInterval(() => {
                const now = new Date();
                const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                
                if (currentTime === timeInput) {
                    new Notification("Waktunya Istirahat! 🌙", {
                        body: `Sudah jam ${timeInput}. Yuk, matikan gadget dan bersiap tidur untuk kesehatan SDG 3!`,
                        icon: "https://cdn-icons-png.flaticon.com/512/547/547433.png" // Icon bulan
                    });
                    
                    status.classList.remove('status-active');
                    status.innerText = "✅ Notifikasi telah terkirim!";
                    clearInterval(checkInterval);
                }
            }, 10000); // Cek setiap 10 detik agar lebih akurat
        } else {
            status.innerText = "🚫 Izin notifikasi ditolak.";
        }
    });
}

//7. FITUR AMBIENCE
const audio = document.getElementById('ambianceAudio');
const sounds = {
    rain: 'https://www.soundjay.com/nature/rain-01.mp3',
    forest: 'file:///C:/Users/ACER/OneDrive/Documents/sleep%20well/forest.mp3',
};

function playAmbiance(type) {
    audio.src = sounds[type];
    audio.play();
}

function stopAmbiance() {
    audio.pause();
    audio.currentTime = 0;
}

window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.card, .animal-card, .tool-box, .quiz-container');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
});

// Tambahkan class 'reveal' secara otomatis saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.card, .animal-card, .tool-box, .quiz-container').forEach(el => el.classList.add('reveal'));
});