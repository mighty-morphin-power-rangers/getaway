import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
 sx={{
    position: "fixed",
    bottom: 0,
    width: "100%",
    
    paddingTop: "3rem",
    paddingBottom: "2rem",
    marginTop: "2rem",
  }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} mb={2}>
            <Link href="#">
              <img
                src="https://i.ibb.co/xfDng3b/Screenshot-2023-05-01-214359.png"
                alt="GetaWay logo"
                height="35px"
              />
            </Link>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography color="textSecondary" variant="body2" align="center">
              &copy; {new Date().getFullYear()} GetaWay.com 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="body2" align="center">
              <Link href="#">Terms</Link> &bull; <Link href="#">Privacy</Link> &bull;{" "}
              <Link href="#">Contact</Link> &bull; <Link href="#">Help</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
