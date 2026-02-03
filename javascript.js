let studentList = [];
let isAnimating = false;
let envelopes = [];
let winnerIndex = -1;
let lastWaveEnvelopeIndex = -1;
let autoGenerateMode = false;

// Cấu hình hiệu ứng sóng
const waveConfig = {
  duration: 3000,        // Tổng thời gian chạy sóng (ms)
  speed: 80,             // Tốc độ di chuyển giữa các bao (ms)
  bounceSpeed: 200,      // Tốc độ nổi lên/hạ xuống của mỗi bao (ms)
  direction: 'row',      // 'row' hoặc 'column'
};

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
      <path d="M50 138 Q46 110 30 80" stroke="#8B5E3C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M50 135 Q54 105 68 75" stroke="#6D4C2A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <g transform="translate(28,76)">
        <ellipse cx="0" cy="-6" rx="3" ry="5" fill="#FFE566" opacity="0.9" transform="rotate(0)"/>
        <ellipse cx="0" cy="-6" rx="3" ry="5" fill="#FFE566" opacity="0.9" transform="rotate(72)"/>
        <ellipse cx="0" cy="-6" rx="3" ry="5" fill="#FFE566" opacity="0.9" transform="rotate(144)"/>
        <ellipse cx="0" cy="-6" rx="3" ry="5" fill="#FFE566" opacity="0.9" transform="rotate(216)"/>
        <ellipse cx="0" cy="-6" rx="3" ry="5" fill="#FFE566" opacity="0.9" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2.2" fill="#FF8C00"/>
      </g>
      <g transform="translate(70,70)">
        <ellipse cx="0" cy="-5.5" rx="3.5" ry="5" fill="#FFB6C1" opacity="0.9" transform="rotate(0)"/>
        <ellipse cx="0" cy="-5.5" rx="3.5" ry="5" fill="#FFB6C1" opacity="0.9" transform="rotate(60)"/>
        <ellipse cx="0" cy="-5.5" rx="3.5" ry="5" fill="#FFB6C1" opacity="0.9" transform="rotate(120)"/>
        <ellipse cx="0" cy="-5.5" rx="3.5" ry="5" fill="#FFB6C1" opacity="0.9" transform="rotate(180)"/>
        <ellipse cx="0" cy="-5.5" rx="3.5" ry="5" fill="#FFB6C1" opacity="0.9" transform="rotate(240)"/>
        <ellipse cx="0" cy="-5.5" rx="3.5" ry="5" fill="#FFB6C1" opacity="0.9" transform="rotate(300)"/>
        <circle cx="0" cy="0" r="2" fill="#FF69B4"/>
      </g>
      <ellipse cx="22" cy="88" rx="4" ry="2" fill="#4CAF50" opacity="0.75" transform="rotate(-20,22,88)"/>
      <ellipse cx="76" cy="82" rx="4" ry="2" fill="#4CAF50" opacity="0.7" transform="rotate(15,76,82)"/>
    </svg>`,
  ];

  return patterns[index % patterns.length];
}

// File upload handler
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

      // Skip header row, get data rows
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

// Initialize envelopes display
// Initialize envelopes display - TỰ ĐỘNG TẠO THẺ THEO KÍCH THƯỚC MÀN HÌNH
function initEnvelopes() {
  const container = document.getElementById("envelope-container");
  container.innerHTML = "";
  envelopes = [];
  
  // THÊM class auto-grid
  container.classList.add("auto-grid");

  if (studentList.length === 0 && !autoGenerateMode) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:#fff; padding:40px;">Chưa có dữ liệu</div>`;
    return;
  }

  // TỰ ĐỘNG TÍNH TOÁN SỐ THẺ THEO KÍCH THƯỚC MÀN HÌNH
  let numEnvelopes;
  if (autoGenerateMode || studentList.length === 0) {
    // Tính toán dựa trên kích thước màn hình
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Kích thước envelope (ước tính)
    const envelopeWidth = 90;
    const envelopeHeight = 118;
    
    // Tính số envelope có thể hiển thị
    const cols = Math.floor(screenWidth / (envelopeWidth + 12));
    const rows = Math.floor((screenHeight - 200) / (envelopeHeight + 12));
    numEnvelopes = Math.max(cols * rows, 12); // Ít nhất 12 thẻ
    
    // Tạo dữ liệu giả nếu cần
    if (studentList.length === 0) {
      studentList = Array.from({length: numEnvelopes}, (_, i) => ({
        stt: i + 1,
        mssv: `SV${1000 + i}`,
        hoLot: `Họ Lót ${i + 1}`,
        ten: `Tên ${i + 1}`
      }));
    }
  } else {
    numEnvelopes = studentList.length;
  }

  // Tạo envelope với kích thước tự động
  const isMobile = window.innerWidth < 768;
  const envelopeSize = isMobile ? 70 : 90;
  
  // Đặt biến CSS cho kích thước envelope
  container.style.setProperty('--envelope-size', `${envelopeSize}px`);

  for (let i = 0; i < numEnvelopes; i++) {
    const div = document.createElement("div");
    div.className = "envelope";
    div.style.setProperty("--w", `${envelopeSize}px`);
    div.style.setProperty("--h", `${envelopeSize * 1.31}px`);
    div.innerHTML = createEnvelopeSVG(i);
    container.appendChild(div);
    envelopes.push(div);

    setTimeout(() => div.classList.add("appeared"), i * 35);
  }
}

// Tính toán vị trí grid của envelope
function getGridPosition(index) {
  const container = document.getElementById("envelope-container");
  const style = window.getComputedStyle(container);
  const columns = style.gridTemplateColumns.split(' ').length;
  
  const row = Math.floor(index / columns);
  const col = index % columns;
  
  return { row, col };
}

// Tạo danh sách các bao theo thứ tự sóng sẽ đi qua
function createWavePath() {
  const container = document.getElementById("envelope-container");
  const style = window.getComputedStyle(container);
  const columns = style.gridTemplateColumns.split(' ').length;
  const rows = Math.ceil(envelopes.length / columns);
  
  const path = [];
  
  if (waveConfig.direction === 'row') {
    // Sóng chạy theo hàng: từ trên xuống dưới, mỗi hàng từ trái sang phải
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const index = r * columns + c;
        if (index < envelopes.length) {
          path.push(index);
        }
      }
    }
  } else {
    // Sóng chạy theo cột: từ trái sang phải, mỗi cột từ trên xuống dưới
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

// Hiệu ứng sóng liên tục - sóng di chuyển qua từng bao
async function applyWaveEffect(winnerIdx) {
  const { duration, speed, bounceSpeed } = waveConfig;
  const path = createWavePath();
  const startTime = Date.now();
  
  // Tính số lần lặp sóng sẽ chạy
  const cycleTime = path.length * speed; // Thời gian để sóng chạy hết 1 vòng
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
        
        // Bao hiện tại nổi lên
        envelope.classList.add('wave-active');
        
        // LƯU LẠI THẺ CUỐI CÙNG ĐƯỢC NÂNG LÊN
        lastWaveEnvelopeIndex = envelopeIndex;
        
        // Bao trước đó (nếu có) hạ xuống
        if (currentIndex > 0) {
          const prevIndex = path[currentIndex - 1];
          envelopes[prevIndex].classList.remove('wave-active');
        }
        
        // Nếu là bao cuối cùng trong path, hạ nó xuống sau một lát
        if (currentIndex === path.length - 1) {
          setTimeout(() => {
            envelope.classList.remove('wave-active');
          }, bounceSpeed);
        }
        
        currentIndex++;
        
        // Kiểm tra thời gian
        if (Date.now() - startTime >= duration) {
          // Hạ tất cả các bao xuống
          envelopes.forEach(env => env.classList.remove('wave-active'));
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

// Main animation flow
async function startAnimation() {
  if (isAnimating || studentList.length === 0) return;

  isAnimating = true;
  document.getElementById("start-btn").disabled = true;
  document.getElementById("info-text").textContent = "🎲 Đang quay số...";

  // Chạy hiệu ứng sóng
  await applyWaveEffect();
  
  // Dùng thẻ cuối cùng được nâng lên
  winnerIndex = lastWaveEnvelopeIndex;
  
  // Sau khi sóng chạy xong, fade out các envelope khác
  envelopes.forEach((env, i) => {
    if (i !== winnerIndex) {
      env.classList.add("fading");
    }
  });

  // Highlight winner với hiệu ứng lấp lánh LÂU HƠN (3 giây)
  setTimeout(() => {
    envelopes[winnerIndex].classList.add("winner-glow-long");
    
    // Lưu vị trí ban đầu
    const winnerEnvelope = envelopes[winnerIndex];
    const rect = winnerEnvelope.getBoundingClientRect();
    winnerEnvelope.style.setProperty('--start-top', `${rect.top}px`);
    winnerEnvelope.style.setProperty('--start-left', `${rect.left}px`);
    
    // Sau 3 giây lấp lánh, di chuyển ra giữa
    setTimeout(() => {
      winnerEnvelope.classList.add("envelope-move-to-center");
      
      // Hiển thị kết quả sau khi di chuyển
      setTimeout(() => {
        showResult();
      }, 1500);
      
    }, 3000); // Lấp lánh 3 giây trước khi di chuyển
    
  }, 400);
}

// Add event listener for start button
document.getElementById("start-btn").addEventListener("click", startAnimation);

// Falling sparkles effect
function createFallingSparkles() {
  const colors = ["#FFD700", "#FFA500", "#FF6B6B", "#FF1744", "#DC143C"];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.className = "falling-sparkle";
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.setProperty("--size", Math.random() * 20 + 25 + "px");
      sparkle.style.setProperty("--duration", Math.random() * 2 + 3 + "s");
      sparkle.style.setProperty("--fall-distance", Math.random() * 300 + 400 + "px");
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 5000);
    }, i * 250);
  }
}

// Show result overlay
function showResult() {
  const winner = studentList[winnerIndex];
  const overlay = document.getElementById("overlay");

  overlay.innerHTML = `
    <div class="overlay-content">
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
    envelope.classList.remove("wave-active", "fading", "winner-highlight");
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

// Thêm controls cho hiệu ứng sóng
function createWaveControls() {
  const controlsDiv = document.querySelector('.controls');
  
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
          <button class="wave-dir-btn ${waveConfig.direction === 'row' ? 'active' : ''}" data-direction="row">
            Hàng →
          </button>
          <button class="wave-dir-btn ${waveConfig.direction === 'column' ? 'active' : ''}" data-direction="column">
            Cột ↓
          </button>
        </div>
      </div>
    </div>
  `;
  
  controlsDiv.insertAdjacentHTML('beforeend', waveControlsHTML);
  
  // Event listeners
  const durationSlider = document.getElementById('wave-duration');
  const speedSlider = document.getElementById('wave-speed');
  const bounceSlider = document.getElementById('bounce-speed');
  const durationValue = document.getElementById('duration-value');
  const speedValue = document.getElementById('speed-value');
  const bounceValue = document.getElementById('bounce-value');
  const directionBtns = document.querySelectorAll('.wave-dir-btn');
  
  durationSlider.addEventListener('input', (e) => {
    waveConfig.duration = parseInt(e.target.value);
    durationValue.textContent = waveConfig.duration;
  });
  
  speedSlider.addEventListener('input', (e) => {
    waveConfig.speed = parseInt(e.target.value);
    speedValue.textContent = waveConfig.speed;
  });
  
  bounceSlider.addEventListener('input', (e) => {
    waveConfig.bounceSpeed = parseInt(e.target.value);
    bounceValue.textContent = waveConfig.bounceSpeed;
    
    // Cập nhật CSS variable cho animation duration
    document.documentElement.style.setProperty('--wave-bounce-duration', waveConfig.bounceSpeed + 'ms');
  });
  
  directionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      directionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      waveConfig.direction = this.dataset.direction;
    });
  });
}

// Initialize on load
window.onload = function () {
  initEnvelopes();
  createWaveControls();
  
  // Set initial CSS variable
  document.documentElement.style.setProperty('--wave-bounce-duration', waveConfig.bounceSpeed + 'ms');
};

// Tự động điều chỉnh khi thay đổi kích thước màn hình
window.addEventListener('resize', function() {
  if (autoGenerateMode || studentList.length === 0) {
    initEnvelopes();
  }
});

// Khởi tạo chế độ tự động nếu không có dữ liệu
window.onload = function () {
  // Kiểm tra nếu chưa có dữ liệu, tự động tạo thẻ
  if (studentList.length === 0) {
    autoGenerateMode = true;
    document.getElementById("info-text").textContent = "📱 Đang tạo thẻ tự động theo kích thước màn hình...";
  }
  
  initEnvelopes();
  createWaveControls();
  
  // Set initial CSS variable
  document.documentElement.style.setProperty('--wave-bounce-duration', waveConfig.bounceSpeed + 'ms');
};