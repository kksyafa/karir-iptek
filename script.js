const SHEET_URL = "https://opensheet.elk.sh/1x5CgXBRZertwKa5ZVp3DqlvyXYCAxEVCyKJMt8-dPMY/Lowongan";

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    const activeJobs = data.filter(job => job.status === "Aktif");
    renderJobs(activeJobs);
  })
  .catch(err => {
    document.getElementById("job-list").innerHTML =
      `<p class="empty">Gagal memuat data</p>`;
  });

function renderJobs(jobs) {
  const container = document.getElementById("job-list");
  container.innerHTML = "";

  if (!jobs.length) {
    container.innerHTML = `<p class="empty">Belum ada lowongan aktif</p>`;
    return;
  }

  jobs.forEach(job => {
    container.innerHTML += `
      <div class="job-card">
        <img class="job-thumb"
             src="${job.gambar || 'https://via.placeholder.com/120'}">

        <div class="job-content">
          <h3>${job.posisi}</h3>
          <p class="job-desc">${job.deskripsi}</p>

          <div class="job-meta">
            <span>${job.tipe}</span>
            <span>${job.lokasi}</span>
          </div>

          <a class="btn-apply" href="${job.link}" target="_blank">
            Lamar Sekarang
          </a>
        </div>
      </div>
    `;
  });
}
