const API = "http://localhost:5000/api";

async function shorten() {
  const originalUrl = document.getElementById("urlInput").value;
  const customCode = document.getElementById("customCode").value;
  const expiryDate = document.getElementById("expiryDate").value;

  const res = await fetch(`${API}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl, customCode, expiryDate })
  });

  const data = await res.json();

  document.getElementById("result").innerHTML = `
    <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>
    <button onclick="copyLink('${data.shortUrl}')">Copy</button>
  `;

  fetchAll();
}

function copyLink(link) {
  navigator.clipboard.writeText(link);
  alert("Copied!");
}

async function fetchAll() {
  const res = await fetch(`${API}/all`);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(url => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${url.originalUrl} → ${url.shortCode}
      (Clicks: ${url.clicks})
    `;
    list.appendChild(li);
  });
}

fetchAll();