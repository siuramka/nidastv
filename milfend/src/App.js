
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
import { StreamVod } from './pages/StreamVod';

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
              <Route path="*" element={<>none</>} />
              <Route path="/vod/:path" element={<StreamVod/>}/>
          </Routes>
        </Layout>
        <Routes>
        </Routes>
    </ThemeProvider>
  );
}
//check if vod exists