import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'
import { CardActionArea } from '@mui/material';

export function VideoCard(props) {
    const { thumbnail, title } = props;
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea url="lol">
        <CardMedia
          component="img"
          height="100"
          image={thumbnail}
        />
        <Link overlay
            underline="none"
            href="#interactive-card"
            color="text.primary"
            sx={{ color: 'text.tertiary' }}>
            <CardContent>
                <Typography>{title}</Typography>
                <Typography fontWeight="lg" variant="body2" color="text.secondary">
                    Nidas
                </Typography>
            </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
//font weight dun work