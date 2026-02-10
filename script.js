const SPREADSHEET_ID = "1x5CgXBRZertwKa5ZVp3DqlvyXYCAxEVCyKJMt8-dPMY";
const SHEET_NAME = "Sheet1";

const URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

fetch(URL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;
    renderJobs(rows);
  })
  .catch(err => {
    document.getElementById("jobs").innerHTML =
      "<p class='empty'>Gagal memuat data</p>";
    console.error(err);
  });

function renderJobs(rows) {
  const container = document.getElementById("jobs");
  container.innerHTML = "";

  const today = new Date();
  let activeCount = 0;

  rows.forEach(r => {
    const data = r.c.map(c => c ? c.v : "");

    const [
      posisi,
      unit,
      jenis,
      lokasi,
      deadline,
      gambar,
      deskripsi,
      link
    ] = data;

    if (!deadline) return;
    if (new Date(deadline) < today) return;

    activeCount++;

    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <img
        src="${gambar}"
        class="job-image"
        alt="${posisi}"
        onload="console.log('IMAGE OK:', this.src)"
        onerror="console.error('IMAGE FAIL:', this.src); this.src='https://via.placeholder.com/300x200?text=No+Image';"
      >

      <div class="job-body">
        <h3>${posisi}</h3>
        <p class="meta">${unit} • ${jenis} • ${lokasi}</p>
        <p class="desc">${deskripsi}</p>
        <a href="${link}" target="_blank" class="btn">Lamar Sekarang</a>
      </div>
    `;

    container.appendChild(card);
  });

  if (activeCount === 0) {
    container.innerHTML =
      "<p class='empty'>Belum ada lowongan aktif</p>";
  }
}
