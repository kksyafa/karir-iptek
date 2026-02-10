const SHEET_URL = "https://opensheet.elk.sh/1x5CgXBRZertwKa5ZVp3DqlvyXYCAxEVCyKJMt8-dPMY/Lowongan";

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => renderJobs(data));

function renderJobs(data) {
  const container = document.getElementById("job-list");
  container.innerHTML = "";

  data.forEach(job => {
    container.innerHTML += `
      <div class="job-card horizontal">
        <img src="${job.gambar}" class="job-thumb">

        <div class="job-content">
          <h3>${job.posisi}</h3>
          <p class="job-desc">${job.deskripsi}</p>

          <div class="job-meta">
            <span>${job.lokasi}</span>
            <span>${job.tipe}</span>
          </div>

          <a href="#" class="btn-apply">Lamar Sekarang</a>
        </div>
      </div>
    `;
  });
}
<div class="job-card">
  <img src="gambar.jpg" class="job-thumb">

  <div class="job-content">
    <span class="badge active">Aktif</span>

    <h3>Desainer Grafis</h3>
    <p class="job-desc">Deskripsi singkat lowongan kerja...</p>

    <div class="job-meta">
      <span>Full Time</span>
      <span>Tangerang Selatan</span>
    </div>

    <div class="job-action">
      <a href="#" class="btn-apply">Lamar Sekarang</a>
    </div>
  </div>
</div>

