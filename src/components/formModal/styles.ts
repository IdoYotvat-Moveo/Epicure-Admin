import { Box } from "@mui/material";
import styled from "styled-components";

export const StyledModal = styled(Box)`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 800px;
background-color: white;
border: 2px solid #000;
border-radius: 10px;
box-shadow: 24px;
padding: 32px;
`;