import React from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
//don't have safari to test this so prolly don work bro
// didint work w ipad user agent or smt

export function VideoPlayer() {
    let { path } = useParams();
    //Enables HLS for non safari users only
    const config = {
        file: {
          forceHLS: !isSafari
        }
      }
    return (
        <ReactPlayer config={config} controls={true} url={"https://cloud.nidas.tv/hls/"+ path + ".av1" +"/output.m3u8"} />
    );
}

// /https://github.com/CookPete/react-player/issues/699 IOS HLS fix but lmao fuck apple users fr fr