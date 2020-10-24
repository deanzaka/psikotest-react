import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Modal,
} from "@material-ui/core";
import BigFivePage from "./Page";
import { setHasError, setEndDialogOpen } from "../../actions/bigFiveActions";
import EndDialog from "./EndDialog";
import TimerCard from "./TimerCard";
import TimeUpDialog from "./TimeUpDialog";

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
    paddingTop: theme.spacing(6),
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
    color: "white",
  },
  nextGray: {
    marginTop: "4px",
    background: "linear-gradient(90deg, #333333 0%, #5C5C5C 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
    color: "white",
  },
  back: {
    marginBottom: "4px",
    background: "linear-gradient(90deg, #714CD3 0%, #8E69EC 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
    color: "white",
  },
  finish: {
    marginTop: "4px",
    background: "linear-gradient(90deg, #F75291 0%, #FD81B1 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
    color: "white",
  },
  finishGray: {
    marginTop: "4px",
    background: "linear-gradient(90deg, #333333 0%, #5C5C5C 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
    color: "white",
  },
  errorText: {
    color: "#F75291",
    fontWeight: "bold",
    fontSize: "12px",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}));

const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  style: { width: "inherit", height: "16px" },
  borderColor: "text.primary",
};

const BigFiveForm = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const template = useSelector((state) => state.bigFive.template);
  const hasError = useSelector((state) => state.bigFive.hasError);
  const timeUp = useSelector((state) => state.bigFive.timeUp);
  const endDialogOpen = useSelector((state) => state.bigFive.endDialogOpen);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [progress, setProgress] = React.useState(0);

  let complete = false;
  if (template && template.doc) {
    complete = true;
    let limit = currentPage * 10;
    if (limit > template.doc.length) {
      limit = template.doc.length;
    }
    const currentForm = template.doc.slice((currentPage - 1) * 10, limit);
    const empties = currentForm.filter((item) => {
      return typeof item.score === "undefined";
    });
    if (empties.length > 0) {
      complete = false;
    }
  }

  const onNext = () => {
    let maxPage = template.doc.length / 10;
    if (template.doc.length % 10 > 0) {
      maxPage++;
    }
    const progress = ((currentPage + 1) * 100) / maxPage;

    if (complete) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (template.doc.length > currentPage * 10) {
        setCurrentPage(currentPage + 1);
        setProgress(progress);
        dispatch(setHasError(false));
      }
    } else {
      dispatch(setHasError(true));
      return;
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

  const onOpenDialogFinish = () => {
    if (complete) {
      dispatch(setEndDialogOpen(true));
    } else {
      dispatch(setHasError(true));
      return;
    }
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
      <TimerCard></TimerCard>
      <Grid container className={classes.question}>
        <Grid item xs={6}>
          <Typography>Saya adalah orang yang</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box borderBottom={1} {...defaultProps} />
        </Grid>
      </Grid>
      {template && template.doc ? (
        <BigFivePage page={currentPage}></BigFivePage>
      ) : null}

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
        {template && template.doc && template.doc.length > currentPage * 10 ? (
          <Button
            fullWidth
            variant="contained"
            className={complete ? classes.next : classes.nextGray}
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
            className={complete ? classes.finish : classes.finishGray}
            onClick={onOpenDialogFinish}
          >
            Selesai
          </Button>
        )}
        {hasError ? (
          <Typography className={classes.errorText}>
            *Ada yang belom terisi, periksa kembali pilihanmu
          </Typography>
        ) : null}
      </Container>
      <Modal open={endDialogOpen ? endDialogOpen : false}>
        <EndDialog />
      </Modal>
      <Modal open={timeUp ? timeUp : false}>
        <TimeUpDialog />
      </Modal>
    </Container>
  );
};

export default BigFiveForm;
