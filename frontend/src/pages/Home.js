import { Container } from "@mui/system";
import TopAppBar from "../components/TopAppBar";
import { VideoGrid } from "../components/VideoGrid";

export default function Home() {
    return (
        <>
        <TopAppBar></TopAppBar>
        <Container>
            <VideoGrid></VideoGrid>
        </Container>
        </>
    );
  }