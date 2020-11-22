import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Button,
  Modal,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import StartDialog from "./StartDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  checkExistsAction,
  setStartDialogOpen,
} from "../../actions/lonelinessActions";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import tp from "../../assets/images/VectorSTS.svg";
import j from "../../assets/images/VectorTS.svg";
import t from "../../assets/images/VectorBS.svg";
import s from "../../assets/images/VectorS.svg";

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
  headerGrid: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  headerIcon: { fontSize: "32px" },
  headerTitle: {
    paddingLeft: theme.spacing(3),
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  title: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: "center",
    fontWeight: 500,
    fontSize: "24px",
    color: theme.palette.primary.dark,
  },
  paragraph: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    textAlign: "justify",
    fontWeight: 500,
    fontSize: "16px",
  },
  legendTitle: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    textAlign: "center",
    fontWeight: 500,
    fontSize: "20px",
  },
  legendTag: {
    textAlign: "center",
    fontWeight: theme.typography.fontWeightNormal,
    fontSize: "16px",
  },
  question: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  start: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    background: "linear-gradient(90deg, #F75291 0%, #FD81B1 100%)",
    fontWeight: "bold",
    fontSize: "20px",
  },
  gray: {
    opacity: 0.4,
    filter: "grayscale(80%)",
  },
}));

const LonelinessIntro = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.login.user.accessToken);
  const startDialogOpen = useSelector(
    (state) => state.loneliness.startDialogOpen
  );
  const classes = useStyles();
  const { history } = props;

  const onOpenDialog = async () => {
    await trackPromise(dispatch(checkExistsAction(accessToken)));
    dispatch(setStartDialogOpen(true));
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
          <Grid container className={classes.headerGrid}>
            <Grid item xs={1}>
              <ArrowBack
                className={classes.headerIcon}
                onClick={() => history.push("/")}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.headerTitle}>
                Petunjuk Pengerjaan
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography className={classes.title}>Skala 2</Typography>
      <Typography className={classes.paragraph}>
        <b>Introduksi. </b>
        Skala yang bertujuan untuk mengetahui kondisi Anda dengan lingkungan
        sekitar.
      </Typography>
      <Typography className={classes.paragraph}>
        <b>Petunjuk Pengerjaan. </b>
        Baca dengan seksama setiap pernyataan dan pilihlah yang paling
        menggambarkan dan sesuai dengan diri Anda dengan memilih salah satu dari
        pilihan jawaban yang tersedia pada setiap nomornya hingga selesai.
      </Typography>
      <Typography className={classes.legendTitle}>Keterangan Simbol</Typography>
      <Grid container style={{ paddingTop: "8px" }}>
        <Grid item xs={2}></Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={tp} alt="tp" />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={j} alt="j" />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={t} alt="t" />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={s} alt="s" />{" "}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={2} className={classes.legendTag}>
          TP
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          J
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          T
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          S
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid container style={{ paddingTop: "24px", fontSize: "16px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          TP
        </Grid>
        <Grid item xs={1} style={{ textAlign: "center" }}>
          -
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          Tidak Pernah
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: "24px", fontSize: "16px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          J
        </Grid>
        <Grid item xs={1} style={{ textAlign: "center" }}>
          -
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          Jarang
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: "24px", fontSize: "16px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          T
        </Grid>
        <Grid item xs={1} style={{ textAlign: "center" }}>
          -
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          Terkadang
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: "24px", fontSize: "16px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          S
        </Grid>
        <Grid item xs={1} style={{ textAlign: "center" }}>
          -
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          Sering
        </Grid>
      </Grid>
      <Typography className={classes.legendTitle}>Ilustrasi</Typography>
      <Grid container className={classes.question}>
        <Grid item xs={12}>
          <Typography>
            - Seberapa sering kamu merasa bahagia saat bermain sepeda?
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: "8px" }}>
        <Grid item xs={2}></Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={tp} alt="tp" className={classes.gray} />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={j} alt="j" className={classes.gray} />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={t} alt="t" className={classes.gray} />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={s} alt="s" />{" "}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Container style={{ paddingLeft: "32px", paddingRight: "32px" }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.start}
          // onClick={onStart}
          onClick={onOpenDialog}
        >
          Mulai
        </Button>
      </Container>
      <Modal open={startDialogOpen}>
        <StartDialog />
      </Modal>
      <Modal open={promiseInProgress}>
        <LoadingIndicator />
      </Modal>
    </Container>
  );
};

export default LonelinessIntro;
