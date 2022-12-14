import { Box, CssBaseline } from "@mui/material";
import {Container} from '@mui/material'
export default function Layout(props) {
    return (
        <>
            <CssBaseline />
            <Container>
                {props.children}
            </Container>
        </>
    );
  }