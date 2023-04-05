import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'
import { CardActionArea } from '@mui/material';

export function VideoCard(props) {
  const { thumbnail, title, url } = props;
  return (
    <Link overlay
      underline="none"
      href={"/vod/" + url}
      color="text.primary"
      sx={{ color: 'text.tertiary' }}>
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={thumbnail}
          />
          <CardContent>
            <Typography sx={{ fontSize: 'md' }}>{title}</Typography>
            <Typography fontWeight="lg" variant="body2" color="text.secondary">
              Nidas
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
//font weight dun work