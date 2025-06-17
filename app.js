let currentInput = "";

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  const isDark = document.body.dataset.theme === "dark";
  document.body.dataset.theme = isDark ? "light" : "dark";
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
  let anyVisible = false;
  document.querySelectorAll(".section").forEach((section) => {
    const matches = [...section.querySelectorAll(".card a")].some((a) =>
      a.textContent.toLowerCase().includes(value)
    );
    section.style.display = matches ? "block" : "none";
    if (matches) anyVisible = true;
  });

  const fallback = document.getElementById("no-results");
  if (!anyVisible) {
    if (!fallback) {
      const div = document.createElement("div");
      div.id = "no-results";
      div.textContent = "No matching tools found.";
      div.style.textAlign = "center";
      div.style.color = "var(--muted)";
      div.style.marginTop = "2rem";
      document.getElementById("content").appendChild(div);
    }
  } else if (fallback) {
    fallback.remove();
  }
});

document.getElementById("filter").addEventListener("dblclick", () => {
  document.getElementById("filter").value = "";
  document.querySelectorAll(".section").forEach((s) => (s.style.display = "block"));
  const fallback = document.getElementById("no-results");
  if (fallback) fallback.remove();
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

    tools.forEach(({ name, url, desc, skipSearch = false, template }) => {
      const card = document.createElement("div");
      card.className = "card";

      const link = document.createElement("a");

      let finalUrl = url;
      if (!skipSearch && currentInput) {
        const isIP = /^[\d.]+$/.test(currentInput);
        const encoded = encodeURIComponent(currentInput);
        const base64 = btoa(currentInput);

        if (name === "Grey Noise") {
          finalUrl = isIP
            ? `https://viz.greynoise.io/ip/${currentInput}`
            : `https://viz.greynoise.io/query/${currentInput}`;
        } else if (name === "Shodan") {
          finalUrl = isIP
            ? `https://www.shodan.io/host/${currentInput}`
            : `https://www.shodan.io/search?query=${encoded}`;
        } else if (template) {
          finalUrl = template.replace(/{{query}}/g, encoded);
        } else if (url.endsWith("/") || url.endsWith("=") || url.endsWith("?")) {
          finalUrl = url + encoded;
        } else if (url.includes("?") && !url.endsWith("&")) {
          finalUrl = url + "&" + encoded;
        } else {
          finalUrl = url + "/" + encoded;
        }
      }

      link.href = finalUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = skipSearch ? `🔶 ${name}` : name;

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
