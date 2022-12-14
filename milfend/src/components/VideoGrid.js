import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'
import { CardActionArea } from '@mui/material';
import { Grid, List } from '@mui/material';
import { VideoCard } from '../components/VideoCard'
import React, { useEffect, useState } from 'react';
import { getList } from '../api/getVideos'
const apiUrl = "https://cloud.nidas.tv/thumb.php?vod="
const apiStreamUrl = "https://cloud.nidas.tv/hls/"
export function VideoGrid() {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {

    let mounted = true;
    setIsLoading(true);
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
          setIsLoading(false);
        }
      })
    return () => mounted = false;
  }, [])
  return (
    <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 1, sm: 8, md: 16 }}>
      {list.map((item, index) => (
        <Grid item xs={1} sm={4} md={4} key={index}>
          <VideoCard title={item.name} thumbnail={apiUrl + item.name} url={ item.name.substr(0, item.name.length-4) }></VideoCard>
        </Grid>
      ))}
    </Grid>
  );
}
//font weight dun work