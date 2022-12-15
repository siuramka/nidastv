import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js'

export function StreamVod() {
  const { path } = useParams();
  const [error, setError] = useState(true)
  const[currentTime1, setCurrentTime1] = useState('00:00');
  const videoRef = useRef();
  let url = "https://cloud.nidas.tv/hls/" + path + ".av1" + "/output.m3u8"


  const timeUpdate = (event) => {
    const currentTime = event.target.currentTime
    console.log(currentTime);
    setCurrentTime1(currentTime);
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
    loadVid()
  }, []);

  return error ? (<video ref={videoRef} width={1000} onTimeUpdate={(event) => {timeUpdate(event)} } controls />) : (<>wwwww</>)
}
// /https://github.com/CookPete/react-player/issues/699 IOS HLS fix but lmao fuck apple users fr fr
