let studentList = [];
let isAnimating = false;
let envelopes = [];
let winnerIndex = -1;

// Cấu hình hiệu ứng sóng
const waveConfig = {
  duration: 3000,
  speed: 80,
  bounceSpeed: 200,
  direction: "row",
};

// Tạo các mẫu phong bì
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

    // 1: LỘC
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
  ];

  return patterns[index % patterns.length];
}

// Xử lý upload file
document.getElementById("file-upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      studentList = json.slice(1).map((row) => ({
        stt: row[0],
        mssv: row[1],
        hoLot: row[2],
        ten: row[3],
      }));

      if (studentList.length > 0) {
        document.getElementById("start-btn").disabled = false;
        document.getElementById("info-text").textContent =
          `✅ Đã tải ${studentList.length} sinh viên. Nhấn "Quay Số" để chơi!`;
        initEnvelopes();
      }
    } catch (error) {
      console.error(error);
      document.getElementById("info-text").textContent =
        "❌ Lỗi đọc file. Kiểm tra định dạng Excel!";
    }
  };
  reader.readAsArrayBuffer(file);
});

// Khởi tạo phong bì với kích thước phù hợp thiết bị
function initEnvelopes() {
  const container = document.getElementById("envelope-container");
  container.innerHTML = "";
  envelopes = [];

  if (studentList.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:#fff; padding:40px;">Chưa có dữ liệu</div>`;
    return;
  }

  // Tính toán kích thước phong bì dựa trên thiết bị
  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;
  
  studentList.forEach((_, i) => {
    const div = document.createElement("div");
    div.className = "envelope";
    
    // Đặt kích thước động
    if (isSmallMobile) {
      div.style.setProperty("--w", "65px");
      div.style.setProperty("--h", "85px");
    } else if (isMobile) {
      div.style.setProperty("--w", "75px");
      div.style.setProperty("--h", "98px");
    } else {
      div.style.setProperty("--w", "90px");
      div.style.setProperty("--h", "118px");
    }
    
    div.innerHTML = createEnvelopeSVG(i);
    container.appendChild(div);
    envelopes.push(div);

    setTimeout(() => div.classList.add("appeared"), i * 35);
  });
}

// Tạo đường đi cho hiệu ứng sóng
function createWavePath() {
  const container = document.getElementById("envelope-container");
  const style = window.getComputedStyle(container);
  const columns = style.gridTemplateColumns.split(" ").length;
  const rows = Math.ceil(envelopes.length / columns);

  const path = [];

  if (waveConfig.direction === "row") {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const index = r * columns + c;
        if (index < envelopes.length) {
          path.push(index);
        }
      }
    }
  } else {
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        const index = r * columns + c;
        if (index < envelopes.length) {
          path.push(index);
        }
      }
    }
  }

  return path;
}

// Hiệu ứng sóng
async function applyWaveEffect(winnerIdx) {
  const { duration, speed, bounceSpeed } = waveConfig;
  const path = createWavePath();
  const startTime = Date.now();
  const cycleTime = path.length * speed;
  const numCycles = Math.ceil(duration / cycleTime);

  let currentCycle = 0;

  return new Promise((resolve) => {
    function runWaveCycle() {
      if (currentCycle >= numCycles || Date.now() - startTime >= duration) {
        resolve();
        return;
      }

      let currentIndex = 0;

      function moveWave() {
        if (currentIndex >= path.length) {
          currentCycle++;
          setTimeout(runWaveCycle, speed);
          return;
        }

        const envelopeIndex = path[currentIndex];
        const envelope = envelopes[envelopeIndex];

        envelope.classList.add("wave-active");

        if (currentIndex > 0) {
          const prevIndex = path[currentIndex - 1];
          envelopes[prevIndex].classList.remove("wave-active");
        }

        if (currentIndex === path.length - 1) {
          setTimeout(() => {
            envelope.classList.remove("wave-active");
          }, bounceSpeed);
        }

        currentIndex++;

        if (Date.now() - startTime >= duration) {
          envelopes.forEach((env) => env.classList.remove("wave-active"));
          resolve();
          return;
        }

        setTimeout(moveWave, speed);
      }

      moveWave();
    }

    runWaveCycle();
  });
}

// Hiệu ứng lấp lánh
function createSparkles() {
  const sparkles = ["✨", "⭐", "🌟", "💫", "🎉", "🎊"];
  const overlay = document.getElementById("overlay");
  
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    
    // Màu sắc ngẫu nhiên
    const colors = ["#FFD700", "#FFA500", "#FF6B6B", "#DC143C", "#FF1493", "#00FFFF"];
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 30 + 20;
    sparkle.style.fontSize = `${size}px`;
    
    // Vị trí ngẫu nhiên
    sparkle.style.left = `${Math.random() * 100}%`;
    
    // Thời gian rơi ngẫu nhiên
    const duration = Math.random() * 3 + 2;
    sparkle.style.animationDuration = `${duration}s`;
    
    overlay.appendChild(sparkle);
    
    // Xóa sau khi hiệu ứng kết thúc
    setTimeout(() => {
      sparkle.remove();
    }, duration * 1000);
  }
}

// Hiển thị kết quả
function showResult() {
  const winner = studentList[winnerIndex];
  const overlay = document.getElementById("overlay");

  // Tạo envelope chiến thắng lớn ở giữa
  overlay.innerHTML = `
    <div class="winner-envelope-container">
      <div class="winner-envelope">
        ${createEnvelopeSVG(winnerIndex)}
      </div>
      <div class="winner-card">
        <div class="winner-title">🎉 CHÚC MỪNG 🎉</div>
        <div class="winner-row">
          <span class="winner-label">STT</span>
          <span class="winner-value">${winner.stt}</span>
        </div>
        <div class="winner-row">
          <span class="winner-label">MSSV</span>
          <span class="winner-value">${winner.mssv}</span>
        </div>
        <div class="winner-row">
          <span class="winner-label">Họ tên</span>
          <span class="winner-value">${winner.hoLot} ${winner.ten}</span>
        </div>
        <button class="close-btn" onclick="closeOverlay()">Đóng</button>
      </div>
    </div>
  `;

  overlay.classList.add("active");
  
  // Tạo hiệu ứng lấp lánh
  createSparkles();
  
  // Lặp lại hiệu ứng lấp lánh mỗi 1.5 giây
  const sparkleInterval = setInterval(() => {
    createSparkles();
  }, 1500);
  
  // Dừng sau 10 giây
  setTimeout(() => {
    clearInterval(sparkleInterval);
  }, 10000);
}

// Bắt đầu animation
async function startAnimation() {
  if (isAnimating || studentList.length === 0) return;

  isAnimating = true;
  document.getElementById("start-btn").disabled = true;
  document.getElementById("info-text").textContent = "🎲 Đang quay số...";

  // Random winner
  winnerIndex = Math.floor(Math.random() * studentList.length);

  // Chạy hiệu ứng sóng
  await applyWaveEffect(winnerIndex);

  // Làm mờ các envelope khác
  envelopes.forEach((env, i) => {
    if (i !== winnerIndex) {
      env.classList.add("fading");
    }
  });

  // Highlight winner
  setTimeout(() => {
    envelopes[winnerIndex].classList.add("winner-highlight");
  }, 400);

  // Hiển thị kết quả
  setTimeout(() => {
    showResult();
  }, 1800);
}

// Đóng overlay
function closeOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("active");
  overlay.innerHTML = "";
  
  document.getElementById("start-btn").disabled = false;
  document.getElementById("info-text").textContent =
    `✅ Đã tải ${studentList.length} sinh viên. Nhấn "Quay Số" để chơi!`;
  isAnimating = false;

  // Xóa tất cả các class hiệu ứng
  envelopes.forEach((envelope) => {
    envelope.classList.remove("wave-active", "fading", "winner-highlight");
  });

  // Khởi tạo lại envelopes
  initEnvelopes();
}

// Color picker functionality
const colorPicker = document.getElementById("bg-color-picker");
const headerColorPicker = document.getElementById("header-color-picker");
const presetColors = document.querySelectorAll(
  ".preset-color:not(.header-color-preset)"
);
const headerPresetColors = document.querySelectorAll(".header-color-preset");

// Thay đổi background
function changeBackground(gradient) {
  document.body.style.background = gradient;
}

// Thay đổi màu header
function changeHeaderColor(color) {
  document.documentElement.style.setProperty("--header-color", color);
}

// Header color picker
headerColorPicker.addEventListener("input", function (e) {
  const color = e.target.value;
  changeHeaderColor(color);
  headerPresetColors.forEach((preset) => preset.classList.remove("active"));
});

// Header preset color buttons
headerPresetColors.forEach((preset) => {
  preset.addEventListener("click", function () {
    const color = this.getAttribute("data-color");
    changeHeaderColor(color);
    headerColorPicker.value = color;
    headerPresetColors.forEach((p) => p.classList.remove("active"));
    this.classList.add("active");
  });
});

// Background color picker
colorPicker.addEventListener("input", function (e) {
  const color = e.target.value;
  const gradient = `linear-gradient(135deg, ${color} 0%, ${adjustBrightness(
    color,
    -20
  )} 100%)`;
  changeBackground(gradient);
  presetColors.forEach((preset) => preset.classList.remove("active"));
});

// Preset color buttons
presetColors.forEach((preset) => {
  preset.addEventListener("click", function () {
    const gradient = this.getAttribute("data-gradient");
    changeBackground(gradient);
    presetColors.forEach((p) => p.classList.remove("active"));
    this.classList.add("active");
  });
});

// Helper function
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

// Tạo controls cho hiệu ứng sóng
function createWaveControls() {
  const controlsDiv = document.querySelector(".controls");

  const waveControlsHTML = `
    <div class="wave-controls-section">
      <div class="color-picker-label">🌊 Cài Đặt Sóng</div>
      
      <div class="wave-control-group">
        <label class="wave-label">Thời gian sóng (ms):</label>
        <input type="range" id="wave-duration" min="2000" max="10000" value="${waveConfig.duration}" step="500">
        <span id="duration-value">${waveConfig.duration}</span>
      </div>
      
      <div class="wave-control-group">
        <label class="wave-label">Tốc độ di chuyển (ms):</label>
        <input type="range" id="wave-speed" min="20" max="200" value="${waveConfig.speed}" step="10">
        <span id="speed-value">${waveConfig.speed}</span>
      </div>
      
      <div class="wave-control-group">
        <label class="wave-label">Tốc độ nổi/lặn (ms):</label>
        <input type="range" id="bounce-speed" min="100" max="500" value="${waveConfig.bounceSpeed}" step="50">
        <span id="bounce-value">${waveConfig.bounceSpeed}</span>
      </div>
      
      <div class="wave-control-group">
        <label class="wave-label">Hướng sóng:</label>
        <div class="wave-direction-buttons">
          <button class="wave-dir-btn ${
            waveConfig.direction === "row" ? "active" : ""
          }" data-direction="row">Hàng →</button>
          <button class="wave-dir-btn ${
            waveConfig.direction === "column" ? "active" : ""
          }" data-direction="column">Cột ↓</button>
        </div>
      </div>
    </div>
  `;

  controlsDiv.insertAdjacentHTML("beforeend", waveControlsHTML);

  // Event listeners
  const durationSlider = document.getElementById("wave-duration");
  const speedSlider = document.getElementById("wave-speed");
  const bounceSlider = document.getElementById("bounce-speed");
  const durationValue = document.getElementById("duration-value");
  const speedValue = document.getElementById("speed-value");
  const bounceValue = document.getElementById("bounce-value");
  const directionBtns = document.querySelectorAll(".wave-dir-btn");

  durationSlider.addEventListener("input", (e) => {
    waveConfig.duration = parseInt(e.target.value);
    durationValue.textContent = waveConfig.duration;
  });

  speedSlider.addEventListener("input", (e) => {
    waveConfig.speed = parseInt(e.target.value);
    speedValue.textContent = waveConfig.speed;
  });

  bounceSlider.addEventListener("input", (e) => {
    waveConfig.bounceSpeed = parseInt(e.target.value);
    bounceValue.textContent = waveConfig.bounceSpeed;
    document.documentElement.style.setProperty(
      "--wave-bounce-duration",
      waveConfig.bounceSpeed + "ms"
    );
  });

  directionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      directionBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      waveConfig.direction = this.dataset.direction;
    });
  });
}

// Khởi tạo
window.onload = function () {
  initEnvelopes();
  createWaveControls();
  document.documentElement.style.setProperty(
    "--wave-bounce-duration",
    waveConfig.bounceSpeed + "ms"
  );
};

// Event listeners
document.getElementById("start-btn").addEventListener("click", startAnimation);

// Xử lý resize window để tự động điều chỉnh kích thước phong bì
window.addEventListener("resize", function () {
  initEnvelopes();
});