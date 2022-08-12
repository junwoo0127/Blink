import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = styled.img`
  width: 75px;
  display: { xs: "none", md: "flex" };
`;

const ToolbarComponent2 = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="false">
        <Toolbar
          disableGutters
          style={
            {
              // minHeight: "50px"
            }
          }
        >
          <Link to="/">
            <Logo
              src={logo}
              style={{
                marginRight: "10px",
              }}
            />
          </Link>
          {/* 방 제목  중앙 */}
          {/* 스피드다이얼로 표시 */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ToolbarComponent2;
