import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../reducers/rootReducer";
import {
  Tabs,
  Tab,
  Modal,
  Card,
  IconButton,
  CardHeader,
  Paper,
} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import TheatersIcon from "@material-ui/icons/Theaters";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import "../styles/App.css";
import {
  accountOpenModal,
  accountCloseModal,
  accountToggleModal,
  accountLoginModal,
  accountLogoutModal,
} from "../actions/uiActions";
import { routes } from "./App";
import { AccountModalType } from "../reducers/uiReducer";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";
import RegisterForm from "./RegisterForm";
import VCRBigLogo from "../images/VCRBigLogo.png";
import VCRSmallLogo from "../images/VCRIconOnly.png";

function NavBar() {
  const isLoggedIn: any = useSelector<GlobalState>(
    (state) => state.loginData.isLoggedIn
  );

  const username: any = useSelector<GlobalState>(
    (state) => state.loginData.username
  );

  const modalOpen: any = useSelector<GlobalState>(
    (state) => state.uiData.accountModalOpen
  );

  const modalType: any = useSelector<GlobalState>(
    (state) => state.uiData.accountModalType
  );

  const dispatch = useDispatch();

  const handleAccountClick = () => {
    dispatch(accountOpenModal());
  };

  const handleModalClose = () => {
    dispatch(accountCloseModal());
  };

  const accountString = isLoggedIn ? username : "Login";

  const accountModal = () => {
    switch (modalType) {
      case AccountModalType.LOGIN:
        return <LoginForm />;
      case AccountModalType.LOGOUT:
        return <LogoutForm />;
      case AccountModalType.REGISTER:
        return <RegisterForm />;
    }
  };

  useEffect(() => {
    dispatch(accountToggleModal(isLoggedIn));
    dispatch(accountLoginModal(isLoggedIn));
    dispatch(accountLogoutModal(isLoggedIn));
  }, [dispatch, isLoggedIn]);

  return (
    <Paper style={{ margin: 0 }} square>
      <Tabs
        value={false}
        className="navbar"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          icon={<HomeOutlinedIcon />}
          label={<span className="navbar-label">Home</span>}
          component={RouterLink}
          to={routes.homeLink}
        />
        <Tab
          icon={<MovieFilterIcon />}
          label={<span className="navbar-label">Recommendations</span>}
          component={RouterLink}
          to={routes.recsLink}
        />
        <img src={VCRBigLogo} id="navbar-img" alt="VCR logo" />
        <Tab
          icon={<TheatersIcon />}
          label={<span className="navbar-label">MyMovies</span>}
          component={RouterLink}
          to={routes.myMoviesLink}
        />
        <Tab
          icon={<PersonIcon />}
          label={<span className="navbar-label">{accountString}</span>}
          onClick={handleAccountClick}
        />
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          className="account-modal"
          disableScrollLock={true}
          disableAutoFocus={true}
          disableEnforceFocus={true}
        >
          <Card className="account-card">
            <CardHeader
              action={
                <IconButton onClick={handleModalClose}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <div id="account-card-content">
              <img src={VCRSmallLogo} id="modal-img" alt="VCR logo" />
              {accountModal()}
            </div>
          </Card>
        </Modal>
      </Tabs>
    </Paper>
  );
}

export default NavBar;
