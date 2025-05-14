import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const NotFoundSec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 72px;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundSec>
      <img src="./img/notFound.svg" alt="" />
      <Box
        sx={{
          display: "flex",
          justifyItems: "center",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            background: "#6200EE",
            color: "white",
            paddingY: "10px",
            paddingX: "64px",
          }}
          onClick={() => navigate("/books")}
        >
          Go Home Page
        </Button>
        <Button
          sx={{
            background: "white",
            border: 1,
            borderColor: "#6200EE",
            color: "#6200EE",
            paddingY: "10px",
            paddingX: "64px",
          }}
          onClick={() => window.location.reload()}
        >
          Reload Page
        </Button>
      </Box>
    </NotFoundSec>
  );
}

export default NotFound;
