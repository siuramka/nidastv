import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import Hls from 'hls.js'
import { getChat } from '../api/getChat'
import { get7TVEmotes } from '../api/get7TVEmotes'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { CardMedia, Grid } from '@mui/material';
let admins = require('../api/testChat.json');



export function StreamVod() {
  const { path } = useParams();
  const [error, setError] = useState(true)
  const [videoTimeSeconds, setVideoTimeSeconds] = useState(0);
  const [parsedChat, setParsedChat] = useState([])
  const chat = useRef([])
  const emojiList = useRef([])
  const videoRef = useRef();
  const bottomChatRef = useRef(null)
  let url = "https://cloud.nidas.tv/hls/" + path + ".av1" + "/output.m3u8"
  let url_ios = "https://cloud.nidas.tv/hls/" + path + ".av1" + "/output.m3u8"


  const timeUpdate = (event) => {
    const currentTime = event.target.currentTime
    const seconds = Math.round(currentTime)
    if (videoTimeSeconds != seconds)
      setVideoTimeSeconds(seconds)
  }

  const seekedUpdate = (event) => {
    const currentTime = event.target.currentTime

    setParsedChat([])
    const seconds = Math.round(currentTime)
    if (videoTimeSeconds != seconds)
      setVideoTimeSeconds(seconds)

  }
  var loadVid = function () {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.attachMedia(videoRef.current);
      hls.once(Hls.Events.MEDIA_ATTACHED, (event, data) => {
        hls.loadSource(url);
      })
      hls.on(Hls.Events.ERROR, function (event, data) {
        setError(false)
      });
    }
  }

  //initial load
  useEffect(() => {
    getChat()
      .then(items => {
        chat.current = admins
      })
    get7TVEmotes()
      .then(items => {
        emojiList.current = items
      })
    loadVid()
  }, []);

  const getEmojiFromName = (name) => {
    return emojiList.current.find((emoji) => emoji.name === name)
  }


  //do: when twitch inserts image they combine words into single element while no emoji present 
  // https://u//uixweb.netlify.app/ definitely not the T's front end

  const getChatMessageComponents = (chatObject) => {
    const words = chatObject.message.split(' ')
    return words.map(word => {
      let foundEmoji = getEmojiFromName(word)
      if (foundEmoji != null) {
        return (
          //ie emoji changes line height 
          //stonko FIX THIS 
          <Box sx={{ pr: 0.5 }} > 
            <img width={32} height={32} src={foundEmoji.urls[0][1]}></img>
          </Box>
        )
      } else {
        return <Box sx={{ pr: 0.5 }}>{word}</Box>
      }
    });
  }

  const getChatComponents = (chatObjectArray) => {
    return chatObjectArray.map(chatEntry => {
      const usernameComponent = getChatUsernameComponent(chatEntry)
      const messageComponents = getChatMessageComponents(chatEntry)
      return [usernameComponent, ...messageComponents]
    });
  }


  const getChatUsernameComponent = (chatObject) => {
    let name = chatObject.user_name
    let nameColor = chatObject.user_color
    return (<Box sx={{ pr: 0.5 }} color={nameColor}>{name}:</Box>)
  }
  //for chat
  useEffect(() => {
    const currentChatMessages = chat.current.filter((entr) => entr.time == videoTimeSeconds)
    if (currentChatMessages.length > 0) {
      setParsedChat([...parsedChat, ...getChatComponents(currentChatMessages)])
    }

  }, [videoTimeSeconds]) // here put the parameter to listen

  useEffect(() =>{
    bottomChatRef.current?.scrollIntoView({behavior: 'auto'});
  },[parsedChat])
  
  // preload images ?? 
  return (
    <Grid container spacing={2}>
      <Grid item lg={10}>
        <CardMedia
          ref={videoRef}
          component="video"
          onSeeked={(event) => { (seekedUpdate(event)) }}
          onTimeUpdate={(event) => { timeUpdate(event) }}
          controls
        />
      </Grid>
      <Grid item lg={2}>
        <List sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          maxWidth: 'auto',
          maxHeight: '100vh',//why tf 100% doesnt do the same
          overflow: 'auto'
        }}>
          {parsedChat.map((value, index) => (
            <ListItem key={index} sx={{ pl:0, fontSize:14, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>{value}</ListItem>
          ))}
          <ListItem key={"bottom"} ref={bottomChatRef}></ListItem>
        </List>
      </Grid>
    </Grid>
  )
}
//
//https://github.com/video-dev/hls.js/issues/4354