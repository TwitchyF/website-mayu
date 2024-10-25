const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

// Fungsi download TikTok
function tiktok(url) {
  return new Promise((resolve, reject) => {
    axios.get('https://ttdownloader.com/')
      .then((response) => {
        const $ = cheerio.load(response.data);
        const cookie = response.headers['set-cookie'].join('');
        const dataPost = {
          url: url,
          format: '',
          token: $('#token').attr('value')
        };
        
        axios({
          method: 'POST',
          url: 'https://ttdownloader.com/search/',
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            origin: 'https://ttdownloader.com',
            referer: 'https://ttdownloader.com/',
            cookie
          },
          data: qs.stringify(dataPost)
        })
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const result = {
            no_wm: $('#results-list > div:nth-child(2) > div.download > a')?.attr('href'),
            wm: $('#results-list > div:nth-child(3) > div.download > a')?.attr('href')
          };
          resolve(result);
        })
        .catch(e => {
          reject({ status: false, message: 'Error fetching data', error: e.message });
        });
      })
      .catch(e => {
        reject({ status: false, message: 'Error fetching data', error: e.message });
      });
  });
}
module.exports = tiktok