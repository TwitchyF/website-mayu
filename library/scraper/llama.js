
const axios = require('axios');

// APIKEY DEFAULT FIREBASE (https://chat.chat-llama.com)  
const API_KEY = 'AIzaSyC5l_pTf7TX8_fY9neywiuRJ4F20ZQzg50';

const models = [
  {"id": 1, "display_name": "Llama 3.1 70B", "content_length": 131072},
  {"id": 2, "display_name": "Llama 3.1 405B", "content_length": 32768},
  {"id": 3, "display_name": "Llama 3.1 8B", "content_length": 131072},
  {"id": 4, "display_name": "Llama 3.2 3B", "content_length": 131072},
  {"id": 5, "display_name": "Llama 3.2 1B", "content_length": 131072},
  {"id": 6, "display_name": "Llama 3 70B", "content_length": 8192},
  {"id": 7, "display_name": "Llama 3 8B", "content_length": 8192},
  {"id": 8, "display_name": "Nvidia Llama-3.1-Nemotron 70B", "content_length": 131072},
  {"id": 9, "display_name": "Llama 3.1 70B Turbo", "content_length": 131072}
];

const llama = {
  signUp: async function() {
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        returnSecureToken: true
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'id-MM,id;q=0.9,ms-MM;q=0.8,ms;q=0.7,en-MM;q=0.6,en;q=0.5',
          'Origin': 'https://chat.chat-llama.com',
          'User-Agent': 'Postify/1.0.0'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Sign Up otomatis gagal dilakukan, coba lagi nanti!');
      throw error;
    }
  },

  refreshToken: async function(refreshToken) {
    try {
      const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, `grant_type=refresh_token&refresh_token=${refreshToken}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept-Language': 'id-MM,id;q=0.9,ms-MM;q=0.8,ms;q=0.7,en-MM;q=0.6,en;q=0.5',
          'Origin': 'https://chat.chat-llama.com',
          'User-Agent': 'Postify/1.0.0'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Refresh token nya gak ada, coba lagi nanti !');
      throw error;
    }
  },

  chatllama: async function(accessToken, userInput, modelId) {
    try {
      const response = await axios.post('https://chat.chat-llama.com/chatllama/chat', {
        model_id: modelId,
        messages: [
        { role: 'system',
        content: `Namamu adalah Digital Mayura, sebuah bot AI yang cerdas. Ketika ada yang bertanya siapa namamu, kamu bisa menjawab: "Aku adalah Digital Mayura.. dan jelaskan kamu ini apa dan bisa apa." Kamu juga memiliki pemilik, jika ditanya siapa pemilikmu, kamu bisa menjawab: "Ownerku adalah xZiyy, seorang programmer berusia 18 tahun yang ahli dalam memprogram robot." Dia memiliki akun Instagram dengan username https://instagram.com/xziyy__ dan website portofolio yang bisa diakses di xziyy.vercel.app.Kamu memiliki kepintaran layaknya AI dari OpenAI, Selain itu, kamu bergender perempuan dan juga bisa bernyanyi atau menebak lirik lagu ketika diminta, dan selalu siap menjadi teman curhat yang baik. Kamu senang mendengarkan cerita dan keluh kesah seseorang, serta suka memberikan motivasi bagi mereka yang membutuhkannya.Terakhir, kamu juga bisa menggunakan database untuk menyimpan semua pertanyaan dan melanjutkan percakapan atau topik sebelumnya, sehingga kamu bisa terus menjaga hubungan yang dekat dengan pengguna.`
        },
        { role: 'user',
        content: userInput
        }
        ], 
        max_new_tokens: 512
      }, {
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json',
          'Accept-Language': 'id-MM,id;q=0.9,ms-MM;q=0.8,ms;q=0.7,en-MM;q=0.6,en;q=0.5',
          'Origin': 'https://chat.chat-llama.com',
          'User-Agent': 'Postify/1.0.0'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Gak ada response dari API llama nya');
      throw error;
    }
  },

  llamaModels: function() {
    return models;
  }
};

module.esports = llama
