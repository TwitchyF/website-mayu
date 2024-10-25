
const axios = require('axios')
async function spotify(q) {
   return new Promise(async (resolve) => {
      try {
         let json = await (await axios.post('https://api.ssspotify.buzz/v2/ajaxSearch', { q }, {
            headers: {
               "origin": "https://ssspotify.buzz",
               "referer": "https://ssspotify.buzz/",
               "user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
            }
         }
         )).data
         resolve(json)
      } catch (e) {
         console.log(e)
         return resolve({
            status: false
         })
      }
   })
}
/*
// https://www.npmjs.com/package/spotifydl-core?activeTab=readme
const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
const fs = require('fs-extra') 
// Initialization and Authentication 
const Spotify = require('spotifydl-core').default // Import the library 
const spotify = new Spotify({ // Authentication
    clientId: '-', // <-- add your own clientId 
    clientSecret: '-', // <-- add your own clientSecret 
})
/* To learn more about clientId and Secret  , 
visit https://developer.spotify.com/documentation/general/guides/app-settings/ 


// Declaring the respective url in 'links' object 
const links = {
    artist: 'https://open.spotify.com/artist/7ky9g1jEjCsjNjZbYuflUJ?si=2To3fmc-T9KuyyrQ-Qp5KQ', // Url of the artist you want to gather info about
    album: 'https://open.spotify.com/album/3u3WsbVPLT0fXiClx9GYD9?si=pfGAdL3VRiid0M3Ln_0DNg', // Url of the album you want to gather info about
    song: 'https://open.spotify.com/track/1Ub6VfiTXgyV8HnsfzrZzC?si=4412ef4ebd8141ab' // Url of the song you want to gather info about or download
};

// Engine 
(async () => {
    const data = await spotify.getTrack(links.song) // Waiting for the data 🥱
    console.log('Downloading: ', data.name, 'by:', data.artists.join(' ')) // Keep an eye on the progress
    const song = await spotify.downloadTrack(links.song) // Downloading goes brr brr 
    fs.writeFileSync('song.mp3', song) // Let's write the buffer to the woofer (i mean file, hehehe) 
})()
[20/10, 10:45 am] Hann‮‮: https://npm.io/package/spdl-core
[20/10, 10:48 am] Hann‮‮: https://www.npmjs.com/package/metascraper-spotify?activeTab=code
[20/10, 10:48 am] Hann‮‮: tuh module spotify downloader
*/
module.exports = spotify