import './App.css';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Grid, List } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getList } from './api/getVideos'
import { VideoCard } from './components/VideoCard'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const apiUrl = "https://cloud.nidas.tv/thumb.php?vod="
export default function MyApp() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {list.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <VideoCard title={item.name} thumbnail={apiUrl+item.name}></VideoCard>
            </Grid>
            ))}
      </Grid>

      </Container>
    </ThemeProvider>
  );
}