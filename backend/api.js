const express = require("express");
const axios = require("axios");
const redis = require("redis");

const app = express();
const port = process.env.PORT || 3000;

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`[Redis] : ${error}`));

  await redisClient.connect();
})();

async function fetchTwitchEmojisGlobal() {
  const apiResponse = await axios.get('https://api.twitch.tv/helix/chat/emotes/global', {
    headers: {
      'Client-ID': '6htpczwh90c094ly67coajfxwvtc4h',
      'Authorization': 'Bearer' + ' ' + 'o1ftkmglmamti4dpbz4eanafclr1kz'
    }
  })
  return apiResponse.data
}

/// broadcaster_id=138907338 is nidas user id
async function fetchTwitchEmojisSubscriber() {
  const apiResponse = await axios.get('https://api.twitch.tv/helix/chat/emotes?broadcaster_id=138907338', {
    headers: {
      'Client-ID': '6htpczwh90c094ly67coajfxwvtc4h',
      'Authorization': 'Bearer' + ' ' + 'o1ftkmglmamti4dpbz4eanafclr1kz'
    }
  })
  return apiResponse.data
}

async function fetch7TVUserEmojis() {
  const apiResponse = await axios('https://7tv.io/v2/users/nidas/emotes');
  return apiResponse.data
}

async function getTwitchEmojiSubscriberData(req, res) {
  let cacheKeyName = "TwitchEmojiSubscriber"
  let results;
  let isCached = false
  const cacheExpireSeconds = 3600 * 4;

  try {
    const cacheResults = await redisClient.get(cacheKeyName)
    if (cacheResults) {
      isCached = true
      results = JSON.parse(cacheResults)
    } else {
      results = await fetchTwitchEmojisGlobal()
      if (results.length === 0) {
        throw "Empty Twitch API response"
      }
      await redisClient.set(cacheKeyName, JSON.stringify(results), {
        EX: cacheExpireSeconds
      });
    }

    res.send({
      cached: isCached,
      data: results,
    });
  } catch (error) {
    console.error("[Twitch] " + error)
    res.status(404).send();
  }
}

async function getTwitchEmojiGlobalData(req, res) {
  let cacheKeyName = "TwitchEmojiGlobal"
  let results;
  let isCached = false
  const cacheExpireSeconds = 3600 * 8;

  try {
    const cacheResults = await redisClient.get(cacheKeyName)
    if (cacheResults) {
      isCached = true
      results = JSON.parse(cacheResults)
    } else {
      results = await fetchTwitchEmojisGlobal()
      if (results.length === 0) {
        throw "Empty Twitch API response"
      }
      await redisClient.set(cacheKeyName, JSON.stringify(results), {
        EX: cacheExpireSeconds
      });
    }

    res.send({
      cached: isCached,
      data: results,
    });
  } catch (error) {
    console.error("[Twitch] " + error)
    res.status(404).send();
  }
}

async function get7TVEmojiData(req, res) {
  let cacheKeyName = "7TV"
  let results;
  let isCached = false
  const cacheExpireSeconds = 3600;

  try {
    const cacheResults = await redisClient.get(cacheKeyName)
    if (cacheResults) {
      isCached = true
      results = JSON.parse(cacheResults)
    } else {
      results = await fetch7TVUserEmojis()
      if (results.length === 0) {
        throw "Empty 7TV API response"
      }
      await redisClient.set(cacheKeyName, JSON.stringify(results), {
        EX: cacheExpireSeconds
      });
    }

    res.send({
      cached: isCached,
      data: results,
    });
  } catch (error) {
    console.error("[7TV] " + error)
    res.status(404).send();
  }
}

app.get("/7tv", get7TVEmojiData);
app.get("/twitch/emoji/global", getTwitchEmojiGlobalData);
app.get("/twitch/emoji/subscriber", getTwitchEmojiSubscriberData);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});