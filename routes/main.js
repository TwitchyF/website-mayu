__path = process.cwd()

var express = require('express');
var router = express.Router();
const { runtime,fetchJson } = require('../library/functions')

router.get('/', (req, res) => {
    res.sendFile(__path + '/view/index.html')
})

router.get('/dashboard', (req, res) => {
    res.sendFile(__path + '/view/dashboard.html')
})

router.get('/about', (req, res) => {
    res.sendFile(__path + '/view/about.html')
})

router.get('/gallery', (req, res) => {
    res.sendFile(__path + '/view/gallery.html')
})


router.get('/status', async (req, res, next) => {
	let hits = await fetchJson('https://api.countapi.xyz/hit/api-bot.com/visitor')
	res.json({
	status: true,
	creator: `${creator}`,
	runtime: runtime(process.uptime()),
	visitor: hits.value,
	})
})


module.exports = router
