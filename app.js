// app.js

let currentInput = "";

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
  currentInput = document.getElementById("search").value.trim();
  if (!currentInput) {
    showToast("Please enter a valid IP, URL, or hash.");
    return;
  }
  showToast(`✅ Tools updated with: ${currentInput}`);
  renderToolLinks();
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

let toolsData = {};

function loadTools() {
  const raw = document.getElementById("tools-data").textContent;
  toolsData = JSON.parse(raw);
  renderToolLinks();
}

function renderToolLinks() {
  const container = document.getElementById("content");
  container.innerHTML = "";

  Object.entries(toolsData).forEach(([category, tools]) => {
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
      link.href = url + encodeURIComponent(currentInput);
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
