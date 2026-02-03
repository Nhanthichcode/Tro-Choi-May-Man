let studentList = [];
let isAnimating = false;
let envelopes = [];
let winnerIndex = -1;

// Create different red envelope designs
function createEnvelopeSVG(index) {
  const patterns = [
    // 0: PHÚC
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g0-${index}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FF4444"/><stop offset="100%" stop-color="#C40000"/>
        </linearGradient>
        <filter id="ts0-${index}"><feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#6B0000" flood-opacity="0.7"/></filter>
      </defs>
      <rect y="12" width="100" height="128" rx="10" fill="url(#g0-${index})"/>
      <rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/>
      <ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/>
      <rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/>
      <circle cx="50" cy="72" r="32" fill="#FFD700" opacity="0.92"/>
      <circle cx="50" cy="72" r="29" fill="none" stroke="#B8860B" stroke-width="1.5" opacity="0.45"/>
      <text x="50" y="80" font-size="22" fill="#8B0000" text-anchor="middle" font-weight="bold" font-family="serif" filter="url(#ts0-${index})">Phúc</text>
      <rect x="24" y="118" width="52" height="2.5" rx="1.5" fill="#FFD700" opacity="0.6"/>
      <rect x="32" y="124" width="36" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
    </svg>`,

    // 1: LỌC
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1-${index}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FF2020"/><stop offset="100%" stop-color="#A00000"/>
        </linearGradient>
        <filter id="ts1-${index}"><feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#6B0000" flood-opacity="0.7"/></filter>
      </defs>
      <rect y="12" width="100" height="128" rx="10" fill="url(#g1-${index})"/>
      <rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/>
      <ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/>
      <rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/>
      <circle cx="50" cy="72" r="32" fill="#FFD700" opacity="0.92"/>
      <circle cx="50" cy="72" r="29" fill="none" stroke="#B8860B" stroke-width="1.5" opacity="0.45"/>
      <text x="50" y="80" font-size="22" fill="#8B0000" text-anchor="middle" font-weight="bold" font-family="serif" filter="url(#ts1-${index})">Lộc</text>
      <rect x="24" y="118" width="52" height="2.5" rx="1.5" fill="#FFD700" opacity="0.6"/>
      <rect x="32" y="124" width="36" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
    </svg>`,

    // 2: THỌ
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2-${index}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E82828"/><stop offset="100%" stop-color="#8C0000"/>
        </linearGradient>
        <filter id="ts2-${index}"><feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#5C0000" flood-opacity="0.7"/></filter>
      </defs>
      <rect y="12" width="100" height="128" rx="10" fill="url(#g2-${index})"/>
      <rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/>
      <ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/>
      <rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/>
      <circle cx="50" cy="72" r="32" fill="#FFD700" opacity="0.92"/>
      <circle cx="50" cy="72" r="29" fill="none" stroke="#B8860B" stroke-width="1.5" opacity="0.45"/>
      <text x="50" y="80" font-size="22" fill="#8B0000" text-anchor="middle" font-weight="bold" font-family="serif" filter="url(#ts2-${index})">Thọ</text>
      <rect x="24" y="118" width="52" height="2.5" rx="1.5" fill="#FFD700" opacity="0.6"/>
      <rect x="32" y="124" width="36" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
    </svg>`,

    // 3: HOA MAI
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g3-${index}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#DC143C"/><stop offset="100%" stop-color="#8B0000"/>
        </linearGradient>
      </defs>
      <rect y="12" width="100" height="128" rx="10" fill="url(#g3-${index})"/>
      <rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/>
      <ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/>
      <rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/>
      <path d="M50 135 Q48 100 35 75 Q28 58 30 40" stroke="#8B5E3C" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M38 62 Q50 52 58 58" stroke="#8B5E3C" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M33 48 Q42 35 52 42" stroke="#8B5E3C" stroke-width="2" fill="none" stroke-linecap="round"/>
      <g transform="translate(30,42)">
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(0)"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(72)"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(144)"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(216)"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="3" fill="#FF8C00"/>
      </g>
      <g transform="translate(58,55)">
        <ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(0)"/>
        <ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2.2" fill="#FF8C00"/>
      </g>
      <g transform="translate(52,38)">
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(0)"/>
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(120)"/>
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(240)"/>
        <circle cx="0" cy="0" r="1.8" fill="#FF8C00"/>
      </g>
      <ellipse cx="25" cy="68" rx="5" ry="2.5" fill="#4CAF50" opacity="0.8" transform="rotate(-30,25,68)"/>
      <ellipse cx="40" cy="55" rx="4" ry="2" fill="#4CAF50" opacity="0.7" transform="rotate(15,40,55)"/>
    </svg>`,

    // 4: HOA ĐÀO
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g4-${index}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FF3333"/><stop offset="100%" stop-color="#990000"/>
        </linearGradient>
      </defs>
      <rect y="12" width="100" height="128" rx="10" fill="url(#g4-${index})"/>
      <rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/>
      <ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/>
      <rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/>
      <path d="M50 135 Q52 105 65 78 Q72 60 68 38" stroke="#6D4C2A" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M63 55 Q52 48 46 56" stroke="#6D4C2A" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M67 42 Q58 32 50 40" stroke="#6D4C2A" stroke-width="2" fill="none" stroke-linecap="round"/>
      <g transform="translate(68,40)">
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(0)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(60)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(120)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(180)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(240)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(300)"/>
        <circle cx="0" cy="0" r="3" fill="#FF69B4"/>
      </g>
      <g transform="translate(46,52)">
        <ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(0)"/>
        <ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(60)"/>
        <ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(120)"/>
        <ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(180)"/>
        <ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(240)"/>
        <ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(300)"/>
        <circle cx="0" cy="0" r="2.2" fill="#FF69B4"/>
      </g>
      <g transform="translate(58,32)">
        <ellipse cx="0" cy="-4" rx="2.8" ry="3.5" fill="#FFB6C1" opacity="0.8" transform="rotate(0)"/>
        <ellipse cx="0" cy="-4" rx="2.8" ry="3.5" fill="#FFB6C1" opacity="0.8" transform="rotate(120)"/>
        <ellipse cx="0" cy="-4" rx="2.8" ry="3.5" fill="#FFB6C1" opacity="0.8" transform="rotate(240)"/>
        <circle cx="0" cy="0" r="1.8" fill="#FF69B4"/>
      </g>
      <ellipse cx="72" cy="58" rx="5" ry="2.2" fill="#4CAF50" opacity="0.75" transform="rotate(25,72,58)"/>
      <ellipse cx="58" cy="45" rx="4" ry="2" fill="#4CAF50" opacity="0.7" transform="rotate(-10,58,45)"/>
    </svg>`,

    // 5: HOA MAI + ĐÀO mixed
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g5-${index}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E00000"/><stop offset="100%" stop-color="#7A0000"/>
        </linearGradient>
      </defs>
      <rect y="12" width="100" height="128" rx="10" fill="url(#g5-${index})"/>
      <rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/>
      <ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/>
      <rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/>
      <path d="M50 135 Q50 100 50 70" stroke="#6D4C2A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M50 85 Q36 78 28 68" stroke="#6D4C2A" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M50 72 Q64 65 72 55" stroke="#6D4C2A" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M50 60 Q42 50 36 42" stroke="#6D4C2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <g transform="translate(36,40)">
        <ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(0)"/>
        <ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2.2" fill="#FF8C00"/>
      </g>
      <g transform="translate(72,53)">
        <ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(0)"/>
        <ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(60)"/>
        <ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(120)"/>
        <ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(180)"/>
        <ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(240)"/>
        <ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(300)"/>
        <circle cx="0" cy="0" r="2" fill="#FF69B4"/>
      </g>
      <g transform="translate(28,66)">
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(0)"/>
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(120)"/>
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(240)"/>
        <circle cx="0" cy="0" r="1.6" fill="#FF8C00"/>
      </g>
      <g transform="translate(56,48)">
        <ellipse cx="0" cy="-3.5" rx="2.2" ry="3.2" fill="#FFB6C1" opacity="0.8" transform="rotate(0)"/>
        <ellipse cx="0" cy="-3.5" rx="2.2" ry="3.2" fill="#FFB6C1" opacity="0.8" transform="rotate(120)"/>
        <ellipse cx="0" cy="-3.5" rx="2.2" ry="3.2" fill="#FFB6C1" opacity="0.8" transform="rotate(240)"/>
        <circle cx="0" cy="0" r="1.4" fill="#FF69B4"/>
      </g>
      <ellipse cx="42" cy="52" rx="4" ry="1.8" fill="#4CAF50" opacity="0.7" transform="rotate(-20,42,52)"/>
      <ellipse cx="65" cy="62" rx="4.5" ry="2" fill="#4CAF50" opacity="0.72" transform="rotate(18,65,62)"/>
      <ellipse cx="33" cy="75" rx="3.5" ry="1.6" fill="#4CAF50" opacity="0.65" transform="rotate(-5,33,75)"/>
    </svg>`,
  ];

  // Randomly assign flower-only patterns sometimes: indices 3,4,5
  // For text patterns use index % 3, for flowers pick randomly among 3,4,5
  const textPatterns = [patterns[0], patterns[1], patterns[2]];
  const flowerPatterns = [patterns[3], patterns[4], patterns[5]];

  // Lấy cols từ layout hiện tại
  const { cols } = getLayout();
  const col = index % cols;
  const row = Math.floor(index / cols);
  
  // Xen kẽ checkerboard: (row + col) % 2
  if ((row + col) % 2 === 0) {
    // text envelope
    return textPatterns[index % 3];
  } else {
    // flower envelope
    return flowerPatterns[index % 3];
  }
}

// ── layout config by viewport ──
function getLayout() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  
  // Desktop/Laptop - giảm kích thước một chút
  if (vw >= 1200) return { cols: 12, rows: 5, envW: 85, envH: 110 };
  else if (vw >= 900) return { cols: 10, rows: 4, envW: 80, envH: 105 };
  else if (vw >= 768) return { cols: 8, rows: 4, envW: 75, envH: 100 };
  // Tablet
  else if (vw >= 600) return { cols: 6, rows: 4, envW: 65, envH: 88 };
  // Mobile - optimized
  else if (vw >= 480) return { cols: 5, rows: 4, envW: 58, envH: 80 };
  else if (vw >= 400) return { cols: 4, rows: 4, envW: 52, envH: 72 };
  else return { cols: 3, rows: 4, envW: 45, envH: 62 };
}

// Seeded pseudo-random (repeatable per index so resize is stable)
function seededRand(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

// Initialize envelopes – scattered layout
function initEnvelopes() {
  const container = document.getElementById("envelope-container");
  container.innerHTML = "";
  envelopes = [];

  const { cols, rows, envW, envH } = getLayout();
  const total = cols * rows;
  const cW = container.clientWidth || window.innerWidth * 0.92;
  const cH = container.clientHeight || window.innerHeight * 0.82;
  const padX = 18,
    padY = 18;

  const cellW = (cW - padX * 2) / cols;
  const cellH = (cH - padY * 2) / rows;

  // big jitter – up to 40% of cell each side
  const jitterFracX = 0.38;
  const jitterFracY = 0.32;

  for (let i = 0; i < total; i++) {
    const rand = seededRand(i * 7 + 13);

    const col = i % cols;
    const row = Math.floor(i / cols);

    const baseX = padX + col * cellW + cellW / 2;
    const baseY = padY + row * cellH + cellH / 2;

    const x = baseX - envW / 2 + (rand() - 0.5) * cellW * jitterFracX * 2;
    const y = baseY - envH / 2 + (rand() - 0.5) * cellH * jitterFracY * 2;

    // rotation between -9° and +9°
    const rot = (rand() - 0.5) * 18;

    const envelope = document.createElement("div");
    envelope.className = "envelope";
    envelope.style.setProperty("--w", envW + "px");
    envelope.style.setProperty("--h", envH + "px");
    // initial hidden state: shifted down + scaled down
    envelope.style.transform = `translateY(50px) scale(0.6)`;
    // store final transform for .appeared
    envelope.dataset.finalTransform = `translateY(0) scale(1)`;
    envelope.innerHTML = createEnvelopeSVG(i);
    container.appendChild(envelope);
    envelopes.push(envelope);

    // staggered entrance: after short delay, add .appeared + set final transform
    setTimeout(
      () => {
        envelope.style.transform = envelope.dataset.finalTransform;
        envelope.classList.add("appeared");
      },
      60 + i * 45,
    );
  }
}

// Re-init on resize (debounced)
let _resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    if (!isAnimating) initEnvelopes();
  }, 250);
});

// Handle file upload
document
  .getElementById("file-upload")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
          header: 1,
        });

        // Bỏ hàng tiêu đề (hàng đầu tiên)
        const dataWithoutHeader = jsonData.slice(1);

        studentList = dataWithoutHeader
          .filter(
            (row) =>
              row.length >= 4 && row[0] && row[1] && row[2] && row[3],
          )
          .map((row) => ({
            stt: row[0],
            mssv: row[1],
            hoLot: row[2],
            ten: row[3],
          }));

        if (studentList.length > 0) {
          document.getElementById("info-text").textContent =
            `✅ Đã tải ${studentList.length} sinh viên. Nhấn "Quay Số" để chơi!`;
          document.getElementById("start-btn").disabled = false;
          initEnvelopes();
        } else {
          alert("File Excel không có dữ liệu hợp lệ!");
        }
      } catch (error) {
        alert("Lỗi khi đọc file Excel: " + error.message);
      }
    };
    reader.readAsArrayBuffer(file);
  });

// Create fireworks effect from winner envelope
function createFireworks(envelope) {
  const rect = envelope.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const colors = [
    "#FFD700",
    "#FF6B6B",
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#FF1744",
    "#9C27B0",
  ];
  const particles = 50;

  for (let i = 0; i < particles; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = centerX + "px";
    firework.style.top = centerY + "px";
    firework.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    const angle = (Math.PI * 2 * i) / particles;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    firework.style.setProperty("--tx", tx + "px");
    firework.style.setProperty("--ty", ty + "px");
    firework.style.animation = `firework-explosion ${0.8 + Math.random() * 0.4}s ease-out forwards`;

    document.body.appendChild(firework);

    setTimeout(() => firework.remove(), 1200);
  }
}

// Create falling sparkles effect
function createFallingSparkles() {
  const sparkleEmojis = ["✨", "⭐", "🌟", "💫", "🎊", "🎉"];
  const colors = [
    "#FFD700",
    "#FFA500",
    "#FF6B6B",
    "#FF1744",
    "#9C27B0",
    "#2196F3",
  ];

  // Create sparkles from top of screen
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      // Sparkle emoji
      const sparkle = document.createElement("div");
      sparkle.className = "falling-sparkle";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = "-50px";
      sparkle.style.setProperty("--size", 15 + Math.random() * 25 + "px");
      sparkle.style.setProperty(
        "--duration",
        2 + Math.random() * 2 + "s",
      );
      sparkle.style.setProperty(
        "--fall-distance",
        400 + Math.random() * 400 + "px",
      );
      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 2000);

      // Star particle
      const star = document.createElement("div");
      star.className = "star-particle";
      star.textContent =
        sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
      star.style.left = Math.random() * 100 + "%";
      star.style.top = "-30px";
      star.style.color =
        colors[Math.floor(Math.random() * colors.length)];
      star.style.setProperty(
        "--duration",
        2.5 + Math.random() * 1.5 + "s",
      );
      star.style.setProperty(
        "--fall-distance",
        500 + Math.random() * 300 + "px",
      );
      star.style.setProperty(
        "--drift",
        (Math.random() - 0.5) * 200 + "px",
      );
      star.style.setProperty(
        "--rotation",
        Math.random() * 720 - 360 + "deg",
      );
      document.body.appendChild(star);

      setTimeout(() => star.remove(), 2000);
    }, i * 100);
  }
}

// Create confetti effect
function createConfetti() {
  const colors = ["#FFD700", "#FF6B6B", "#4CAF50", "#2196F3", "#FF9800"];
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 2000);
    }, i * 20);
  }
}

// Start animation
document
  .getElementById("start-btn")
  .addEventListener("click", function () {
    if (isAnimating || studentList.length === 0) return;

    isAnimating = true;
    this.disabled = true;
    document.getElementById("info-text").textContent =
      "🎊 Đang quay số... 🎊";

    // Randomly select winner index
    winnerIndex = Math.floor(Math.random() * envelopes.length);

    // Start bouncing animation with random delays
    envelopes.forEach((envelope, index) => {
      const delay = Math.random() * 500;
      setTimeout(() => {
        envelope.classList.add("bouncing");
      }, delay);
    });

    // Animation duration: 3-3.5 seconds
    const animationDuration = 3000 + Math.random() * 500;

    // Gradually slow down and stop animations
    setTimeout(() => {
      // First, fade out non-winners smoothly
      envelopes.forEach((envelope, index) => {
        if (index !== winnerIndex) {
          envelope.classList.remove("bouncing");
          envelope.classList.add("fading");
        }
      });

      // Highlight winner with glow
      setTimeout(() => {
        envelopes[winnerIndex].classList.remove("bouncing");
        envelopes[winnerIndex].classList.add("winner-highlight");

        // Create fireworks from winner envelope
        createFireworks(envelopes[winnerIndex]);

        // Show winner after fireworks
        setTimeout(() => {
          showWinner();
        }, 800);
      }, 1000);
    }, animationDuration);
  });

// Show winner
function showWinner() {
  const winner =
    studentList[Math.floor(Math.random() * studentList.length)];
  const overlay = document.getElementById("overlay");

  createConfetti();

  overlay.innerHTML = `
    <div class="result-wrapper" id="result-wrapper">
      <div class="envelope-stage" id="envelope-stage">
        <div class="svg-wrap-result">${createEnvelopeSVG(winnerIndex)}
          <div class="paper-pop" id="paper-pop">
            <div class="p-title">🎉 CHÚC MỪNG 🎉</div>
            <div class="p-line"><div>STT</div><div>${winner.stt}</div></div>
            <div class="p-line"><div>MSSV</div><div>${winner.mssv}</div></div>
            <div class="p-line"><div>Họ tên</div><div>${winner.hoLot} ${winner.ten}</div></div>
          </div>
        </div>
      </div>
        <div class="result-card" id="result-card">
        <div class="result-card-inner">
          <div class="result-title">🎉 CHÚC MỪNG 🎉</div>
          <div class="result-row"><span class="result-label">STT</span><span class="result-value">${winner.stt}</span></div>
          <div class="result-row"><span class="result-label">MSSV</span><span class="result-value">${winner.mssv}</span></div>
          <div class="result-row"><span class="result-label">Họ tên</span><span class="result-value">${winner.hoLot} ${winner.ten}</span></div>
          <button class="close-btn" onclick="closeOverlay()">Đóng</button>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add("active");
  createFallingSparkles();

  // Step 1: envelope appears
  // Step 2: after 1.2s paper pops up from envelope
  setTimeout(() => {
    const paperPop = document.getElementById("paper-pop");
    if (paperPop) paperPop.classList.add("popped");
  }, 1200);

  // Step 3: after 2.6s hide stage 1 and show big card
  setTimeout(() => {
    const stage = document.getElementById("envelope-stage");
    const card = document.getElementById("result-card");
    const paperPop = document.getElementById("paper-pop");

    if (stage) stage.classList.add("hidden");
    if (card) card.classList.add("visible");

    // SỬA: Ẩn ngay lá thăm nhỏ để tránh hiện 2 cái cùng lúc
    if (paperPop) {
      paperPop.style.opacity = "0";
    }
  }, 2600);

  // sparkles keep falling
  const sparkleInterval = setInterval(() => {
    createFallingSparkles();
  }, 3000);
  setTimeout(() => {
    clearInterval(sparkleInterval);
  }, 15000);
}

// Close overlay
function closeOverlay() {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("start-btn").disabled = false;
  document.getElementById("info-text").textContent =
    `✅ Đã tải ${studentList.length} sinh viên. Nhấn "Quay Số" để chơi!`;
  isAnimating = false;

  // Remove all animation classes
  envelopes.forEach((envelope) => {
    envelope.classList.remove("bouncing", "fading", "winner-highlight");
  });

  initEnvelopes();
}

// Color picker functionality
const colorPicker = document.getElementById("bg-color-picker");
const headerColorPicker = document.getElementById("header-color-picker");
const presetColors = document.querySelectorAll(".preset-color:not(.header-color-preset)");
const headerPresetColors = document.querySelectorAll(".header-color-preset");

// Function to change background
function changeBackground(gradient) {
  document.body.style.background = gradient;
}

// Function to change header color
function changeHeaderColor(color) {
  document.documentElement.style.setProperty("--header-color", color);
}

// Header color picker input handler
headerColorPicker.addEventListener("input", function (e) {
  const color = e.target.value;
  changeHeaderColor(color);

  // Remove active class from all header presets
  headerPresetColors.forEach((preset) => preset.classList.remove("active"));
});

// Header preset color buttons
headerPresetColors.forEach((preset) => {
  preset.addEventListener("click", function () {
    const color = this.getAttribute("data-color");
    changeHeaderColor(color);
    headerColorPicker.value = color;

    // Update active state
    headerPresetColors.forEach((p) => p.classList.remove("active"));
    this.classList.add("active");
  });
});

// Color picker input handler (background)
colorPicker.addEventListener("input", function (e) {
  const color = e.target.value;
  const gradient = `linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, -20)} 100%)`;
  changeBackground(gradient);

  // Remove active class from all presets
  presetColors.forEach((preset) => preset.classList.remove("active"));
});

// Preset color buttons (background)
presetColors.forEach((preset) => {
  preset.addEventListener("click", function () {
    const gradient = this.getAttribute("data-gradient");
    changeBackground(gradient);

    // Update active state
    presetColors.forEach((p) => p.classList.remove("active"));
    this.classList.add("active");
  });
});

// Helper function to adjust color brightness
function adjustBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

// Initialize on load
window.onload = function () {
  initEnvelopes();
};
