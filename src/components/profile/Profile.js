import "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  CssBaseline,
  AppBar,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Toolbar,
  Grid,
  Typography,
  Snackbar,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MuiAlert from "@material-ui/lab/Alert";
import { ArrowBack } from "@material-ui/icons";
import { updateProfileAction } from "../../actions/loginActions";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
  paper: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    paddingTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(1),
    background: "linear-gradient(90deg, #F75291 0%, #FD81B1 100%)",
    fontWeight: "bold",
    fontSize: "20px",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = props;
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.user.token);

  const [name, setName] = React.useState(user.name ? user.name : "");
  const [errName, setErrName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState(
    user.birthDate ? Date.parse(user.birthDate) : null
  );
  const [errBirthDate, setErrBirthDate] = React.useState("");
  const [gender, setGender] = React.useState(user.gender ? user.gender : "");
  const [errGender, setErrGender] = React.useState("");
  const [address, setAddress] = React.useState(
    user.address ? user.address : ""
  );
  const [errAddress, setErrAddress] = React.useState("");
  const [education, setEducation] = React.useState(
    user.education ? user.education : ""
  );
  const [errEducation, setErrEducation] = React.useState("");
  const [occupation, setOccupation] = React.useState(
    user.occupation ? user.occupation : ""
  );
  const [errOccupation, setErrOccupation] = React.useState("");
  const [phone, setPhone] = React.useState(user.phone ? user.phone : "");
  const [errPhone, setErrPhone] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onChange = (e) => {
    console.log(e);
    if (Object.prototype.toString.call(e) === "[object Date]") {
      setBirthDate(e);
    } else {
      switch (e.target.name) {
        case "name":
          setName(e.target.value);
          break;
        case "address":
          setAddress(e.target.value);
          break;
        case "gender":
          setGender(e.target.value);
          break;
        case "phone":
          setPhone(e.target.value);
          break;
        case "education":
          setEducation(e.target.value);
          break;
        case "occupation":
          setOccupation(e.target.value);
          break;
        default:
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setErrName("Harap masukkan nama");
      return;
    }
    if (!address) {
      setErrAddress("Harap masukkan alamat");
      return;
    }
    if (!phone) {
      setErrPhone("Harap masukkan nomer telepon");
      return;
    }
    if (!birthDate) {
      setErrBirthDate("Harap masukkan tanggal lahir");
    }
    if (!gender) {
      console.log(gender);
      setErrGender("Harap masukkan jenis kelamin");
      console.log(errGender);
      return;
    }
    if (!education) {
      setErrEducation("Harap masukkan pendidikan terakhir");
      return;
    }
    if (!occupation) {
      setErrOccupation("Harap masukkan pekerjaan");
      return;
    }

    const err = await dispatch(
      updateProfileAction(token, {
        _id: user._id,
        name: name,
        address: address,
        phone: phone,
        birthDate: new Date(birthDate).toISOString(),
        gender: gender,
        education: education,
        occupation: occupation,
      })
    );

    if (err) {
      setOpen(true);
    } else {
      props.history.push("/");
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
                onClick={() => history.goBack()}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.headerTitle}>
                Ubah profil
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nama"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={onChange}
              error={errName !== ""}
              helperText={errName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Alamat"
              name="address"
              autoComplete="address"
              autoFocus
              value={address}
              onChange={onChange}
              error={errAddress !== ""}
              helperText={errAddress}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Nomer Telepon"
              name="phone"
              autoComplete="phone"
              autoFocus
              value={phone}
              onChange={onChange}
              error={errPhone !== ""}
              helperText={errPhone}
            />
            <KeyboardDatePicker
              margin="normal"
              required
              fullWidth
              variant="inline"
              format="dd/MM/yyyy"
              id="birthDate"
              label="Tanggal Lahir"
              name="birthDate"
              value={birthDate}
              onChange={onChange}
              error={errBirthDate !== ""}
              helperText={errBirthDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <FormControl fullWidth error={errGender !== ""}>
              <InputLabel
                id="gender-label"
                className={classes.formControl}
                fullWidth
              >
                Jenis Kelamin
              </InputLabel>
              <Select
                fullWidth
                required
                className={classes.formControl}
                labelId="gender-label"
                id="gender"
                name="gender"
                value={gender}
                onChange={onChange}
              >
                <MenuItem value={"Laki-laki"}>Laki-laki</MenuItem>
                <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
              </Select>
              <FormHelperText>{errGender}</FormHelperText>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="education"
              label="Pendidikan Terakhir"
              name="education"
              autoComplete="education"
              autoFocus
              value={education}
              onChange={onChange}
              error={errEducation !== ""}
              helperText={errEducation}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="occupation"
              label="Pekerjaan"
              name="occupation"
              autoComplete="occupation"
              autoFocus
              value={occupation}
              onChange={onChange}
              error={errOccupation !== ""}
              helperText={errOccupation}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Simpan Perubahan
            </Button>
          </form>
        </div>
      </MuiPickersUtilsProvider>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="error">
          Terjadi kesalahan, tidak dapat memperbaharui profile.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
