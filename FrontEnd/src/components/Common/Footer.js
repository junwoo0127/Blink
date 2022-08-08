import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// https://mui.com/material-ui/getting-started/templates/
// 에서 Sign In 참고

function Footer(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.notion.so/ssafy7seoul/SSAFINITE-a638940f46c24d6188f060b26568776e"
      >
        SSAFINTE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Footer;
