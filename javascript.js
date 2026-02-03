       let studentList = [];
let isAnimating = false;
let envelopes = [];
let visualWinnerIndex = -1;
let actualWinnerData = null;
let autoGenerateMode = false;
let usedVisualIndices = [];

// Cấu hình hiệu ứng sóng
const waveConfig = {
  duration: 3000,
  speed: 50,
  bounceSpeed: 200,
  direction: 'row',
};

// --- PHẦN 1: TẠO HÌNH ẢNH BAO LÌ XÌ ---
function createEnvelopeSVG(index) {
  const patterns = [
    // 0: PHÚC
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g0-${index}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FF4444"/><stop offset="100%" stop-color="#C40000"/></linearGradient><filter id="ts0-${index}"><feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#6B0000" flood-opacity="0.7"/></filter></defs><rect y="12" width="100" height="128" rx="10" fill="url(#g0-${index})"/><rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/><ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/><rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/><circle cx="50" cy="72" r="32" fill="#FFD700" opacity="0.92"/><circle cx="50" cy="72" r="29" fill="none" stroke="#B8860B" stroke-width="1.5" opacity="0.45"/><text x="50" y="80" font-size="22" fill="#8B0000" text-anchor="middle" font-weight="bold" font-family="serif" filter="url(#ts0-${index})">Phúc</text><rect x="24" y="118" width="52" height="2.5" rx="1.5" fill="#FFD700" opacity="0.6"/><rect x="32" y="124" width="36" height="2" rx="1" fill="#FFD700" opacity="0.4"/></svg>`,
    // 1: LỘC
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1-${index}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FF2020"/><stop offset="100%" stop-color="#A00000"/></linearGradient><filter id="ts1-${index}"><feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#6B0000" flood-opacity="0.7"/></filter></defs><rect y="12" width="100" height="128" rx="10" fill="url(#g1-${index})"/><rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/><ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/><rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/><circle cx="50" cy="72" r="32" fill="#FFD700" opacity="0.92"/><circle cx="50" cy="72" r="29" fill="none" stroke="#B8860B" stroke-width="1.5" opacity="0.45"/><text x="50" y="80" font-size="22" fill="#8B0000" text-anchor="middle" font-weight="bold" font-family="serif" filter="url(#ts1-${index})">Lộc</text><rect x="24" y="118" width="52" height="2.5" rx="1.5" fill="#FFD700" opacity="0.6"/><rect x="32" y="124" width="36" height="2" rx="1" fill="#FFD700" opacity="0.4"/></svg>`,
    // 2: THỌ
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g2-${index}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E82828"/><stop offset="100%" stop-color="#8C0000"/></linearGradient><filter id="ts2-${index}"><feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#5C0000" flood-opacity="0.7"/></filter></defs><rect y="12" width="100" height="128" rx="10" fill="url(#g2-${index})"/><rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/><ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/><rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/><circle cx="50" cy="72" r="32" fill="#FFD700" opacity="0.92"/><circle cx="50" cy="72" r="29" fill="none" stroke="#B8860B" stroke-width="1.5" opacity="0.45"/><text x="50" y="80" font-size="22" fill="#8B0000" text-anchor="middle" font-weight="bold" font-family="serif" filter="url(#ts2-${index})">Thọ</text><rect x="24" y="118" width="52" height="2.5" rx="1.5" fill="#FFD700" opacity="0.6"/><rect x="32" y="124" width="36" height="2" rx="1" fill="#FFD700" opacity="0.4"/></svg>`,
    // 3: HOA MAI
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g3-${index}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#DC143C"/><stop offset="100%" stop-color="#8B0000"/></linearGradient></defs><rect y="12" width="100" height="128" rx="10" fill="url(#g3-${index})"/><rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/><ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/><rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/><path d="M50 135 Q48 100 35 75 Q28 58 30 40" stroke="#8B5E3C" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M38 62 Q50 52 58 58" stroke="#8B5E3C" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M33 48 Q42 35 52 42" stroke="#8B5E3C" stroke-width="2" fill="none" stroke-linecap="round"/><g transform="translate(30,42)"><ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(0)"/><ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(72)"/><ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(144)"/><ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(216)"/><ellipse cx="0" cy="-9" rx="4" ry="7" fill="#FFE566" opacity="0.95" transform="rotate(288)"/><circle cx="0" cy="0" r="3" fill="#FF8C00"/></g><g transform="translate(58,55)"><ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(0)"/><ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(72)"/><ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(144)"/><ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(216)"/><ellipse cx="0" cy="-7" rx="3.2" ry="5.5" fill="#FFD933" opacity="0.9" transform="rotate(288)"/><circle cx="0" cy="0" r="2.2" fill="#FF8C00"/></g><g transform="translate(52,38)"><ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(0)"/><ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(120)"/><ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(240)"/><circle cx="0" cy="0" r="1.8" fill="#FF8C00"/></g><ellipse cx="25" cy="68" rx="5" ry="2.5" fill="#4CAF50" opacity="0.8" transform="rotate(-30,25,68)"/><ellipse cx="40" cy="55" rx="4" ry="2" fill="#4CAF50" opacity="0.7" transform="rotate(15,40,55)"/></svg>`,
    // 4: HOA ĐÀO
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g4-${index}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FF3333"/><stop offset="100%" stop-color="#990000"/></linearGradient></defs><rect y="12" width="100" height="128" rx="10" fill="url(#g4-${index})"/><rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/><ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/><rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/><path d="M50 135 Q52 105 65 78 Q72 60 68 38" stroke="#6D4C2A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M63 55 Q52 48 46 56" stroke="#6D4C2A" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M67 42 Q58 32 50 40" stroke="#6D4C2A" stroke-width="2" fill="none" stroke-linecap="round"/><g transform="translate(68,40)"><ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(0)"/><ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(60)"/><ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(120)"/><ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(180)"/><ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(240)"/><ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FFB6C1" opacity="0.95" transform="rotate(300)"/><circle cx="0" cy="0" r="3" fill="#FF69B4"/></g><g transform="translate(46,52)"><ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(0)"/><ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(60)"/><ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(120)"/><ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(180)"/><ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(240)"/><ellipse cx="0" cy="-6.5" rx="4" ry="5.5" fill="#FF9EB5" opacity="0.9" transform="rotate(300)"/><circle cx="0" cy="0" r="2.2" fill="#FF69B4"/></g><g transform="translate(58,32)"><ellipse cx="0" cy="-4" rx="2.8" ry="3.5" fill="#FFB6C1" opacity="0.8" transform="rotate(0)"/><ellipse cx="0" cy="-4" rx="2.8" ry="3.5" fill="#FFB6C1" opacity="0.8" transform="rotate(120)"/><ellipse cx="0" cy="-4" rx="2.8" ry="3.5" fill="#FFB6C1" opacity="0.8" transform="rotate(240)"/><circle cx="0" cy="0" r="1.8" fill="#FF69B4"/></g><ellipse cx="72" cy="58" rx="5" ry="2.2" fill="#4CAF50" opacity="0.75" transform="rotate(25,72,58)"/><ellipse cx="58" cy="45" rx="4" ry="2" fill="#4CAF50" opacity="0.7" transform="rotate(-10,58,45)"/></svg>`,
    // 5: MAI ĐÀO MIX
    `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g5-${index}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E00000"/><stop offset="100%" stop-color="#7A0000"/></linearGradient></defs><rect y="12" width="100" height="128" rx="10" fill="url(#g5-${index})"/><rect x="5" y="17" width="90" height="118" rx="7" fill="none" stroke="#FFD700" stroke-width="1.8" opacity="0.7"/><ellipse cx="50" cy="8" rx="6" ry="5" fill="#FFD700" opacity="0.9"/><rect x="48" y="11" width="4" height="8" fill="#FFD700" opacity="0.85"/><path d="M50 135 Q50 100 50 70" stroke="#6D4C2A" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M50 85 Q36 78 28 68" stroke="#6D4C2A" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M50 72 Q64 65 72 55" stroke="#6D4C2A" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M50 60 Q42 50 36 42" stroke="#6D4C2A" stroke-width="1.8" fill="none" stroke-linecap="round"/><g transform="translate(36,40)"><ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(0)"/><ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(72)"/><ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(144)"/><ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(216)"/><ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="#FFE566" opacity="0.95" transform="rotate(288)"/><circle cx="0" cy="0" r="2.2" fill="#FF8C00"/></g><g transform="translate(72,53)"><ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(0)"/><ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(60)"/><ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(120)"/><ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(180)"/><ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(240)"/><ellipse cx="0" cy="-6" rx="3.8" ry="5" fill="#FFB6C1" opacity="0.93" transform="rotate(300)"/><circle cx="0" cy="0" r="2" fill="#FF69B4"/></g><g transform="translate(28,66)"><ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(0)"/><ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(120)"/><ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFE566" opacity="0.85" transform="rotate(240)"/><circle cx="0" cy="0" r="1.6" fill="#FF8C00"/></g><g transform="translate(56,48)"><ellipse cx="0" cy="-3.5" rx="2.2" ry="3.2" fill="#FFB6C1" opacity="0.8" transform="rotate(0)"/><ellipse cx="0" cy="-3.5" rx="2.2" ry="3.2" fill="#FFB6C1" opacity="0.8" transform="rotate(120)"/><ellipse cx="0" cy="-3.5" rx="2.2" ry="3.2" fill="#FFB6C1" opacity="0.8" transform="rotate(240)"/><circle cx="0" cy="0" r="1.4" fill="#FF69B4"/></g><ellipse cx="42" cy="52" rx="4" ry="1.8" fill="#4CAF50" opacity="0.7" transform="rotate(-20,42,52)"/><ellipse cx="65" cy="62" rx="4.5" ry="2" fill="#4CAF50" opacity="0.72" transform="rotate(18,65,62)"/><ellipse cx="33" cy="75" rx="3.5" ry="1.6" fill="#4CAF50" opacity="0.65" transform="rotate(-5,33,75)"/></svg>`,
  ];
  return patterns[index % 6];
}

// --- PHẦN 2: TÍNH TOÁN LƯỚI ---
function getEnvelopeSize() {
  const vw = window.innerWidth;
  if (vw >= 1200) return { w: 120, h: 160 };
  else if (vw >= 768) return { w: 100, h: 140 };
  else return { w: 70, h: 100 };
}

// --- PHẦN 3: KHỞI TẠO BAO LÌ XÌ ---
function initEnvelopes() {
  const container = document.getElementById("envelope-container");
  container.innerHTML = "";
  envelopes = [];
  container.classList.add("auto-grid");

  const size = getEnvelopeSize();
  
  const availableWidth = container.clientWidth || window.innerWidth - 30;
  const availableHeight = (window.innerHeight - 200) > 300 ? (window.innerHeight - 200) : 400;
  
  const gap = 15;
  
  const cols = Math.floor(availableWidth / (size.w + gap));
  const rows = Math.floor(availableHeight / (size.h + gap));
  
  let numEnvelopes = cols * rows;

  if (numEnvelopes < 12) numEnvelopes = 12;
  if (numEnvelopes > 50) numEnvelopes = 50;

  if (numEnvelopes % 2 !== 0) numEnvelopes--;

  container.style.setProperty('--envelope-size', `${size.w}px`);
  container.style.setProperty('--envelope-height', `${size.h}px`);

  for (let i = 0; i < numEnvelopes; i++) {
    const div = document.createElement("div");
    div.className = "envelope";
    div.style.setProperty("--w", `${size.w}px`);
    div.style.setProperty("--h", `${size.h}px`);
    
    if (usedVisualIndices.includes(i)) {
      div.classList.add("used");
    }

    div.innerHTML = createEnvelopeSVG(i);
    container.appendChild(div);
    envelopes.push(div);

    setTimeout(() => div.classList.add("appeared"), i * 20);
  }
}

// --- PHẦN 4: XỬ LÝ FILE ---
document.getElementById("file-upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

      studentList = json.slice(1).map((row) => ({
        stt: row[0],
        mssv: row[1],
        hoLot: row[2],
        ten: row[3],
      }));

      usedVisualIndices = [];
      initEnvelopes();

      if (studentList.length > 0) {
        document.getElementById("start-btn").disabled = false;
        document.getElementById("info-text").textContent = `✅ Đã tải ${studentList.length} người.`;
        autoGenerateMode = false;
      }
    } catch (error) {
      document.getElementById("info-text").textContent = "❌ Lỗi file!";
    }
  };
  reader.readAsArrayBuffer(file);
});

// --- PHẦN 5: LOGIC SÓNG ---
function createWavePath() {
  const container = document.getElementById("envelope-container");
  const style = window.getComputedStyle(container);
  
  const gridCols = style.gridTemplateColumns.split(' ').length;
  if (gridCols === 0) return Array.from(Array(envelopes.length).keys());

  const gridRows = Math.ceil(envelopes.length / gridCols);
  const path = [];
  
  if (waveConfig.direction === 'row') {
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const index = r * gridCols + c;
        if (index < envelopes.length) path.push(index);
      }
    }
  } else {
    for (let c = 0; c < gridCols; c++) {
      for (let r = 0; r < gridRows; r++) {
        const index = r * gridCols + c;
        if (index < envelopes.length) path.push(index);
      }
    }
  }
  return path;
}

async function applyWaveEffect() {
  const { duration, speed, bounceSpeed } = waveConfig;
  let path = createWavePath();
  
  // Nếu path rỗng (tất cả envelope đã dùng), reset
  if (path.length === 0) {
    usedVisualIndices = [];
    envelopes.forEach(env => env.classList.remove('used'));
    path = createWavePath();
  }
  
  const startTime = Date.now();
  const startOffset = Math.floor(Math.random() * path.length);
  let lastActiveIndex = -1;

  return new Promise((resolve) => {
    function runWave() {
      if (Date.now() - startTime >= duration) {
        // Khi sóng kết thúc, giữ lại envelope cuối cùng (visualWinnerIndex) có class wave-active
        envelopes.forEach((env, idx) => {
          if (idx !== visualWinnerIndex) env.classList.remove('wave-active');
          else env.classList.add('wave-active');
        });
        resolve();
        return; 
      }

      const elapsed = Date.now() - startTime;
      const currentIndex = (Math.floor(elapsed / speed) + startOffset) % path.length;
      const envelopeIndex = path[currentIndex];
      const envelope = envelopes[envelopeIndex];
      
      if (envelope && !envelope.classList.contains('used')) {
        // Xóa class wave-active của envelope trước đó
        if (lastActiveIndex !== -1 && lastActiveIndex < envelopes.length) {
          envelopes[lastActiveIndex].classList.remove('wave-active');
        }
        
        // Thêm class wave-active cho envelope hiện tại
        envelope.classList.add('wave-active');
        visualWinnerIndex = envelopeIndex;
        lastActiveIndex = envelopeIndex;
        
        // Xóa class wave-active sau bounceSpeed
        setTimeout(() => {
          if (envelopeIndex === visualWinnerIndex && Date.now() - startTime < duration) {
            envelope.classList.remove('wave-active');
          }
        }, bounceSpeed);
      }
      requestAnimationFrame(runWave);
    }
    runWave();
  });
}

// --- PHẦN 5: QUAY SỐ VÀ HIỆU ỨNG KẾT THÚC ---
async function startAnimation() {
  const controlsPanel = document.querySelector('.controls');
  const toggleBtn = document.querySelector('.controls-toggle');
  if (controlsPanel) {
    controlsPanel.classList.remove('active');
    if(toggleBtn) toggleBtn.innerHTML = '☰';
  }

  if (studentList.length === 0) {
    if (!autoGenerateMode) {
      alert("Đã quay hết danh sách! Vui lòng nạp lại file Excel.");
      return;
    } else {
      studentList = Array.from({length: 100}, (_, i) => ({stt: i+1, mssv: `DEMO${i}`, hoLot: `Demo`, ten: `User ${i}`}));
    }
  }
  
  if (isAnimating) return;
  isAnimating = true;
  document.getElementById("start-btn").disabled = true;
  
  document.getElementById("info-text").textContent = `🎲 Đang quay... (Còn ${studentList.length} người)`;

  envelopes.forEach(env => env.classList.remove("fading", "winner-blink", "winner-move-to-center", "wave-active"));

  // 1. Chạy hiệu ứng sóng
  await applyWaveEffect();
  
  // 2. CHỐT NGƯỜI TRÚNG VÀ LOẠI BỎ KHỎI DANH SÁCH
  const randDataIndex = Math.floor(Math.random() * studentList.length);
  
  actualWinnerData = studentList[randDataIndex];
  
  studentList.splice(randDataIndex, 1);
  
  document.getElementById("info-text").textContent = `✅ Đã chọn xong! Còn lại ${studentList.length} người.`;

  // 3. Chọn vị trí hiển thị
  let availableVisualIndices = envelopes.map((_, i) => i).filter(i => !usedVisualIndices.includes(i));
  
  if (availableVisualIndices.length === 0) {
    usedVisualIndices = [];
    availableVisualIndices = envelopes.map((_, i) => i);
    envelopes.forEach(env => env.classList.remove('used'));
  }

  // Nếu visualWinnerIndex (envelope cuối cùng của sóng) đã được dùng, chọn một envelope chưa dùng khác
  if (usedVisualIndices.includes(visualWinnerIndex)) {
    const randVisualIndex = Math.floor(Math.random() * availableVisualIndices.length);
    visualWinnerIndex = availableVisualIndices[randVisualIndex];
  }
  
  const winnerEnvelope = envelopes[visualWinnerIndex];

  // 4. Hiệu ứng: Dừng & Nhấp nháy
  winnerEnvelope.classList.remove('wave-active');
  winnerEnvelope.classList.add("winner-blink");

  // Tính toán vị trí bay
  const rect = winnerEnvelope.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const targetX = window.innerWidth / 2;
  const targetY = window.innerHeight / 2;
  
  winnerEnvelope.style.setProperty("--move-dx", `${targetX - startX}px`);
  winnerEnvelope.style.setProperty("--move-dy", `${targetY - startY}px`);
    
  setTimeout(() => {
    // 5. Bay vào giữa
    winnerEnvelope.classList.remove("winner-blink");
    winnerEnvelope.style.position = "relative"; 
    winnerEnvelope.style.zIndex = "999";
    
    winnerEnvelope.classList.add("winner-move-to-center");
    
    // 6. Hiện kết quả & Pháo hoa
    setTimeout(() => {
      createFireworks();
      showResult();
    }, 1200); 
    
  }, 2000);
}

document.getElementById("start-btn").addEventListener("click", startAnimation);

// --- PHẦN 7: HIỂN THỊ KẾT QUẢ ---
function showResult() {
  const overlay = document.getElementById("overlay");
  if (envelopes[visualWinnerIndex]) envelopes[visualWinnerIndex].style.visibility = "hidden";

  overlay.innerHTML = `
    <div class="result-wrapper" id="result-wrapper">
      <div class="envelope-stage" id="envelope-stage">
        <div class="svg-wrap-result">${createEnvelopeSVG(visualWinnerIndex)}
          <div class="paper-pop" id="paper-pop">
            <div class="p-title">🎉CHÚC MỪNG🎉</div>
            <div class="p-line"><div>${actualWinnerData.hoLot} ${actualWinnerData.ten}</div></div>
          </div>
        </div>
      </div>
      <div class="result-card" id="result-card" style="display:none;">
        <div class="result-card-inner">
          <div class="result-title">🎉 CHÚC MỪNG 🎉</div>
          <div class="result-row"><span class="result-label">STT</span><span class="result-value">${actualWinnerData.stt}</span></div>
          <div class="result-row"><span class="result-label">MSSV</span><span class="result-value">${actualWinnerData.mssv}</span></div>
          <div class="result-row"><span class="result-label">Họ tên</span><span class="result-value">${actualWinnerData.hoLot} ${actualWinnerData.ten}</span></div>
          <button class="close-btn" onclick="closeOverlay()">Đóng</button>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add("active");

  setTimeout(() => {
    const paperPop = document.getElementById("paper-pop");
    if (paperPop) paperPop.classList.add("popped");
  }, 500);

  setTimeout(() => {
    const stage = document.getElementById("envelope-stage");
    const card = document.getElementById("result-card");
    if (stage) stage.style.display = "none";
    if (card) {
        card.style.display = "flex";
        void card.offsetWidth;
        card.classList.add("visible");
    }
  }, 1800);
}

function closeOverlay() {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("start-btn").disabled = false;
  document.getElementById("info-text").textContent = `✅ Sẵn sàng quay tiếp!`;
  isAnimating = false;

  if (visualWinnerIndex !== -1) usedVisualIndices.push(visualWinnerIndex);

  envelopes.forEach((envelope) => {
    envelope.style.visibility = "";
    envelope.style.position = "";
    envelope.style.zIndex = "";
    envelope.classList.remove("winner-blink", "winner-move-to-center", "wave-active");
    envelope.style.removeProperty("--move-dx");
    envelope.style.removeProperty("--move-dy");
  });
  
  const canvas = document.getElementById('fireworks-canvas');
  if(canvas) canvas.remove();

  initEnvelopes(); 
}

// --- PHẦN 8: PHÁO HOA ---
function createFireworks() {
  const canvas = document.createElement('canvas');
  canvas.id = 'fireworks-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '2000';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff'];

  function createParticle(x, y) {
    const particle = { x: x, y: y, vx: Math.random() * 6 - 3, vy: Math.random() * 6 - 3, color: colors[Math.floor(Math.random() * colors.length)], alpha: 1, life: 100 };
    particles.push(particle);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.05) { for (let i = 0; i < 30; i++) createParticle(Math.random() * canvas.width, Math.random() * canvas.height / 2); }
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.alpha -= 0.01; p.life--;
      ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      if (p.life <= 0 || p.alpha <= 0) { particles.splice(i, 1); i--; }
    }
    if (document.getElementById('overlay').classList.contains('active')) requestAnimationFrame(animate); else canvas.remove();
  }
  for(let i=0; i<50; i++) createParticle(window.innerWidth/2, window.innerHeight/2);
  animate();
}

// --- TIỆN ÍCH ---
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

// Color picker input handler (background)
colorPicker.addEventListener("input", function (e) {
  const color = e.target.value;
  const gradient = `linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, -20)} 100%)`;
  changeBackground(gradient);

  presetColors.forEach((preset) => preset.classList.remove("active"));
});

// Preset color buttons (background)
presetColors.forEach((preset) => {
  preset.addEventListener("click", function () {
    const gradient = this.getAttribute("data-gradient");
    changeBackground(gradient);

    presetColors.forEach((p) => p.classList.remove("active"));
    this.classList.add("active");
  });
});

function createWaveControls() {
  const controlsDiv = document.querySelector('.controls');
  if(document.querySelector('.wave-controls-section')) return;
  const html = `
    <div class="wave-controls-section">
      <div class="color-picker-label">🌊 Cài Đặt Sóng</div>
      <div class="wave-control-group"><label class="wave-label">Thời gian</label><input type="range" id="wave-duration" min="2000" max="10000" value="${waveConfig.duration}" step="500"></div>
      <div class="wave-control-group"><label class="wave-label">Tốc độ</label><input type="range" id="wave-speed" min="20" max="200" value="${waveConfig.speed}" step="10"></div>
      <div class="wave-control-group"><label class="wave-label">Hướng</label><div class="wave-direction-buttons"><button class="wave-dir-btn active" data-dir="row">Hàng</button><button class="wave-dir-btn" data-dir="column">Cột</button></div></div>
    </div>`;
  controlsDiv.insertAdjacentHTML('beforeend', html);
  document.getElementById('wave-duration').addEventListener('input', (e) => waveConfig.duration = parseInt(e.target.value));
  document.getElementById('wave-speed').addEventListener('input', (e) => waveConfig.speed = parseInt(e.target.value));
  document.querySelectorAll('.wave-dir-btn').forEach(btn => btn.addEventListener('click', function() {
    document.querySelectorAll('.wave-dir-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    waveConfig.direction = this.dataset.dir;
  }));
}

function adjustBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// --- PHẦN 9: ĐIỀU KHIỂN MENU (TOGGLE) ---
const toggleBtn = document.querySelector('.controls-toggle');
const controlsPanel = document.querySelector('.controls');

if (toggleBtn) {
  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    controlsPanel.classList.toggle('active');
    
    if (controlsPanel.classList.contains('active')) {
      toggleBtn.innerHTML = '✕';
    } else {
      toggleBtn.innerHTML = '☰';
    }
  });
}

document.addEventListener('click', function(e) {
  if (controlsPanel.classList.contains('active')) {
    if (!controlsPanel.contains(e.target) && !toggleBtn.contains(e.target)) {
      controlsPanel.classList.remove('active');
      toggleBtn.innerHTML = '☰';
    }
  }
});

window.onload = function () {
  if (studentList.length === 0) {
    document.getElementById("info-text").textContent = "📱 Chế độ xem thử...";
    autoGenerateMode = true;
  }
  initEnvelopes();
  createWaveControls();
};

window.addEventListener('resize', () => { 
  if (autoGenerateMode || studentList.length === 0) initEnvelopes(); 
});