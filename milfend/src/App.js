import './App.css';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import VideoList from './api/VideoList';
import { getList } from './api/getVideos'


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
    <div>
      <Button variant="contained">Hello World</Button>
      <ul>
        {list.map(item => <li>{item.name} {item.size}</li>)}
      </ul>
    </div>
  );
}