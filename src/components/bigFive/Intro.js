import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Box,
  Button,
  Modal,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import StartDialog from "./StartDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  checkExistsAction,
  setStartDialogOpen,
} from "../../actions/bigFiveActions";
import sts from "../../assets/images/VectorSTS.svg";
import ts from "../../assets/images/VectorTS.svg";
import bs from "../../assets/images/VectorBS.svg";
import s from "../../assets/images/VectorS.svg";
import ss from "../../assets/images/VectorSS.svg";

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

const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  style: { width: "inherit", height: "16px" },
  borderColor: "text.primary",
};

const BigFiveIntro = (props) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.login.user.accessToken);
  const startDialogOpen = useSelector((state) => state.bigFive.startDialogOpen);
  const classes = useStyles();
  const { history } = props;

  const onOpenDialog = async () => {
    await dispatch(checkExistsAction(accessToken));
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
      <Typography className={classes.title}>
        Big Five Personality Test
      </Typography>
      <Typography className={classes.paragraph}>
        <b>Introduksi. </b>
        Berikut ini merupakan tes yang dapat memberikan gambaran mengenai
        kecenderungan kepribadian. Setiap orang memiliki kecenderungan yang
        berbeda-beda, sehingga tidak ada jawaban yang salah dalam tes ini.
      </Typography>
      <Typography className={classes.paragraph}>
        <b>Petunjuk Pengerjaan. </b>
        Baca dengan seksama setiap pernyataan dan pilihlah yang paling
        menggambarkan dan sesuai dengan diri Anda dengan memilih salah satu dari
        pilihan jawaban yang tersedia pada setiap nomornya.
      </Typography>
      <Typography className={classes.legendTitle}>Keterangan Simbol</Typography>
      <Grid container style={{ paddingTop: "8px" }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={sts} alt="sts" />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={ts} alt="ts" />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={bs} alt="bs" />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={s} alt="s" />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={ss} alt="ss" />{" "}
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} className={classes.legendTag}>
          STS
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          TS
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          BS
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          S
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          SS
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Grid container style={{ paddingTop: "24px", fontSize: "16px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          STS
        </Grid>
        <Grid item xs={1} style={{ textAlign: "center" }}>
          -
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          Sangat Tidak Setuju
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: "24px", fontSize: "16px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          TS
        </Grid>
        <Grid item xs={1} style={{ textAlign: "center" }}>
          -
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          Tidak Setuju
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: "24px", fontSize: "16px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          BS
        </Grid>
        <Grid item xs={1} style={{ textAlign: "center" }}>
          -
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          Biasa Saja
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
          Setuju
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: "24px", fontSize: "16px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          SS
        </Grid>
        <Grid item xs={1} style={{ textAlign: "center" }}>
          -
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          Sangat Setuju
        </Grid>
      </Grid>
      <Typography className={classes.legendTitle}>Ilustrasi</Typography>
      <Grid container className={classes.question}>
        <Grid item xs={6}>
          <Typography>Saya adalah orang yang</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box borderBottom={1} {...defaultProps} />
        </Grid>
        <Grid item xs={12}>
          <Typography>- Bahagia saat bermain sepeda</Typography>
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: "8px" }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={sts} alt="sts" className={classes.gray} />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={ts} alt="ts" className={classes.gray} />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={bs} alt="bs" className={classes.gray} />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={s} alt="s" className={classes.gray} />{" "}
        </Grid>
        <Grid item xs={2} className={classes.legendTag}>
          <img src={ss} alt="ss" />{" "}
        </Grid>
        <Grid item xs={1}></Grid>
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
    </Container>
  );
};

export default BigFiveIntro;
