import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../reducers/rootReducer";
import {
  Tabs,
  Tab,
  Paper,
  Fade,
  Typography,
  Collapse,
} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import TheatersIcon from "@material-ui/icons/Theaters";
import PersonIcon from "@material-ui/icons/Person";
import "../styles/App.css";
import { toggleAccountDrawer } from "../actions/uiActions";
import { routes } from "./pages/App";
import VCRBigLogo from "../images/VCRBigLogo.png";
import VCRIconOnly from "../images/VCRIconOnly.png";
import AccountDrawer from "./user/AccountDrawer";
import AccountModal from "./user/AccountModal";
import MovieDetails from "./MovieDetails";
import SnackBar from "../components/SnackBar";

const IMG_TAB_VAL = 2;
const LOGIN_TAB_VAL = 4;

function NavBar(props: any) {
  const dispatch = useDispatch();

  const isLoggedIn: any = useSelector<GlobalState>(
    (state) => state.loginData.isLoggedIn
  );

  const username: any = useSelector<GlobalState>(
    (state) => state.loginData.username
  );

  const accountString = isLoggedIn ? username : "Login";

  const toggleDrawer = (open: boolean) => (event: {
    type: string;
    key: string;
  }) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(toggleAccountDrawer(open));
  };

  const [displayFullBar, setDisplayFullBar] = useState<boolean>(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [scrollDistance, setScrollDistance] = useState(0);
  const widthBreakpoint = 800;
  const scrollBreakpoint = 60;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    window.onscroll = () => {
      setScrollDistance(document.scrollingElement!.scrollTop);
    };

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setDisplayFullBar(
      width > widthBreakpoint && scrollDistance < scrollBreakpoint
    );
  }, [scrollDistance, width]);

  const [value, setValue] = React.useState(0);

  const onTabChange = (event: any, newValue: any) => {
    if (newValue !== LOGIN_TAB_VAL)
      if (newValue === IMG_TAB_VAL) setValue(0);
      else setValue(newValue);
  };

  return (
    <Paper style={{ margin: 0 }} square className="navbar-container">
      <Collapse in={displayFullBar} timeout={1000} collapsedHeight={45}>
        <Tabs
          value={value}
          className="navbar"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={onTabChange}
          centered
        >
          <Tab
            className="navbar-tab"
            icon={<HomeOutlinedIcon />}
            label={
              <Fade in={displayFullBar} timeout={1000}>
                <Typography align="center" variant="button">
                  Home
                </Typography>
              </Fade>
            }
            component={RouterLink}
            to={routes.homeLink}
          />
          <Tab
            className="navbar-tab"
            icon={<MovieFilterIcon />}
            label={
              <Fade in={displayFullBar} timeout={1000}>
                <Typography align="center" variant="button">
                  Recommendations
                </Typography>
              </Fade>
            }
            component={RouterLink}
            to={routes.recsLink}
          />
          <Tab
            className={"navbar-img-tab"}
            icon={
              <React.Fragment>
                <Fade in={!displayFullBar} timeout={1000}>
                  <img src={VCRIconOnly} id="navbar-small-img" alt="VCR logo" />
                </Fade>
                <Fade in={displayFullBar} timeout={1000}>
                  <img src={VCRBigLogo} id="navbar-img" alt="VCR logo" />
                </Fade>
              </React.Fragment>
            }
            component={RouterLink}
            to={routes.homeLink}
          />
          <Tab
            className="navbar-tab"
            icon={<TheatersIcon />}
            label={
              <Fade in={displayFullBar} timeout={1000}>
                <Typography align="center" variant="button">
                  MyMovies
                </Typography>
              </Fade>
            }
            component={RouterLink}
            to={routes.myMoviesLink}
          />
          <Tab
            className="navbar-tab"
            icon={<PersonIcon />}
            label={
              <Fade in={displayFullBar} timeout={1000}>
                <Typography align="center" variant="button">
                  {accountString}
                </Typography>
              </Fade>
            }
            onClick={toggleDrawer(true)}
          />
          <AccountDrawer />
          <AccountModal />
          <MovieDetails />
          <SnackBar />
        </Tabs>
      </Collapse>
    </Paper>
  );
}

export default NavBar;
