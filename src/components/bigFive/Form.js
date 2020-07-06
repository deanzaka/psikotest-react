import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  Button,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import BigFivePage from "./Page";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  box: {
    height: theme.spacing(8),
    justifyContent: "center",
    boxShadow:
      "0px 3px 3px -2px #A2DDFB, 0px 1px 1px -1px #A2DDFB, 0px 1px 3px -3px #A2DDFB",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: 1.5,
    width: "100%",
    color: theme.palette.primary.dark,
  },
  question: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  next: {
    marginTop: "4px",
    background: "linear-gradient(90deg, #714CD3 0%, #8E69EC 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
  },
  back: {
    marginBottom: "4px",
    background: "linear-gradient(90deg, #714CD3 0%, #8E69EC 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
  },
  finish: {
    marginTop: "4px",
    background: "linear-gradient(90deg, #F75291 0%, #FD81B1 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
  },
}));

const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  style: { width: "inherit", height: "16px" },
  borderColor: "text.primary",
};

const BigFiveForm = (props) => {
  const classes = useStyles();
  const template = useSelector((state) => state.bigFive.template);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [progress, setProgress] = React.useState(0);

  const onNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (template.doc.length > currentPage * 10) {
      let maxPage = template.doc.length / 10;
      if (template.doc.length % 10 > 0) {
        maxPage++;
      }
      const progress = ((currentPage + 1) * 100) / maxPage;
      setCurrentPage(currentPage + 1);
      setProgress(progress);
    }
  };

  const onBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentPage > 1) {
      let maxPage = template.doc.length / 10;
      if (template.doc.length % 10 > 0) {
        maxPage++;
      }
      const progress = ((currentPage - 1) * 100) / maxPage;
      setCurrentPage(currentPage - 1);
      setProgress(progress);
    }
  };

  const onFinish = () => {
    console.log("FINISH");
  };

  return (
    <Container
      component="main"
      style={{
        padding: 0,
      }}
    >
      <CssBaseline />
      <AppBar position="relative" color="default" className={classes.box}>
        <Toolbar>
          <Typography className={classes.headerTitle}>
            Big Five Personality Test
          </Typography>
        </Toolbar>
      </AppBar>
      <LinearProgress
        variant="determinate"
        color="primary"
        value={progress}
      ></LinearProgress>
      <Grid container className={classes.question}>
        <Grid item xs={6}>
          <Typography>Saya adalah orang yang</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box borderBottom={1} {...defaultProps} />
        </Grid>
      </Grid>
      {template ? <BigFivePage page={currentPage}></BigFivePage> : null}

      <Container
        style={{
          paddingTop: "40px",
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingBottom: "40px",
        }}
      >
        {currentPage > 1 ? (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.back}
            onClick={onBack}
          >
            <Grid container>
              <Grid item xs={4}>
                {"<<"}
              </Grid>
              <Grid item xs={4}>
                Sebelumnya
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Button>
        ) : null}
        {template && template.doc.length > currentPage * 10 ? (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.next}
            onClick={onNext}
          >
            <Grid container>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                Selanjutnya
              </Grid>
              <Grid item xs={4}>
                {">>"}
              </Grid>
            </Grid>
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.finish}
            onClick={onFinish}
          >
            Selesai
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default BigFiveForm;
