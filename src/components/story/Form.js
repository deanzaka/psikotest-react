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
import RichTextEditor from "./RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  checkExistsAction,
  setEndDialogOpen,
} from "../../actions/storyActions";
import EndDialog from "./EndDialog";

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
    paddingLeft: theme.spacing(9),
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
  notice: {
    textAlign: "center",
    marginLeft: theme.spacing(12),
    marginRight: theme.spacing(12),
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
  finish: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    background: "linear-gradient(90deg, #F75291 0%, #FD81B1 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
    color: "white",
  },
  finishGray: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    background: "linear-gradient(90deg, #333333 0%, #5C5C5C 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
    color: "white",
  },
  gray: {
    opacity: 0.4,
    filter: "grayscale(80%)",
  },
}));

const StoryIntro = (props) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.login.user.accessToken);
  const endDialogOpen = useSelector((state) => state.story.endDialogOpen);
  const isExists = useSelector((state) => state.story.isExists);
  const classes = useStyles();
  const { history } = props;

  dispatch(checkExistsAction(accessToken));

  const onOpenDialogFinish = async () => {
    if (!isExists) {
      dispatch(setEndDialogOpen(true));
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
          <Grid container className={classes.headerGrid}>
            <Grid item xs={1}>
              <ArrowBack
                className={classes.headerIcon}
                onClick={() => history.push("/")}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.headerTitle}>
                Life Event Story
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography className={classes.paragraph}>
        <b>Introduksi. </b>
        Saat ini Anda berada di masa-masa studi di negara Jepang. Hal ini
        memberikan pengalaman tersendiri yang mana ada masa menyenangkan dan
        kurang menyenangkan sehingga membuat Anda mengalami gejolak emosi yang
        bermacam-macam. Anda dapat menceritakan pengalaman-pengalaman tersebut
        dalam kesempatan ini dengan menggunakan bahasa yang menurut Anda nyaman
        dan cerita Anda akan dijaga kerahasiannya.
      </Typography>
      <Container
        style={{
          paddingTop: "32px",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        {isExists ? (
          <Typography className={classes.notice}>
            Anda hanya memiliki satu kesempatan
          </Typography>
        ) : (
          <RichTextEditor />
        )}
      </Container>
      <Container style={{ paddingLeft: "32px", paddingRight: "32px" }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={isExists ? classes.finishGray : classes.finish}
          onClick={onOpenDialogFinish}
        >
          Kirim
        </Button>
      </Container>
      <Modal open={endDialogOpen ? endDialogOpen : false}>
        <EndDialog />
      </Modal>
    </Container>
  );
};

export default StoryIntro;
