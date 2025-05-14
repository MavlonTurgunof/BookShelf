import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Input,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import Container from "./Container";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DivSection = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 24px;
`;

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <DivSection>
            <Typography variant="h6" color="white">
              <img src="./img/logo.svg" alt="" />
            </Typography>

            <Box
              mt={3}
              mb={3}
              sx={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img src="./img/search-refraction.svg" alt="" />
              <Input
                placeholder="Search books..."
                sx={{ color: "#FEFEFE", width: "264px" }}
              />
            </Box>
          </DivSection>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src="./img/notification.svg" alt="" />
            <Box
              sx={{
                background: "linear-gradient(180deg, #884CB2, #FD648E)",
                padding: "3px",
                borderRadius: "50%",
                display: "inline-block",
              }}
            >
              <IconButton onClick={handleClick} sx={{ padding: 0 }}>
                <Avatar
                  src="/user.png"
                  alt="User"
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => navigate("/sign-in")}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
