const axios = require('axios');


async function turboseek(query) {
  try {
    // Request untuk mendapatkan sumber informasi
    const res = await axios.post("https://www.turboseek.io/api/getSources", {
      question: query
    }, {
      headers: {
        "content-type": "application/json"
      }
    });

    // Cek apakah respon berhasil
    if (res.status !== 200) {
      throw new Error(`Error fetching sources: ${res.status}`);
    }

    // Request untuk mendapatkan jawaban menggunakan sumber yang telah didapatkan
    const response = await axios.post("https://www.turboseek.io/api/getAnswer", {
      question: query,
      sources: res.data.sources // Mengambil sumber dari respon sebelumnya
    }, {
      headers: {
        "content-type": "application/json"
      }
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching answer: ${response.status}`);
    }

    // Return hasil jawaban
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

module.exports = turboseek