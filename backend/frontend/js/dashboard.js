const API_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

// Check if user is logged in
if (!token) {
    window.location.href = 'index.html';
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

// Load URLs on page load
document.addEventListener('DOMContentLoaded', () => {
    loadUrls();

    // Create short URL
    document.getElementById('url-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const originalUrl = document.getElementById('original-url').value;
        const customAlias = document.getElementById('custom-alias').value;

        try {
            const response = await fetch(`${API_URL}/urls/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    originalUrl,
                    customAlias: customAlias || undefined
                })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage(`Short URL created: ${data.url.shortUrl}`, 'success');
                document.getElementById('url-form').reset();
                loadUrls();
            } else {
                showMessage(data.error || 'Failed to create URL', 'error');
            }
        } catch (error) {
            showMessage('Error creating URL', 'error');
        }
    });
});

async function loadUrls() {
    try {
        const response = await fetch(`${API_URL}/urls`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            const tbody = document.getElementById('urls-tbody');
            tbody.innerHTML = '';

            if (data.urls.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5">No URLs created yet</td></tr>';
                return;
            }

            data.urls.forEach(url => {
                const createdDate = new Date(url.createdAt).toLocaleDateString();
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${url.originalUrl}</td>
          <td>${url.shortCode}</td>
          <td>${url.clicks}</td>
          <td>${createdDate}</td>
          <td>
            <div class="action-buttons">
              <button class="copy-btn" onclick="copyToClipboard('${url.shortCode}')">Copy</button>
              <button class="delete-btn" onclick="deleteUrl('${url._id}')">Delete</button>
            </div>
          </td>
        `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        showMessage('Failed to load URLs', 'error');
    }
}

function copyToClipboard(shortCode) {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortUrl).then(() => {
        showMessage('Copied to clipboard!', 'success');
    });
}

async function deleteUrl(id) {
    if (!confirm('Are you sure you want to delete this URL?')) return;

    try {
        const response = await fetch(`${API_URL}/urls/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            showMessage('URL deleted successfully', 'success');
            loadUrls();
        } else {
            showMessage('Failed to delete URL', 'error');
        }
    } catch (error) {
        showMessage('Error deleting URL', 'error');
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('url-message');
    messageDiv.textContent = message;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.className = '';
    }, 3000);
}
