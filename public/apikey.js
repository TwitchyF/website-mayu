// Saat halaman dimuat, load API keys yang ada
document.addEventListener('DOMContentLoaded', loadApiKeys);

async function loadApiKeys() {
  const response = await fetch('/api/keys');  // Fetch data dari server
  const data = await response.json();
  const apikeyList = document.getElementById('apikey-list');
  
  // Hapus daftar sebelumnya
  apikeyList.innerHTML = '';
  
  // Render API keys ke dalam <ul>
  data.keys.forEach(key => {
    const li = document.createElement('li');
    li.textContent = key;

    // Tombol hapus untuk setiap API key
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
    deleteButton.onclick = () => deleteApiKey(key);

    li.appendChild(deleteButton);
    apikeyList.appendChild(li);
  });
}

// Fungsi untuk menambahkan API key
async function addApiKey() {
  const apikeyInput = document.getElementById('apikey');
  const key = apikeyInput.value.trim();
  
  if (!key) {
    alert('Please enter an API key');
    return;
  }

  // Kirim data API key ke server untuk ditambahkan
  const response = await fetch('/api/keys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key })
  });

  if (response.ok) {
    apikeyInput.value = ''; // Reset input setelah berhasil
    loadApiKeys(); // Perbarui daftar API key
  } else {
    const data = await response.json();
    alert(data.message);
  }
}

// Fungsi untuk menghapus API key
async function deleteApiKey(key) {
  const response = await fetch('/api/keys', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key })
  });

  if (response.ok) {
    loadApiKeys(); // Perbarui daftar setelah penghapusan
  } else {
    const data = await response.json();
    alert(data.message);
  }
}