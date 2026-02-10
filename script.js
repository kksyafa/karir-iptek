const SHEET_URL = "https://https://docs.google.com/spreadsheets/d/1x5CgXBRZertwKa5ZVp3DqlvyXYCAxEVCyKJMt8-dPMY/Lowongan";

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => renderJobs(data));

function renderJobs(data) {
  const container = document.getElementById("job-list");
  container.innerHTML = "";

  data.forEach(job => {
    container.innerHTML += `
      <div class="job-card">
        <img src="${job.gambar}" class="job-thumb">
        <div>
          <h3>${job.posisi}</h3>
          <p>${job.deskripsi}</p>
        </div>
      </div>
    `;
  });
}
