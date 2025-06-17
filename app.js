// app.js

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  const body = document.body;
  const isDark = body.dataset.theme === "dark";
  body.dataset.theme = isDark ? "light" : "dark";
});

const toast = document.getElementById("toast-warning");
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}

function updateLinks(e) {
  e.preventDefault();
  const input = document.getElementById("search").value.trim();
  if (!input) {
    showToast("Please enter a valid IP, URL, or hash.");
    return;
  }
  showToast(`✅ Tools updated with: ${input}`);
  // Placeholder: Apply to links if needed
}

document.getElementById("filter").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = [...section.querySelectorAll(".card a")].some((a) =>
      a.textContent.toLowerCase().includes(value)
    ) ? "block" : "none";
  });
});

document.getElementById("filter").addEventListener("dblclick", () => {
  document.getElementById("filter").value = "";
  document.querySelectorAll(".section").forEach((s) => (s.style.display = "block"));
});

function loadTools() {
  const raw = document.getElementById("tools-data").textContent;
  const data = JSON.parse(raw);
  const container = document.getElementById("content");

  Object.entries(data).forEach(([category, tools]) => {
    const section = document.createElement("div");
    section.className = "section";

    const title = document.createElement("h2");
    title.textContent = category;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "grid";

    tools.forEach(({ name, url, desc }) => {
      const card = document.createElement("div");
      card.className = "card";

      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = name;

      const p = document.createElement("p");
      p.textContent = desc;

      card.append(link, p);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

window.addEventListener("DOMContentLoaded", loadTools);
