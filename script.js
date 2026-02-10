const SHEET_URL = "https://opensheet.elk.sh/1x5CgXBRZertwKa5ZVp3DqlvyXYCAxEVCyKJMt8-dPMY/Sheet1";

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    const activeJobs = data.filter(job => isActive(job.deadline));
    renderJobs(activeJobs);
  })
  .catch(() => {
    document.getElementById("job-list").innerHTML =
      `<p class="empty">Gagal memuat data</p>`;
  });

function isActive(deadline) {
  if (!deadline) return true;

  const today = new Date();
  const end = new Date(deadline);

  // normalisasi jam
  today.setHours(0,0,0,0);
  end.setHours(23,59,59,999);

  return end >= today;
}

function renderJobs(data) {
  const container = document.getElementById("jobs");
  container.innerHTML = "";

  const today = new Date();

  const activeJobs = data.filter((row, index) => {
    if (index === 0) return false; // skip header
    const deadline = new Date(row[4]);
    return deadline >= today;
  });

  if (activeJobs.length === 0) {
    container.innerHTML = `<p class="empty">Belum ada lowongan aktif</p>`;
    return;
  }

  activeJobs.forEach(row => {
    const [
      posisi,
      unit,
      jenis,
      lokasi,
      deadline,
      gambar,
      deskripsi,
      link
    ] = row;

    const imageUrl = convertDriveLink(gambar);

    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <img 
        src="${imageUrl}" 
        class="job-image" 
        alt="${posisi}"
        onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'"
      >

      <div class="job-body">
        <h3>${posisi}</h3>
        <p class="meta">${unit} • ${jenis}</p>
        <p class="lokasi">${lokasi}</p>
        <p class="desc">${deskripsi}</p>
        <a href="${link}" target="_blank" class="btn">
          Lamar Sekarang
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}
