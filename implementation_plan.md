# Pelan Pelaksanaan: Peningkatan Kelajuan Kapal Terbang 20% & Penyelarasan Jarak Gerbang Kuiz

Cadangan ini meningkatkan kelajuan penerbangan kapal terbang sebanyak **20%** untuk ketiga-tiga peringkat permainan secara berterusan, di samping melaraskan jarak gerbang kuiz agar murid Tingkatan 1 (13 tahun) masih mempunyai masa berfikir dan mengira matematik nisbah yang mencukupi.

---

### 1. Pelarasan Kelajuan Penerbangan (+20%)

Peningkatan kelajuan asas (`baseSpeed`) bagi setiap peringkat dalam `src/types/game.ts` dan `src/game/GameWorld.ts`:

- **Peringkat 1 (Sky Cadet - Easy):**
  - Kelajuan asal: `13.8` unit/s
  - Kelajuan baru (+20%): **`16.6` unit/s**
- **Peringkat 2 (Sky Navigator - Medium):**
  - Kelajuan asal: `15.4` unit/s
  - Kelajuan baru (+20%): **`18.5` unit/s**
- **Peringkat 3 (Ratio Ace - Hard):**
  - Kelajuan asal: `17.0` unit/s
  - Kelajuan baru (+20%): **`20.4` unit/s**

---

### 2. Penyelarasan Jarak Kemunculan Gerbang Soalan Matematik

Bagi memastikan masa mengira dan membaca soalan nisbah DSKP 4.1 kekal seimbang pada kelajuan lebih tinggi:

- **Jarak Kemunculan Gerbang (`quizGateSpawnZ`):**
  - Ditambah daripada `-125` kepada **`-150`** unit.
  - Ini mengekalkan tempoh kira-kira **8.5 hingga 9 saat** untuk murid membaca soalan di banner atas, menyelesaikan nisbah di fikiran atau kertas conteng, dan mengemudi ke lorong gerbang yang tepat.
- **Jarak Antara Gerbang (`nextQuizGateDistance`):**
  - Peringkat 1: Dinaikkan daripada `75` kepada **`90`** unit.
  - Peringkat 2: Dinaikkan daripada `80` kepada **`96`** unit.
  - Peringkat 3: Dinaikkan daripada `85` kepada **`102`** unit.
- **Jarak Halangan & Item Collectible:**
  - Jarak penampan di hadapan gerbang dikekalkan lapang agar laluan ke gerbang kekal bersih dan bebas kekeliruan.

---

### 3. Penyelarasan Nilai Bonus Masa Pantas & Kawalan Kemudi

- **Masa Bonus Pantas (`isFast`):**
  - Dilaraskan kepada masa ketibaan gerbang baru bagi memastikan murid yang menjawab pantas dan tepat tetap menerima bonus **+20 mata**.
- **Kelancaran Kawalan Pesawat:**
  - Memastikan kadar interpolasi lerp pesawat (`AirplaneModel`) kekal responsif dan kemas pada kelajuan penerbangan baru.

---

### 4. Langkah Pengesahan (Verification)

- Menjalankan `lint_applet` untuk memastikan tiada ralat jenis TypeScript atau sintaks.
- Menjalankan `compile_applet` untuk mengesahkan binaan aplikasi berjaya sepenuhnya.
- Mengesahkan gameplay berjalan lancar pada desktop dan sentuhan mudah alih.
