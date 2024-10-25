require('../settings')
const express = require('express')
var isUrl = require("is-url")
var favicon = require('serve-favicon');
var path = require('path');
var fetch = require('node-fetch')
const axios = require('axios')
const isImageURL = require('image-url-validator').default
const { fetchJson, runtime, getBuffer } = require('../library/functions')
const { set } = require('lodash')
var router = express.Router()
const canvafy = require("canvafy");
let kc = require('knights-canvas');
let ch = require('canvas-hikki');

const textpro = require('../library/textpro')
const photooxy = require('../library/photooxy')
const text2image = require('../library/scraper/text2image')
const spotify = require('../library/scraper/spotify')
const cocofun = require('../library/scraper/cocofun')
const tiktok = require('../library/scraper/tiktok')
const turboseek = require('../library/scraper/turboseek')
const llama = require('../library/scraper/llama')

const { soundCloudSearch, danboru, cody, gemini, gemini2, chatgpt } = require('../library/scraper/scraper')

const stableDiff = require('../library/scraper/stable-diffusion')

/*       
]=====> MESSAGE <=====[
*/


readApiKeys = ['xZiyy']

// function

let accessToken = null;
let refreshToken = null;




// Middleware untuk refresh token jika expired
async function checkToken(req, res, next) {
  try {
    if (!accessToken) {
      // Register/sign up pengguna baru dan dapatkan token
      const signUpResponse = await llama.signUp();
      accessToken = signUpResponse.idToken;
      refreshToken = signUpResponse.refreshToken;
    } else {
      // Jika token sudah expired, refresh token
      const refreshResponse = await llama.refreshToken(refreshToken);
      accessToken = refreshResponse.id_token;
      refreshToken = refreshResponse.refresh_token;
    }
    next();
  } catch (error) {
    res.status(500).send('Gagal mengakses token. Coba lagi nanti!');
  }
}

//





router.get('/canvas/welcome1', async (req, res) => {
            pp = req.query.pp,
            nama = req.query.nama,
	        namagc = req.query.namagc,
	        ppgc = req.query.ppgc,
            bg = req.query.bg,
            member = req.query.member
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
            if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
            if (!namagc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter namagc"})
            if (!ppgc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ppgc"})
            if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
            if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
            const Welcome1 = await new kc.Welcome()
            .setAvatar(pp)
            .setUsername(nama)
            .setGuildName(namagc)
            .setGuildIcon(ppgc)
            .setBackground(bg)
            .setMemberCount(member)
            .toAttachment();
            data = Welcome1.toBuffer();
            await fs.writeFileSync(__path +'/database/welcome1.png', data)
            res.sendFile(__path+'/database/welcome1.png')
            .catch(e => {
         	res.json(loghandler.error)
            })
            })
// goodbye 1
 router.get('/canvas/goodbye1', async (req, res) => {
            pp = req.query.pp,
            nama = req.query.nama,
      	    namagc = req.query.namagc,
    	    ppgc = req.query.ppgc,
            bg = req.query.bg,
            member = req.query.member
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
            if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
            if (!namagc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter namagc"})
            if (!ppgc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ppgc"})
            if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
            if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
            const Goodbye1 = await new kc.Goodbye()
            .setAvatar(pp)
            .setUsername(nama)
            .setGuildName(namagc)
            .setGuildIcon(ppgc)
            .setBackground(bg)
            .setMemberCount(member)
            .toAttachment();
            data = Goodbye1.toBuffer();
            await fs.writeFileSync(__path +'/database/goodbye1.png', data)
            res.sendFile(__path+'/database/goodbye1.png')
            .catch(e => {
         	res.json(loghandler.error)
            })
            })
// welcome 2
router.get('/canvas/welcome2', async (req, res) => {
            pp = req.query.pp,
            nama = req.query.nama,
            bg = req.query.bg,    
	        namagc = req.query.namagc,
            member = req.query.member
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
            if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
            if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
            if (!namagc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter namagc"})
            if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
            let Welcome2 = await new ch.Welcome2()
            .setAvatar(pp)
            .setUsername(nama)
            .setBg(bg)
            .setGroupname(namagc)
            .setMember(member)
            .toAttachment()
            data = Welcome2.toBuffer();
            await fs.writeFileSync(__path +'/database/welcome2.png', data)
            res.sendFile(__path+'/database/welcome2.png')
            .catch(e => {
         	res.json(loghandler.error)
            })
            })
// goodbye 2
router.get('/canvas/goodbye2', async (req, res) => {
            pp = req.query.pp,
            nama = req.query.nama,
            bg = req.query.bg,    
            member = req.query.member
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
            if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
            if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
            if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
            let Goodbye2 = await new ch.Goodbye2()
            .setAvatar(pp)
            .setUsername(nama)
            .setBg(bg)
            .setMember(member)
            .toAttachment()
            data = Goodbye2.toBuffer();
            await fs.writeFileSync(__path +'/database/goodbye2.png', data)
            res.sendFile(__path+'/database/goodbye2.png')
            .catch(e => {
         	res.json(loghandler.error)
            })
            })
// welcome 3
/*
router.get('/canvas/welcome3', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param name'})
            if (!req.query.msg) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param msg'})
            if (!req.query.mem) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param memer'})
            if (!req.query.picurl) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param picturl'})
            if (!req.query.bgurl) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param bgurl'})
            const welcomer33 = await new ds.Welcome()
            .setAvatar(req.query.picurl)
            .setUsername(`${req.query.name}#${req.query.mem}`)
            .setBackground("BACKGROUND", req.query.bgurl)   
            //or : .setBackground("COLOR", "#ff5555")   
            .setMainText("Welcome")
            .setSecondText(req.query.msg)
          
            .setCircleColor("#ff5555")
            .setMainTextColor("#ff5555")
            .setSecondTextColor("#ff5555")
            .setPseudoColor("#ff5555")
            
            .toWelcome()                 
            const base64 = `${welcomer33.toBuffer().toString('base64')}`                
            buffer = Buffer.from(base64, 'base64')               
            res.type('png');               
            res.send(buffer)
            })
// goodbye 3
router.get('/canvas/goodbye3', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param name'})
            if (!req.query.msg) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param msg'})
            if (!req.query.mem) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param memer'})
            if (!req.query.picurl) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param picturl'})
            if (!req.query.bgurl) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param bgurl'})
            const welcomer3 = await new ds.Welcome()
            .setAvatar(req.query.picurl)
            .setUsername(`${req.query.name}#${req.query.mem}`)
            .setBackground("BACKGROUND", req.query.bgurl)
            //or : .setBackground("COLOR", "#ff5555")
            .setMainText("Goodbye")
            .setSecondText(req.query.msg)
            
            .setCircleColor("#ff5555")
            .setMainTextColor("#ff5555")
            .setSecondTextColor("#ff5555")
            .setPseudoColor("#ff5555") 
            
            .toWelcome()                 
            const base64 = `${welcomer3.toBuffer().toString('base64')}`             
            buffer = Buffer.from(base64, 'base64')               
            res.type('png');               
            res.send(buffer)
            })
router.get('/canvas/welcome4', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: 404, error: 'masukkan param name'})
            if (!req.query.mem) return res.json({ status: 404, error: 'masukkan param mem'})
            if (!req.query.gcname) return res.json({ status: 404, error: 'masukkan param gcname'})
            if (!req.query.picurl) return res.json({ status: 404, error: 'masukkan param picurl'})
            if (!req.query.bgurl) return res.json({ status: 404, error: 'masukkan param bgurl'})
            const welcomer4 = await new dds.Welcome()
                    
            .setUsername(req.query.name)
                    
            .setDiscriminator(req.query.mem)
            .setMemberCount(req.query.mem)
            .setGuildName(req.query.gcname)
                    
            .setAvatar(req.query.picurl)
                   
            .setColor('border', '#00100C')
                    
            .setColor('username-box', '#00100C')
                    
            .setColor('discriminator-box', '#00100C')
                    
            .setColor('message-box', '#00100C')
                    
            .setColor('title', '#00FFFF')
                    
            .setBackground(req.query.bgurl)
                    
            .toAttachment()
                
            const base64 = `${welcomer4.toBuffer().toString('base64')}`
                
            buffer = Buffer.from(base64, 'base64')
               
            res.type('png');
            res.send(buffer)
        
            })
router.get('/canvas/goodbye4', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: 404, error: 'masukkan param name'})
            if (!req.query.mem) return res.json({ status: 404, error: 'masukkan param mem'})
            if (!req.query.gcname) return res.json({ status: 404, error: 'masukkan param gcname'})
            if (!req.query.picurl) return res.json({ status: 404, error: 'masukkan param picurl'})
            if (!req.query.bgurl) return res.json({ status: 404, error: 'masukkan param bgurl'})
            const Goodbye4 = await new dds.Goodbye()
                    
            .setUsername(req.query.name)
                    
            .setDiscriminator(req.query.mem)
            .setMemberCount(req.query.mem)
            .setGuildName(req.query.gcname)
                    
            .setAvatar(req.query.picurl)
                   
            .setColor('border', '#00100C')
                    
            .setColor('username-box', '#00100C')
                    
            .setColor('discriminator-box', '#00100C')
                    
            .setColor('message-box', '#00100C')
                    
            .setColor('title', '#00FFFF')
                    
            .setBackground(req.query.bgurl)
                    
            .toAttachment()
                
            const base64 = `${Goodbye4.toBuffer().toString('base64')}`
                
            bufferqq = Buffer.from(base64, 'base64')
               
            res.type('png');
            res.send(bufferqq)
        
            })
*/
router.get('/canvas/welcome5', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: 404, error: 'masukkan param name'})
            if (!req.query.bg) return res.json({ status: 404, error: 'masukkan param bg'})
            const welcomer5 = await new ch.Welcome3()
                    
            .setUsername(req.query.name)
            .setAvatar(req.query.bg)
            .toAttachment()
                
            const base64 = `${welcomer5.toBuffer().toString('base64')}`
                
            buffer = Buffer.from(base64, 'base64')
               
            res.type('png');
            res.send(buffer)
        
            })
router.get('/canvas/goodbye5', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: 404, error: 'masukkan param name'})
            if (!req.query.bg) return res.json({ status: 404, error: 'masukkan param bg'})
            const god5 = await new ch.Goodbye3()
                    
            .setUsername(req.query.name)
            .setAvatar(req.query.bg)
            .toAttachment()
                
            const base64 = `${god5.toBuffer().toString('base64')}`
                
            buffer = Buffer.from(base64, 'base64')
               
            res.type('png');
            res.send(buffer)
        
            })
// promote 1
router.get('/canvas/promote1', async (req, res) => {
            pp = req.query.pp,
            nama = req.query.nama,
	        namagc = req.query.namagc,
     	    ppgc = req.query.ppgc,
            bg = req.query.bg,
            member = req.query.member
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
            if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
            if (!namagc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter namagc"})
            if (!ppgc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ppgc"})
            if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
            if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
            const Promote = await new kc.Promote()
            .setAvatar(pp)
            .setUsername(nama)
            .setGuildName(namagc)
            .setGuildIcon(ppgc)
            .setBackground(bg)
            .setMemberCount(member)
            .toAttachment();
            data = Promote.toBuffer();
            await fs.writeFileSync(__path +'/database/promote.png', data)
            res.sendFile(__path+'/database/promote.png')
            .catch(e => {
         	res.json(loghandler.error)
            })
            })
// demote 1
router.get('/canvas/demote1', async (req, res) => {
            pp = req.query.pp,
            nama = req.query.nama,
     	    namagc = req.query.namagc,
	        ppgc = req.query.ppgc,
            bg = req.query.bg,
            member = req.query.member
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
            if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
            if (!namagc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter namagc"})
            if (!ppgc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ppgc"})
            if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
            if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
            const Demote = await new kc.Demote()
            .setAvatar(pp)
            .setUsername(nama)
            .setGuildName(namagc)
            .setGuildIcon(ppgc)
            .setBackground(bg)
            .setMemberCount(member)
            .toAttachment();
            data = Demote.toBuffer();
            await fs.writeFileSync(__path +'/database/demote.png', data)
            res.sendFile(__path+'/database/demote.png')
            .catch(e => {
         	res.json(loghandler.error)
            })
            })
/*
// promote 2
router.get('/canvas/promote2', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param name'})
            if (!req.query.msg) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param msg'})
            if (!req.query.mem) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param memer'})
            if (!req.query.picurl) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param picturl'})
            if (!req.query.bgurl) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param bgurl'})
            const promot2 = await new ds.Welcome()   
            .setAvatar(req.query.picurl)
            .setUsername(`${req.query.name}#${req.query.mem}`)
            .setBackground("BACKGROUND", req.query.bgurl)
            //or : .setBackground("COLOR", "#ff5555")
            .setMainText("Promote")    
            .setSecondText(req.query.msg)
           
            .setCircleColor("#ff5555")
            .setMainTextColor("#ff5555")    
            .setSecondTextColor("#ff5555")    
            .setPseudoColor("#ff5555")    
            
            .toWelcome()                 
            const base64 = `${promot2.toBuffer().toString('base64')}`             
            buffer = Buffer.from(base64, 'base64')               
            res.type('png');               
            res.send(buffer)
            })
// demote 2
            router.get('/canvas/demote2', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param name'})
            if (!req.query.msg) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param msg'})
            if (!req.query.mem) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param memer'})
            if (!req.query.picurl) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param picturl'})
            if (!req.query.bgurl) return res.json({ status: false, creator : `${creator}`, message: 'masukkan param bgurl'})
            const demot2 = await new ds.Welcome()
            .setAvatar(req.query.picurl)
            .setUsername(`${req.query.name}#${req.query.mem}`)
            .setBackground("BACKGROUND", req.query.bgurl)
            //or : .setBackground("COLOR", "#ff5555")
            .setMainText("Demote")
            .setSecondText(req.query.msg)
           
            .setCircleColor("#ff5555")
            .setMainTextColor("#ff5555")
            .setSecondTextColor("#ff5555")
            .setPseudoColor("#ff5555")
           
            .toWelcome()              
            const base64 = `${demot2.toBuffer().toString('base64')}`           
            buffer = Buffer.from(base64, 'base64')               
            res.type('png');               
            res.send(buffer)
            })*/
 router.get('/canvas/verification1', async (req, res) => {
            pp = req.query.pp,
            nama = req.query.nama,
      	    namagc = req.query.namagc,
    	    ppgc = req.query.ppgc,
            bg = req.query.bg,
            member = req.query.member
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
            if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
            if (!namagc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter namagc"})
            if (!ppgc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ppgc"})
            if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
            if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
            const Verification1 = await new kc.Verification()
            .setAvatar(pp)
            .setUsername(nama)
            .setGuildName(namagc)
            .setGuildIcon(ppgc)
            .setBackground(bg)
            .setMemberCount(member)
            .toAttachment();
            data = Verification1.toBuffer();
            await fs.writeFileSync(__path +'/database/Verification1.png', data)
            res.sendFile(__path+'/database/Verification1.png')
            .catch(e => {
         	res.json(loghandler.error)
            })
            })
/*
router.get('/canvas/verification2', async (req, res, next) => {
            if (!req.query.name) return res.json({ status: 404, error: 'masukkan param name'})
            if (!req.query.mem) return res.json({ status: 404, error: 'masukkan param mem'})
            if (!req.query.gcname) return res.json({ status: 404, error: 'masukkan param gcname'})
            if (!req.query.picurl) return res.json({ status: 404, error: 'masukkan param picurl'})
            if (!req.query.bgurl) return res.json({ status: 404, error: 'masukkan param bgurl'})
            const verification2 = await new dds.Verification()
                    
            .setUsername(req.query.name)
                    
            .setDiscriminator(req.query.mem)
            .setMemberCount(req.query.mem)
            .setGuildName(req.query.gcname)
                    
            .setAvatar(req.query.picurl)
                   
            .setColor('border', '#00100C')
                    
            .setColor('username-box', '#00100C')
                    
            .setColor('discriminator-box', '#00100C')
                    
            .setColor('message-box', '#00100C')
                    
            .setColor('title', '#00FFFF')
                    
            .setBackground(req.query.bgurl)
                    
            .toAttachment()
                
            const base64 = `${verification2.toBuffer().toString('base64')}`
                
            bufferqq = Buffer.from(base64, 'base64')
               
            res.type('png');
            res.send(bufferqq)
        
            })
*/


// level
router.get('/canvas/level', async (req, res) => {
            pp = req.query.pp,
            nama = req.query.nama,
            bg = req.query.bg,
            needxp = req.query.needxp,
            currxp = req.query.currxp,
            level = req.query.level,
            logorank = req.query.logorank   
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
            if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
            if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
            if (!needxp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter needxp"})
            if (!currxp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter currxp"})
            if (!level) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter level"})
            if (!logorank) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter logorank"})    
            var level = await new ch.Rank()
            .setAvatar(`${pp}`) 
            .setUsername(`${nama}`) 
            .setBg(`${bg}`)
            .setNeedxp(`${needxp}`) 
            .setCurrxp(`${currxp}`) 
            .setLevel(`${level}`) 
            .setRank(`${logorank}`) 
            .toAttachment();
            data = level.toBuffer();
            await fs.writeFileSync(__path +'/database/rank.png', data)
            res.sendFile(__path +'/database/rank.png')
            .catch(e => {
           	res.json(loghandler.error)
            })
            })
// levelup
router.get('/canvas/levelup', async (req, res, next) => {
            pp = req.query.pp
            if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})       
            var levelup = await new ch.Up()
            .setAvatar(`${pp}`)
            .toAttachment();
            data = levelup.toBuffer();
            await fs.writeFileSync(__path +'/database/sup.png', data)
            res.sendFile(__path +'/database/sup.png')
            .catch(e => {
          	res.json(loghandler.error)
            })
            })







// Endpoint untuk SoundCloud Search
router.get('/soundcloud/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is missing' });
  }
  try {
    const results = await soundCloudSearch(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// err
// Endpoint untuk Danbooru
router.get('/danbooru/search', async (req, res) => {
  const tags = req.query.tags;
  if (!tags) {
    return res.status(400).json({ error: 'Tags parameter is missing' });
  }
  try {
    const results = await danboru(tags);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/cody', async (req, res) => {
  const { message } = req.query;  // Mengambil parameter "message" dari URL

  if (!message) {
    return res.status(400).json({
      success: false,
      message: 'Message query parameter is required!'
    });
  }

  try {
    const result = await cody(message);  // Menggunakan fungsi cody yang sudah ada
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Cody API',
      error: error.message
    });
  }
});

router.post('/ai/llama', checkToken, async (req, res) => {
  const userInput = req.query.text || req.body.text;
  const modelId = req.query.model || req.body.model;

  try {
    const response = await llama.chatllama(accessToken, userInput, modelId);
    res.json(response);
  } catch (error) {
    res.status(500).send('Gagal mendapatkan respons dari chat API.');
  }
});

// Endpoint untuk mendapatkan daftar model yang tersedia
router.get('/models', (req, res) => {
  res.json(llama.llamaModels());
});


// Endpoint untuk Gemini (default settings)
router.post('/gemini', async (req, res) => {
  const options = req.body;
  try {
    const result = await gemini(options);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk Gemini2 (dengan pertanyaan)
router.post('/gemini2', async (req, res) => {
  const question = req.body.question;
  if (!question) {
    return res.status(400).json({ error: 'Question is missing' });
  }
  try {
    const result = await gemini2(question);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/ai/chatgpt', async (req, res) => {
  const { prompt, messages } = req.body;

  // Validasi input
  if (!prompt || !messages) {
    return res.status(400).json({
      success: false,
      message: 'Prompt atau messages tidak ada.'
    });
  }

  try {
    const result = await chatgpt(messages, prompt);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data dari ChatGPT',
      error: error.message
    });
  }
});

router.get('/ai/gpt', async (req, res) => {
  const question = req.query.question;

  // Validasi input
  if (!question) {
    return res.status(400).json({
      success: false,
      message: 'Pertanyaan tidak ada dalam request.'
    });
  }

  try {
    const result = await askChatGpt(question);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data dari ChatGPT',
      error: error.message
    });
  }
});

// Router untuk menangani permintaan pertanyaan melalui GET
router.get('/ai/gemini2', async (req, res) => {
  const question = req.query.question;  // Ambil pertanyaan dari query string

  // Validasi input
  if (!question) {
    return res.json({ success: false, message: 'Question is missing' });
  }

  try {
    const result = await gemini2(question);  // Panggil fungsi gemini dengan pertanyaan
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Route untuk API Gemini Pro
router.post('/post/gemini', async (req, res) => {
    const { messages, temperature, top_p, top_k } = req.body;

    // Cek apakah data yang diperlukan sudah ada
    if (!messages) {
        return res.status(400).json({
            success: false,
            message: 'Missing messages input payload'
        });
    }

    // Opsi default untuk Gemini
    const options = {
        messages: messages,
        temperature: temperature || 0.3,   // Gunakan nilai default jika tidak disediakan
        top_p: top_p || 0.9,               // Gunakan nilai default jika tidak disediakan
        top_k: top_k || 40                 // Gunakan nilai default jika tidak disediakan
    };

    try {
        // Panggil fungsi gemini untuk mendapatkan data
        const result = await gemini(options);

        // Kirim respons ke klien
        res.json({
            success: true,
            answer: result
        });
    } catch (error) {
        // Penanganan error
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data from Gemini API',
            error: error.message
        });
    }
});


// Router untuk menerima permintaan
router.get('/turboseek', async (req, res) => {
  const query = req.query.q; // Mengambil query dari parameter URL
  const apikey = req.query.apikey; // Menangkap API Key jika diperlukan

  // Validasi input
  if (!query) {
    return res.status(400).json({ status: false, message: "Query is missing" });
  }
    if (!readApiKeys.includes(apikey)) {
    return res.json(loghandler.notapikey)
  }
  


  try {
    if (readApiKeys.includes(apikey)) {
    const result = await turboseek(query); // Memanggil fungsi turboseek
    res.json({
      status: true,
      creator: `${creator}`, // Ganti dengan nama Anda
      result: result
    });
      } else {
    res.json({ status: false, message: 'Invalid API Key' });
  }
  } catch (error) {
    res.status(500).json({ status: false, message: "Error fetching data", error: error.message });
  }
});

router.get('/ai/stable-diffusion', async (req, res) => {
  const prompt = req.query.prompt;
  const negative = req.query.negative || ""; // opsional
  const apikey = req.query.apikey;
  // Validasi API key
  if (!readApiKeys.includes(apikey)) {
    return res.json(loghandler.notapikey)
  }

  // Validasi prompt
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const result = await stableDiff(prompt, negative);
res.json({
status: true,
creator: `${creator}`,
result: result
})
  } catch (error) {
    return res.status(500).json({ message: "Error generating image", error });
  }
});

router.get('/dl/cocofundl', async (req, res) => {
  const url = req.query.url;
  const apikey = req.query.apikey;

  if (!url) return res.json({ status: false, message: 'URL is missing' });
  if (!apikey) return res.json({ status: false, message: 'API Key is missing' });

  if (readApiKeys.includes(apikey)) {
    try {
      const result = await cocofun(url);
      res.json({
        status: true,
        creator: `${creator}`,
        result: result
      });
    } catch (e) {
      res.json({ status: false, message: 'Error', error: e.message });
    }
  } else {
    res.json({ status: false, message: 'Invalid API Key' });
  }
});

router.get('/dl/tiktok', async (req, res) => {
  var url = req.query.url;
  var apikey = req.query.apikey;

  if (!url) return res.json({ status: false, message: 'URL is missing' });
  if (!apikey) return res.json({ status: false, message: 'API Key is missing' });

  if (readApiKeys.includes(apikey)) {
    try {
      let result = await tiktok(url);
      res.json({
        status: true,
        creator: `${creator}`,
        result: result
      });
    } catch (e) {
      res.json({ status: false, message: 'Error', error: e });
    }
  } else {
    res.json({ status: false, message: 'Invalid API Key' });
  }
});

router.get('/dl/spotify', async (req, res, next) => {
   var url = req.query.url;
   var apikey = req.query.apikey;

   if (!url) return res.json({ status: false, message: "url or name song is missing" });
   if (!apikey) return res.json({ status: false, message: "API Key is missing" });

   if (readApiKeys.includes(apikey)) {
      let result = await spotify(url);
      res.json({
         status: true,
         creator: `${creator}`,
         result: result
      });
   } else {
      res.json({ status: false, message: "Invalid API Key" });
   }
});

router.get('/downloader/igdl', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)  
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://widipe.com/download/igdl?url=${url}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})

router.get('/downloader/ytplay', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://widipe.com/download/ytdl?url=${q}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result.mp3
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/ytsearch', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=${lolkey}&query=${q}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/ytmp3', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://widipe.com/download/ytdl?url=${url}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result.mp3
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/downloader/ytmp4', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://widipe.com/download/ytdl?url=${url}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result.mp4
})
} else {
res.json(loghandler.notapikey)
}
})


// - STALKER MENU - \\
router.get('/stalker/instagram', async (req, res, next) => {
var username = req.query.username
var apikey = req.query.apikey
if (!username) return res.json(loghandler.notusername)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://saipulanuar.ga/api/stalk/ig?username=${username}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/stalker/tiktok', async (req, res, next) => {
var username = req.query.username
var apikey = req.query.apikey
if (!username) return res.json(loghandler.notusername)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://saipulanuar.ga/api/download/tiktokstalk?username=${username}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/stalker/npm', async (req, res, next) => {
var username = req.query.username
var apikey = req.query.apikey
if (!username) return res.json(loghandler.notusername)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://saipulanuar.ga/api/stalk/npm?username=${username}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/stalker/freefire', async (req, res, next) => {
var id = req.query.id
var apikey = req.query.apikey
if (!id) return res.json(loghandler.notid)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://saipulanuar.ga/api/stalk/epep?id=${id}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/stalker/mobilelegend', async (req, res, next) => {
var id = req.query.id
var server = req.query.server
var apikey = req.query.apikey
if (!id) return res.json(loghandler.notid)
if (!server) return res.json(loghandler.notserver)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://saipulanuar.ga/api/stalk/ml?id=${id}&server=${server}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})


// - ISLAMIC MENU - \\
router.get('/islamic/jadwalsholat', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/sholat/${q}?apikey=${lolkey}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/islamic/kisahnabi', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/kisahnabi/${q}?apikey=${lolkey}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/islamic/niatsholat', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/niatsholat/${q}?apikey=${lolkey}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/islamic/ayat', async (req, res, next) => {
var surah = req.query.surah
var ayat = req.query.ayat
var apikey = req.query.apikey
if (!surah) return res.json(loghandler.notsurah)
if (!ayat) return res.json(loghandler.notayat)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/quran/${surah}/${ayat}?apikey=${lolkey}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/islamic/surah', async (req, res, next) => {
var surah = req.query.surah
var apikey = req.query.apikey
if (!surah) return res.json(loghandler.notsurah)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){  
let anu = await fetchJson(`https://api.lolhuman.xyz/api/quran/${surah}?apikey=${lolkey}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/islamic/ayat-audio', async (req, res, next) => {
var surah = req.query.surah
var ayat = req.query.ayat
var apikey = req.query.apikey
if (!surah) return res.json(loghandler.notsurah)
if (!ayat) return res.json(loghandler.notayat)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/quran/audio/${surah}/${ayat}?apikey=${lolkey}`)
res.set({'Content-Type': 'audio/mp3'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/islamic/surah-audio', async (req, res, next) => {
var surah = req.query.surah
var apikey = req.query.apikey
if (!surah) return res.json(loghandler.notsurah)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/quran/audio/${surah}?apikey=${lolkey}`)
res.set({'Content-Type': 'audio/mp3'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})


// - SEARCH MENU - \\
router.get('/search/cuaca', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/cuaca/${q}?apikey=${lolkey}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/search/jadwaltv', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/jadwaltv/${q}?apikey=${lolkey}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/search/cekresi', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/checkresi?apikey=${lolkey}&resi=${q}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/search/pinterest', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.botcahx.biz.id/api/search/pinterest?text=${q}&apikey=Admin`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/search/pinterest-video', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/pinterestvideo?apikey=${lolkey}&url=${url}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/search/brainly', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let anu = await fetchJson(`https://api.lolhuman.xyz/api/brainly?apikey=${lolkey}&query=${q}`)
res.json({
status: true,
creator: `${creator}`,
result: anu.result
})
} else {
res.json(loghandler.notapikey)
}
})


// - MAKER MENU - \\
router.get('/maker/attp', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/attp2?apikey=${lolkey}&text=${q}`)
res.set({'Content-Type': 'image/webp'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/ttp', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/ttp?apikey=${lolkey}&text=${q}`)
res.set({'Content-Type': 'image/webp'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/carbon', async (req, res, next) => {
var q = req.query.q
var language = req.query.language
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!language) return res.json(loghandler.notlanguage)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/carbon?apikey=${lolkey}&code=${q}&language=${language}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/meme', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/meme1?apikey=${lolkey}&text=${q}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/meme2', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/meme4?apikey=${lolkey}&text=${q}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/meme3', async (req, res, next) => {
var q = req.query.q
var apikey = req.query.apikey
if (!q) return res.json(loghandler.notq)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/meme5?apikey=${lolkey}&text=${q}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/meme4', async (req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/meme2?apikey=${lolkey}&text1=${text1}&text2=${text2}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/meme5', async (req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/meme7?apikey=${lolkey}&text1=${text1}&text2=${text2}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/meme6', async (req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/meme8?apikey=${lolkey}&text1=${text1}&text2=${text2}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/meme7', async (req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var text3 = req.query.text3
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!text3) return res.json(loghandler.nottext3)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/meme3?apikey=${lolkey}&text1=${text1}&text2=${text2}&text3=${text3}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})
router.get('/maker/meme8', async (req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var text3 = req.query.text3
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!text3) return res.json(loghandler.nottext3)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://api.lolhuman.xyz/api/meme6?apikey=${lolkey}&text1=${text1}&text2=${text2}&text3=${text3}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})


// - TEXT PRO MENU - \\
router.get('/textpro/grunge', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){ 
textpro("https://textpro.me/grunge-metallic-3d-text-effect-online-1115.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/typography', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){ 
textpro("https://textpro.me/create-artistic-typography-online-1086.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/gradient-neon-light', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-gradient-neon-light-text-effect-online-1085.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/white-gold', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/elegant-white-gold-3d-text-effect-online-free-1070.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/light-glow-sliced', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/glowing-neon-light', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/deep-sea', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/metallic', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-a-metallic-text-effect-free-online-1041.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/transformer', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){ 
textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/thunder', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/thunder2', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-thunder-text-effect-online-881.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/neon-light-text', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/matrix', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/matrix-style-text-effect-online-884.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/neon-text', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/neon-text-effect-online-879.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/road-warning', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){ 
textpro("https://textpro.me/road-warning-text-effect-878.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/bokeh', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/bokeh-text-effect-876.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/advanced-glow', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/free-advanced-glow-text-effect-873.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/break-wall', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/break-wall-text-effect-871.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/blackpink', async(req, res, next) => {
var text = req.query.text
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/blackpink2', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/blackpink3', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-a-blackpink-logo-decorated-with-roses-online-free-1080.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/blackpink4', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-blackpink-style-logo-effects-online-1079.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/blackpink5', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-blackpink-s-born-pink-album-theme-logo-online-1092.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/glitch', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/pornhub', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/marvel-studio', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/marvel-studio2', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-logo-style-marvel-studios-ver-metal-972.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/avengers-logo', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-3d-avengers-logo-online-974.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/textpro/thor-logo', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
textpro("https://textpro.me/create-thor-logo-style-text-effect-online-1064.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})


// - PHOTOOXY MENU - \\
router.get('/photooxy/dark-metal', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/elegant-3d-neon-dark-metal-text-effect-online-free-416.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/white-stone', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/shadow', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/white-cube', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/3d-text-effect-under-white-cube-217.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/gradient', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/gradient-avatar-text-effect-207.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/fur-text', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/fur-text-effect-generator-198.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/flaming', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/scary-cemetery', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/text-on-scary-cemetery-gate-172.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/harry-potter', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/3d-wood', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/3d-wood-text-black-style-182.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/illuminated-metallic', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/put-your', async(req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey
if (!text) return res.json(loghandler.nottext)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html", [text]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})
router.get('/photooxy/8-bit', async(req, res, next) => {
var text1 = req.query.text1
var text2 = req.query.text2
var apikey = req.query.apikey
if (!text1) return res.json(loghandler.nottext1)
if (!text2) return res.json(loghandler.nottext2)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
photooxy("https://photooxy.com/logo-and-text-effects/8-bit-text-on-arcade-rift-175.html", [text1,text2]).then((data) =>{ 
res.set({'Content-Type': 'image/jpg'})
res.send(data)
})
.catch((err) =>{
res.json(loghandler.error)
})
} else {
res.json(loghandler.notapikey)
}
})


// - TOOLS MENU - \\
router.get('/tools/ssweb', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey
if (!url) return res.json(loghandler.noturl)
if (!apikey) return res.json(loghandler.notapikey)
if(readApiKeys.includes(apikey)){
let result = await getBuffer(`https://saipulanuar.ga/api/download/ssweb?url=${url}`)
res.set({'Content-Type': 'image/jpg'})
res.send(result)
} else {
res.json(loghandler.notapikey)
}
})

module.exports = router
