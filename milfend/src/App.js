
import { VideoGrid } from './components/VideoGrid'
import Layout from './Layout';
import {
  Router,
  Route,
  Switch,
  Link,
  useLocation,
  useNavigate,
  useParams,
  Routes,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { VideoPlayer } from './components/VideoPlayer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function MyApp() {
  return (
    <ThemeProvider theme={darkTheme}>
        <Layout>
          <Routes>
              <Route exact path="/" element={<VideoGrid/>}/>
          </Routes>
        </Layout>
        <Routes>
              <Route exact path="/vod/:path" element={<VideoPlayer/>}/>
        </Routes>
        {/* <Route path="*" element={<NoMatch />} /> */}
    </ThemeProvider>
  );
}