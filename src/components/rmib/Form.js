import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  LinearProgress,
  makeStyles,
  Modal,
} from "@material-ui/core";
// import RMIBPage from "./Page";
import { setHasError, setEndDialogOpen } from "../../actions/rmibActions";
import EndDialog from "./EndDialog";
import TimerCard from "./TimerCard";
import TimeUpDialog from "./TimeUpDialog";
import RMIBPage from "./Page";

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
  tableHeader: {
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
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

const RMIBForm = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const template = useSelector((state) => state.rmib.template);
  const timeUp = useSelector((state) => state.rmib.timeUp);
  const endDialogOpen = useSelector((state) => state.rmib.endDialogOpen);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [progress, setProgress] = React.useState(0);

  const onNext = () => {
    let maxPage = template.doc.length / 12;
    if (template.doc.length % 12 > 0) {
      maxPage++;
    }
    const progress = ((currentPage + 1) * 100) / maxPage;

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (template.doc.length > currentPage * 12) {
      setCurrentPage(currentPage + 1);
      setProgress(progress);
      dispatch(setHasError(false));
    }
  };

  const onBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentPage > 1) {
      let maxPage = template.doc.length / 12;
      if (template.doc.length % 12 > 0) {
        maxPage++;
      }
      const progress = ((currentPage - 1) * 100) / maxPage;
      setCurrentPage(currentPage - 1);
      setProgress(progress);
    }
  };

  const onOpenDialogFinish = () => {
    dispatch(setEndDialogOpen(true));
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
            Rothwell Miller Interest Blank
          </Typography>
        </Toolbar>
      </AppBar>
      <LinearProgress
        variant="determinate"
        color="primary"
        value={progress}
      ></LinearProgress>
      <TimerCard></TimerCard>
      <Grid container className={classes.tableHeader}>
        <Grid item xs={4}>
          <Typography style={{ fontWeight: 500 }}>Peringkat</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography style={{ fontWeight: 500 }}>Profesi</Typography>
        </Grid>
      </Grid>
      {template ? <RMIBPage page={currentPage}></RMIBPage> : null}

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
        {template && template.doc.length > currentPage * 12 ? (
          <Button
            fullWidth
            variant="contained"
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
            className={classes.finish}
            onClick={onOpenDialogFinish}
          >
            Selesai
          </Button>
        )}
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

export default RMIBForm;
