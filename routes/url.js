const express = require('express');
const {handlePostGenerateURL, handleGetAnalytcs, handleGetRedirect} = require('../controllers/url');

const router = express.Router();


router.post('/', handlePostGenerateURL);

router.get('/:shortId', handleGetRedirect )

router.get('/analytics/:shortId', handleGetAnalytcs)

module.exports=router;