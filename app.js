:root {
  --bg: #f8fafc;
  --text: #1e293b;
  --card-bg: #ffffff;
  --muted: #64748b;
  --primary: #0ea5e9;
  --primary-hover: #0284c7;
  --radius: 0.75rem;
  --gap: 1rem;
  --transition: 0.25s ease-in-out;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  --card-bg: #1e293b;
  --muted: #94a3b8;
  --primary: #38bdf8;
  --primary-hover: #0ea5e9;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  margin: 0;
  padding: var(--gap);
  transition: background var(--transition), color var(--transition);
}

header.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--gap) 0;
  border-bottom: 1px solid var(--muted);
}

.dashboard-title-wrapper {
  max-width: 60%;
}

.dashboard-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 0.5rem;
}

.dashboard-tooltip {
  background: var(--card-bg);
  border-left: 4px solid var(--primary);
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  font-size: 0.95rem;
  line-height: 1.6;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.toggle {
  font-size: 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--muted);
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  transition: background var(--transition);
}
.toggle:hover {
  background: var(--primary);
  color: white;
}

.search-bar,
.filter-bar {
  display: flex;
  gap: 0.5rem;
  margin: var(--gap) 0;
}

.search-bar input,
.filter-bar input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--muted);
  border-radius: var(--radius);
  font-size: 1rem;
  background: var(--card-bg);
  color: var(--text);
}

.search-bar button {
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition);
}
.search-bar button:hover {
  background: var(--primary-hover);
}

section {
  margin-top: 2rem;
}

h2 {
  font-size: 1.25rem;
  color: var(--primary);
  margin-bottom: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--gap);
}

.card {
  background: var(--card-bg);
  padding: var(--gap);
  border-radius: var(--radius);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  text-align: center;
  transition: all var(--transition);
  border: 1px solid transparent;
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

.card a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}
.card a:hover {
  color: var(--primary-hover);
}

.card p {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 0;
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.15);
  font-size: 0.95rem;
  z-index: 9999;
}

.hidden {
  display: none !important;
}

.footer {
  margin-top: 3rem;
  text-align: center;
  font-size: 0.95rem;
  padding: 1rem 0;
  border-top: 1px solid var(--muted);
  color: var(--muted);
}
