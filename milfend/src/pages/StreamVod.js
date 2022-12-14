import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js'
export function StreamVod() {
  const {path} = useParams();
  const mounted = useRef(false);
  let url = "https://cloud.nidas.tv/hls/"+ path + ".av1" +"/output.m3u8"
  useEffect(() => {
    mounted.current = true;
      if (Hls.isSupported()) {
        const hls = new Hls();
        console.log(url)
        const video = document.getElementById('my-video');
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      }
    return () => {
        mounted.current = false;
    };
}, []);

  return mounted ? (
    <video id="my-video" controls />
  ):(null);
}
// /https://github.com/CookPete/react-player/issues/699 IOS HLS fix but lmao fuck apple users fr fr
