const API = "https://smart-url-backend.onrender.com/api";

async function shorten() {
  const originalUrl = document.getElementById("urlInput").value;
  const customCode = document.getElementById("customCode").value;
  const expiryDate = document.getElementById("expiryDate").value;

  const res = await fetch(`${API}/urls/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ originalUrl, customCode, expiryDate })
  });

  const data = await res.json();

  document.getElementById("result").innerHTML = `
    <a href="${data.url.shortUrl}" target="_blank">${data.url.shortUrl}</a>
<button onclick="copyLink('${data.url.shortUrl}')">Copy</button>
  `;

  fetchAll();
}

function copyLink(link) {
  navigator.clipboard.writeText(link);
  alert("Copied!");
}

async function fetchAll() {
  const res = await fetch(`${API}/urls`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
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