import React from "react";
import { useSelector } from "react-redux";
import AppHeader from "../header/Header";
import {
  CssBaseline,
  Typography,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import rectangle from "../../assets/images/Rectangle.svg";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import hello from "../../assets/images/HelloIllustration.png";

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
  const classes = useStyles();
  const { history } = props;
  const user = useSelector((state) => state.login.user);

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
      {/* <Typography className={classes.title}>Kategori Psikotes</Typography> */}
      <Typography className={classes.testTitle}>Tes Kepribadian</Typography>
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push("/big-five")}>
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
                Big Five Personality Test
              </Typography>
              <Typography className={classes.testDetails}>
                Tes Psikologi yang digunakan untuk mengukur 5 faktor utama yang
                mempengaruhi kepribadian
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
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
    </div>
  );
};

export default List;
