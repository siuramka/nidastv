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
  const [currentVideoTimeConst, setCurrentVideoTimeConst] = useState('0');
  const [lastIndex, setLastIndex] = useState(0);
  const [lastJsonTimeEntry, setLastJsonTimeEntry] = useState(0);
  const [filteredC, setFilteredC] = useState([]);
  const chat = useRef([])
  const videoRef = useRef();
  let url = "https://cloud.nidas.tv/hls/" + path + ".av1" + "/output.m3u8"
  let url_ios = "https://cloud.nidas.tv/hls/" + path + ".av1" + "/output.m3u8"


  const timeUpdate = (event) => {
    const currentTime = event.target.currentTime
    setCurrentVideoTimeConst(currentTime);
    const roundedTime = Math.round(currentTime)
    if(lastIndex != roundedTime)
      setLastIndex(roundedTime)
  }

  const seekedUpdate = (event) => {
    const currentTime = event.target.currentTime

    setFilteredC([])
    const roundedTime = Math.round(currentTime)
    if(lastIndex != roundedTime)
      setLastIndex(roundedTime)

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
    const fl = chat.current.filter((entr) => entr.time == lastIndex)
    if(fl != null){
      setFilteredC([...filteredC, ...fl])
    }
    ///append to list
    setLastJsonTimeEntry(fl.time)
},[lastIndex]) // here put the parameter to listen


    //FixedSizeList
  return (<>
    <><div>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {filteredC.map((value, index) => (
        <ListItem key={value.time+index}>
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
