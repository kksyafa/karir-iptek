const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAt9J7AvybjXHrFywSoxISryeTC6C3lBoZjzRdYdqpJgQG1zYTNV66mkQqKW099CML6hCg2doRvixA/pub?gid=0&single=true&output=csv";

fetch(SHEET_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split("\n").slice(1);
    const today = new Date();

    const jobs = rows.map(r => {
      const [posisi, unit, jenis, lokasi, deadline, link] = r.split(",");
      return { posisi, unit, jenis, lokasi, deadline, link };
    });

    render(jobs.filter(j => new Date(j.deadline) >= today), "active", false);
    render(jobs.filter(j => new Date(j.deadline) < today), "expired", true);
  });

function render(data, target, expired) {
  const el = document.getElementById(target);
  el.innerHTML = "";

  data.forEach(j => {
    el.innerHTML += `
      <div class="job-card ${expired ? "expired" : ""}">
        <span class="badge">${j.jenis}</span>
        <h3>${j.posisi}</h3>
        <div class="meta">${j.unit} • ${j.lokasi}</div>
        <div class="deadline">Deadline: ${j.deadline}</div>
        <a href="${j.link || "#"}" target="_blank">
          ${expired ? "Ditutup" : "Lamar Sekarang"}
        </a>
      </div>
    `;
  });
}
