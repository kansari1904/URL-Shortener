const nanoid = require('nanoid')
const URL = require('../models/url')

async function handlePostGenerateURL(req, res) {
    const body = req.body;
    if(!body.url){
      return res.status(400).json({ error : "url required"})
    }
    const shortId = nanoid(8)
    
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.render('home',{
         id: shortId,
    });
}

async function handleGetRedirect(req, res){
    const shortId = req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    }, { $push :{
        visitHistory: {
            timestamp: Date.now(),
        },
    },
})
res.redirect(entry.redirectURL);
}


async function handleGetAnalytcs(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handlePostGenerateURL,
    handleGetRedirect,
    handleGetAnalytcs,
};