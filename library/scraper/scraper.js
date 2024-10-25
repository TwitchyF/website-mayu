const axios = require('axios');
const cheerio = require('cheerio');

async function soundCloudSearch(query) {
  try {
    const ress = await axios.get(`https://m.soundcloud.com/search?q=${query}`);
    const $ = cheerio.load(ress.data);

    const results = $('div.Cell_Cell__1utfG > a.Cell_CellLink__3yLVS').map((i, el) => {
      const url = $(el).attr('href');
      const hasil = "https://m.soundcloud.com" + url;

      const title = $(el).find('div.Information_CellTitle__2KitR').text().trim();
      const creator = $(el).find('div.Information_CellSubtitle__1mXGx').text().trim();
      const metadataLabels = $(el).find('div.Metadata_MetadataLabel__3GU8Y');

      const views = metadataLabels.eq(0).text().trim();
      const duration = metadataLabels.eq(1).text().trim();
      const uploadDate = metadataLabels.eq(2).text().trim();

      return {
        url: hasil,
        title,
        creator,
        views,
        duration,
        uploadDate
      };
    }).get();

    return results;
  } catch (error) {
    console.error("Error fetching data from SoundCloud:", error.message);
    throw error;
  }
}

/*
*SUMBER = https://whatsapp.com/channel/0029VamzFetC6ZvcD1qde90Z*
*CREATED BY SELL DON'T DELETE WM*
*REQUEST: Haidar*
*/

async function danboru(tags) {
  const ress = await axios.get(`https://danbooru.donmai.us/posts?tags=${tags}+&z=5`);
  const $ = cheerio.load(ress.data);
  
  const result = $('article.post-preview.post-preview-fit-compact.post-preview-180').map((i, el) => {
    const title = $(el).attr('data-tags');
    const url = "https://danbooru.donmai.us" + $(el).find('a.post-preview-link').attr('href');
    const url_img_srcset = $(el).find('picture > source').attr('srcset');
    const srcsetArray = url_img_srcset.split(',');
    const img2 = srcsetArray[1].trim().split(' ')[0];

    return { 
      title,
      url,
      img2
    };
  }).get();
  
  return result;
}

async function cody(message) {
  try {
    return await new Promise(async(resolve, reject) => {
      if(!message) return reject("missing message input!");
      axios.post("https://cody.md/api/chat/init", null, {
        headers: {
          cookie: "identityId=us-east-1:cb37616b-3195-cceb-4cf1-f75d3d93b0c8; secretAccessKey=DWcWnaaEUtPD1pyIp1bXEiJrp5hkDoFH21WnrHoL7; accessKeyId=ASIA4WN3BNMY7J5QN5F6;"
        }
      }).then(res => {
        const token = res.data.token;
        if(!token) return reject("bearer token not found!");
        axios.post("https://api.cody.md/ask", {
          input: message,
          files: [],
          profile: {
            country: "ID"
          }
        }, {
          headers: {
            authorization: token
          }
        }).then(res => {
          const body = res.data;
          if(!body) return reject("failed get response!");
          return resolve({
            success: true,
            answer: body
          })
        }).catch(e  => reject(e.response))
      }).catch(e  => reject(e.response))
    });
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}

async function gemini(options) {
  try {
    return await new Promise(async(resolve, reject) => {
      options = {
        model: "gemini-pro",
        messages: options?.messages,
        temperature: options?.temperature || 0.9,
        top_p: options?.top_p || 0.7,
        top_k: options?.top_p || 40,
      }
      if(!options?.messages) return reject("missing messages input payload!");
      if(!Array.isArray(options?.messages)) return reject("invalid array in messages input payload!");
      if(isNaN(options?.top_p)) return reject("invalid number in top_p payload!");
      if(isNaN(options?.top_k)) return reject("invalid number in top_k payload!");
      axios.post("https://api.acloudapp.com/v1/completions", options, {
        headers: {
          authorization: "sk-9jL26pavtzAHk9mdF0A5AeAfFcE1480b9b06737d9eC62c1e"
        }
      }).then(res => {
        const data = res.data;
        if(!data.choices[0].message.content) return reject("failed get response message!")
        resolve({
          success: true,
          answer: data.choices[0].message.content
        })
      }).catch(reject)
    })
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}

async function gemini2(question) {
  try {
    const options = {
      messages: [
        { role: "system", content: "Kamu adalah seorang ahli vtuber bernama kero" },
        { role: "user", content: question }
      ],
      temperature: 0.3,  // Default setting
      top_p: 0.9,        // Default setting
      top_k: 40          // Default setting
    };

    // Mengirim request ke API Gemini
    const res = await axios.post('https://api.aicloudapp.com/v1/completions', options, {
      headers: {
        authorization: 'Bearer sk-gjL25paytAZhk9mdFOA5AaAFcE1409b9b06737d9c6eC21e',  // Ganti dengan token kamu
        'content-type': 'application/json'
      }
    });

    // Memastikan respons berhasil
    if (res.status !== 200) {
      throw new Error('Failed to fetch data from Gemini API');
    }

    const data = res.data;

    // Cek apakah ada hasil dari jawaban
    if (!data.choices[0].message.content) {
      throw new Error('Failed to get response message');
    }

    return {
      success: true,
      answer: data.choices[0].message.content
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      success: false,
      message: 'Failed to fetch data from Gemini API',
      error: error.message
    };
  }
}


async function chatgpt(messages, prompt = "Be a helpful assistant") {
  try {
    return await new Promise((resolve, reject) => {
      if (!messages) return reject("failed reading undefined messages!");
      if (!Array.isArray(messages)) return reject("invalid array messages input");

      axios.post("https://chatbot-jl1z.onrender.com/chatbot-jl1z", {
        messages: [
          { content: prompt },
          ...messages
        ]
      }).then(res => {
        if (!res.data?.choices[0]?.message)
          return reject("failed to get ai response!");

        resolve({
          success: true,
          answer: res.data.choices[0].message.content
        });
      }).catch(reject);
    });
  } catch (e) {
    return {
      success: false,
      errors: [e]
    };
  }
}

const model = [
    "yanzgpt-revolution-25b-v3.0", // Default
    "yanzgpt-legacy-72b-v3.0" // Pro
];

exports.YanzGPT = (query, model) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(model)    	
      const response = await axios("https://yanzgpt.my.id/chat", {
        data: {
          query: query,
          model: model
        },
        headers: {
          "authorization": "Bearer yzgpt-sc4tlKsMRdNMecNy",        	
          "Content-Type": "application/json"
        },
        method: "POST"
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};


module.exports = { soundCloudSearch, danboru, cody, gemini, gemini2, chatgpt }