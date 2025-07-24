const express = require('express');
const  {handleUserGet}= require('../controllers/user')


const router = express.Router();

router.post("/", handleUserGet);


module.exports = router;