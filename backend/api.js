const express = require("express")
const axios = require('axios');
const app = express()

let emoji7TVCache = []
let timerMs = 60 * 60 * 1 * 1000// 1h
const startTimeMs = Date.now()
let nextRefreshMs = startTimeMs
nextRefreshMs += timerMs
app.get("/7tv", async (req, res, next) => {
    if (emoji7TVCache.length === 0 || Date.now() > nextRefreshMs) {
        nextRefreshMs = Date.now() + timerMs
        //console.log("new")
        try {
            const response = await axios('https://7tv.io/v2/users/nidas/emotes');
            emoji7TVCache = response.data
            res.status(200).json(emoji7TVCache);
        } catch (err) {
            res.status(500).send()
        }
    } else {
        //console.log("old")
        res.json(emoji7TVCache);
    }
});

let twitchEmojiCache = []
app.get("/tv", async (req, res, next) => {
    const response = await axios('https://api.twitch.tv/helix/chat/emotes/global', {headers: {
        'Client-ID': '6htpczwh90c094ly67coajfxwvtc4h',
        'Authorization': 'Bearer' + ' ' + 'o1ftkmglmamti4dpbz4eanafclr1kz'
    }});
    res.json(response.data)
});
app.get("/tv/subs", async (req, res, next) => {
    const response = await axios('https://api.twitch.tv/helix/chat/emotes?broadcaster_id=138907338', {headers: {
        'Client-ID': '6htpczwh90c094ly67coajfxwvtc4h',
        'Authorization': 'Bearer' + ' ' + 'o1ftkmglmamti4dpbz4eanafclr1kz'
    }});
    res.json(response.data)
});
app.listen(3000)