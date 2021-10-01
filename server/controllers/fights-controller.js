const express = require('express');
const router = express.Router();
const { Fight } = require("../models");

router.get('/recent-fights', async(req, res) => {
    try {
        let fights = await Fight.getRecentEvent();
        res.status(200).json(fights);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;