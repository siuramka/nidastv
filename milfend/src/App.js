
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
              <Route exact path="/test" element={<VideoGrid/>}/>
          </Routes>
        </Layout>
    </ThemeProvider>
  );
}