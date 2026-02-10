const SHEET_URL = "https://opensheet.elk.sh/1x5CgXBRZertwKa5ZVp3DqlvyXYCAxEVCyKJMt8-dPMY/Lowongan";

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

function renderJobs(jobs) {
  const container = document.getElementById("job-list");
  container.innerHTML = "";

  if (!jobs.length) {
    container.innerHTML =
      `<p class="empty">Belum ada lowongan aktif</p>`;
    return;
  }

  jobs.forEach(job => {
    container.innerHTML += `
      <div class="job-card">

        <img class="job-thumb"
             src="${job.gambar || 'https://via.placeholder.com/120'}"
             alt="${job.posisi}">

        <div class="job-content">

          <h3>${job.posisi}</h3>

          <p class="job-desc">${job.deskripsi}</p>

          <div class="job-meta">
            <span>${job.unit}</span>
            <span>${job.jenis}</span>
            <span>${job.lokasi}</span>
            <span>Deadline: ${job.deadline}</span>
          </div>

          <a class="btn-apply"
             href="${job.link}"
             target="_blank">
             Lamar Sekarang
          </a>

        </div>
      </div>
    `;
  });
}
