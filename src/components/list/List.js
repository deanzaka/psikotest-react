import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../header/Header";
import {
  CssBaseline,
  Typography,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  Modal,
} from "@material-ui/core";
// import bigFiveLogo from "../../assets/images/BigFive.png";
import stressLogo from "../../assets/images/StressLogo.png";
import lonelinessLogo from "../../assets/images/LonelinessLogo.png";
import storyLogo from "../../assets/images/StoryLogo.png";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import hello from "../../assets/images/HelloIllustration.png";
import { checkExistsAction } from "../../actions/storyActions";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  greetGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  greeting: {
    paddingTop: theme.spacing(3),
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: 1,
    color: theme.palette.primary.dark,
  },
  name: {
    fontSize: "40px",
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 1.5,
    color: theme.palette.primary.dark,
  },
  title: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "32px",
    lineHeight: 1.5,
    color: theme.palette.primary.dark,
  },
  intro: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    textAlign: "justify",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#333333",
  },
  testTitle: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: 1.5,
    color: theme.palette.primary.dark,
  },
  card: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    boxShadow:
      "1px 3px 3px -2px #A2DDFB, 1px 1px 1px -1px #A2DDFB, 1px 1px 3px -3px #A2DDFB",
  },
  testName: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: 1.5,
    color: theme.palette.primary.main,
  },
  media: {
    height: "80px",
    width: "100%",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  testDetails: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: 1.5,
    color: "#333333",
  },
}));

const List = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { history } = props;
  const user = useSelector((state) => state.login.user);
  const { accessToken } = JSON.parse(localStorage.getItem("user"));

  const getGreetingTime = (m) => {
    let g = null;

    if (!m || !m.isValid()) {
      return;
    }

    const split_morning = 4;
    const split_afternoon = 10;
    const split_evening = 14;
    const split_night = 18;
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_morning && currentHour <= split_afternoon) {
      g = "Selamat Pagi,";
    } else if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = "Selamat Siang,";
    } else if (currentHour >= split_evening && currentHour <= split_night) {
      g = "Selamat Sore,";
    } else {
      g = "Selamat Malam,";
    }

    return g;
  };

  const getFirstName = (props) => {
    if (user) {
      const name = user.name.split(" ");
      return name[0];
    } else {
      return "Sobi Empathy";
    }
  };

  const onClickStory = async (props) => {
    await trackPromise(dispatch(checkExistsAction(accessToken)));
    history.push("/story");
  };

  return (
    <div>
      <CssBaseline />
      <AppHeader></AppHeader>
      <Grid container className={classes.greetGrid}>
        <Grid item xs={8}>
          <Typography className={classes.greeting}>
            {getGreetingTime(moment())}
          </Typography>
          <Typography className={classes.name}>{getFirstName()}!</Typography>
        </Grid>
        <Grid item xs={4}>
          <img classes={classes.hello} src={hello} alt="Hello" />
        </Grid>
      </Grid>
      <Typography className={classes.title}>Introduksi</Typography>
      <Typography className={classes.intro}>
        Berikut ini adalah 2 skala psikologi dan life event story yang dapat
        Anda kerjakan. Skala ini tidak bertujuan untuk menilai anda ke dalam
        kelompok tertentu. Oleh karena itu, diharapkan untuk menjawab sesuai
        dengan keadaan atau perasaan Anda pada saat ini. Tidak ada jawaban
        salah, semua jawaban adalah benar. Hasil jawaban Anda akan dijaga
        kerahasiannya dan hanya akan digunakan untuk kalangan terbatas oleh
        Psikolog.
      </Typography>
      {/* <Typography className={classes.testTitle}>Tes Kepribadian</Typography>
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push("/big-five")}>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={bigFiveLogo}
                title="BigFiveLogo"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.testName}>
                Big Five Personality Test
              </Typography>
              <Typography className={classes.testDetails}>
                Tes Psikologi yang digunakan untuk mengukur 5 faktor utama yang
                mempengaruhi kepribadian
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card> */}
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push("/stress")}>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={stressLogo}
                title="StressLogo"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.testName}>Skala 1</Typography>
              <Typography className={classes.testDetails}>
                Skala yang bertujuan untuk mengetahui kondisi Anda di lingkup
                studi dan akademik.
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push("/loneliness")}>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={lonelinessLogo}
                title="LonelinessLogo"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.testName}>Skala 2</Typography>
              <Typography className={classes.testDetails}>
                Skala yang bertujuan untuk mengetahui kondisi Anda dengan
                lingkungan sekitar.
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea onClick={onClickStory}>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={storyLogo}
                title="StoryLogo"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.testName}>
                Life Event Story
              </Typography>
              <Typography className={classes.testDetails}>
                Cerita tentang pengalaman anda.
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
      <Typography className={classes.title}></Typography>
      {/* <Typography className={classes.testTitle}>Tes Minat Bakat</Typography>
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push("/rmib")}>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={rectangle}
                title="Rectangle"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.testName}>
                Rothwell Miller Interest Blank
              </Typography>
              <Typography className={classes.testDetails}>
                Tes Psikologi yang digunakan untuk melihat minat, stereotip, dan
                sikap seorang individu pada sebuah pekerjaan
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card> */}

      <Modal open={promiseInProgress}>
        <LoadingIndicator />
      </Modal>
    </div>
  );
};

export default List;
