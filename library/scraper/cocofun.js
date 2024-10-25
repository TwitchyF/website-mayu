const axios = require('axios');
const cheerio = require('cheerio');

async function cocofun(url) {
  try {
    const response = await axios({
      url: url,
      method: "get",
      headers: {
        Cookie: "client_id=1a5afdcd-5574-4cfd-b43b-b30ad14c230e",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
      }
    });

    let json;
    const $ = cheerio.load(response.data);
    const res = $("script#appState").get();

    for (let i of res) {
      if (i.children && i.children[0] && i.children[0]?.data) {
        let ress;
        try {
          ress = i.children[0].data.split("window.APP_INITIAL_STATE=")[1];
          json = JSON.parse(ress);
        } catch (error) {
          console.error('JSON parsing error:', error);
          continue; // lanjutkan ke iterasi berikutnya
        }

        const result = {
          status: 200,
          topic: json.share.post.post.content || json.share.post.post.topic.topic,
          caption: $("meta[property='og:description']").attr("content"),
          play: json.share.post.post.playCount,
          like: json.share.post.post.likes,
          share: json.share.post.post.share,
          duration: json.share.post.post.videos[json.share.post.post.imgs[0]?.id].dur,
          thumbnail: json.share.post.post.videos[json.share.post.post.imgs[0]?.id].coverUrls[0],
          watermark: json.share.post.post.videos[json.share.post.post.imgs[0]?.id].urlwm,
          no_watermark: json.share.post.post.videos[json.share.post.post.imgs[0]?.id].url
        };

        return result;
      }
    }
  } catch (error) {
    console.error('Request error:', error);
    throw error; // lempar kesalahan untuk ditangani di handler
  }
}
module.exports = cocofun