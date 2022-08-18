import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonC = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#beaee2"),
  lineHeight: "44px",
  borderRadius: "30px",
  fontSize: "22px",
  padding: "9.5px 16px",
  backgroundColor: "#beaee2",
  "&:hover": {
    backgroundColor: "#beaee2",
  },
}));
// 재사용 적용안됨 보류
// {/* <Button1 sx={{ mb: 3 }}>  <b>로그인</b> </Button1>*/}

function Button1(props) {
  return (
    <ButtonC type="submit" fullWidth variant="contained">
      {" "}
    </ButtonC>
  );
}

export default Button1;
