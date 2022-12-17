import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import Hls from 'hls.js'
import { getChat } from '../api/getChat'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
export function StreamVod() {
  const { path } = useParams();
  const [error, setError] = useState(true)
  const [currentTime1, setCurrentTime1] = useState('0');
  const [lastIndex, setLastIndex] = useState(0);
  const chatMessagesCount = 10
  const [lastIndexEnd, setLastIndexEnd] = useState(chatMessagesCount);
  const [filteredC, setFilteredC] = useState([]);
  const chat = useRef([])
  const videoRef = useRef();
  let url = "https://cloud.nidas.tv/hls/" + path + ".av1" + "/output.m3u8"
  let url_ios = "https://cloud.nidas.tv/hls/" + path + ".av1" + "/output.m3u8"


  const timeUpdate = (event) => {
    const currentTime = event.target.currentTime
    setCurrentTime1(currentTime);
    if(currentTime >= lastIndexEnd){
      setLastIndexEnd(lastIndexEnd+chatMessagesCount)
      setLastIndex(lastIndex+chatMessagesCount)
    }
 
  }

  const seekedUpdate = (event) => {
    const currentTime = event.target.currentTime

    setFilteredC([])

    setCurrentTime1(currentTime);//need this ?
    setLastIndexEnd(currentTime+chatMessagesCount)
    setLastIndex(currentTime)
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

  useEffect(() => {
    getChat()
      .then(items => {
        chat.current = items
      })
    loadVid()
  }, []);

  useEffect(() => {
    console.log(lastIndex+ " state changed " + lastIndexEnd)
    const fl = filteredComments()
    console.log(fl)
    //filteredC max lenth, remove top
    setFilteredC([...filteredC, ...fl])
},[lastIndex, lastIndexEnd]) // here put the parameter to listen

  const filteredComments = () => {
    return chat.current.filter((comment) => (comment.time <= lastIndexEnd && comment.time >= lastIndex ));
  };

    //FixedSizeList
  return (<>
    <><div>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {filteredC.map((value) => (
        <ListItem
          key={value.time}
        >
          <ListItemText primary={`${value.user_name}: ${value.message}`} />
        </ListItem>
      ))}
    </List>
    </div></>
    <video ref={videoRef} width={1000} onSeeked={(event) => {(seekedUpdate(event))}} onTimeUpdate={(event) => { timeUpdate(event) }} controls />
  </>)
}
//onSeeked
// /https://github.com/CookPete/react-player/issues/699 IOS HLS fix but lmao fuck apple users fr fr
