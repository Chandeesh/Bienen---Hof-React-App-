import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Activate from "./components/Activate";
import Contacts from "./components/Contacts";
import MyBees from "./components/MyBees";
import PeopleActivityData from "./components/peopleActivity/peopleActivityData"
import People from "./components/peoples/people";
import ChangePassword from "./components/ChangePassword";
import ChangePasswordForm from "./components/ChangePasswordForm";
import Mails from "./components/Mails";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import { Navbar, Nav, Container, NavDropdown, FormControl, Button } from 'react-bootstrap';
import Form from "react-validation/build/form";
import { MDBFooter } from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Redirect } from 'react-router-dom';
import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [show, setShow] = useState(false);
  const closeSidebar = () => setShow(false);
  const showSidebar = () => setShow(true);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = useCallback(()=> {
    dispatch(logout());
    return <Redirect to="/login" />;
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logOut", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logOut");
    };
  }, [currentUser, logOut]);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e);
  }

  const redirectContacts = () => {
    return (<Redirect to="/contacts" />);
  }
  return (
    <Router history={history}>
      <div className="d-flex flex-column min-vh-100">
        <Navbar className="color-nav py-3 border" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">
              <img src="https://dib-imker-app.de/portal/img/logo.8227a872.svg" alt="" height="70" width="120" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                {!currentUser ? (<Link id="home" to={"/home"} className="nav-link">
                  {t("home")}
                </Link>) : <></>
                }
                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={logOut}>
                        {t('logOut')}
                      </a>
                    </li>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        {t("login")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        {t("register")}
                      </Link>
                    </li>
                  </div>
                )}
                <NavDropdown title={t("language") + "(" + i18n.language + ")"} onSelect={changeLanguage} id="navbarScrollingDropdown" style={{ color: 'yellow', paddingRight: '25px' }}>

                  <NavDropdown.Item eventKey="en">English</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="de">
                    Deutsch
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder={t("search")}
                  className="me-2"
                  aria-label={t("search")}
                />
                <Button class="btn success">{t("search")}</Button>
              </Form>


              {currentUser ? (
                <div style={{ paddingLeft: "4px" }}>
                  <Button variant="primary" onClick={showSidebar}>
                    {t('overview')}
                  </Button>
                  <Offcanvas placement='end' show={show} onHide={closeSidebar}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title style={{ paddingLeft: '10px', color: '#818181', display: 'block ', fontSize: '25px' }}>{t('overview')}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <div id="mySidenav" class="sidenav">
                        <Link to={"/mybees"} onClick={closeSidebar}>{t('myBees')}</Link>
                        <Link to={"/contacts"} onClick={closeSidebar}>{t('contacts')}</Link>
                        <Link to={"/mails"} onClick={closeSidebar}>{t('mails')}</Link>
                        <Link to={"/profile"} onClick={closeSidebar}>{t('settings')}</Link>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </div>
              ) : (
                <>
                </>
              )}


            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/activate" component={Activate} />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/mybees" component={MyBees} />
          <Route exact path="/people" component={People} />
          <Route exact path="/peopledata" component={PeopleActivityData} />
          <Route exact path="/resetpassword" component={ChangePassword} />
          <Route exact path="/changepwdform" component={ChangePasswordForm} />
          <Route exact path="/mails" component={Mails} />
        </Switch>
        <MDBFooter background='yellow' className='text-center mt-auto text-lg-start text-muted'>
          <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            <div className='container text-center text-md-start mt-5'>
              <div className='row mt-3'>
                <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>
                    <i className='fas fa-gem me-3'></i>Bienen Hof University
                  </h6>
                  <p>
                    {t("footerContent")}
                  </p>
                </div>


                <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Available Features</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      My Bees
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Manage Bees Data
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Store Evaluation Data
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Monitor Activities
                    </a>
                  </p>
                </div>

                <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>{t("contact")}</h6>
                  <p>
                    Alfons-Goppel-Platz 1, 95028 Hof
                  </p>
                  <p>
                    <a href='mailto:ckuduvarajendraselva@hof-university.de' class="hyperlinks">Email Us</a>
                  </p>
                  <p>
                    Contact No: +49 157 7849 0376
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className='text-center p-4' style={{ backgroundColor: '#ffcc00' }}>
            {'© 2022 Copyright: '}
            <a href='mailto:ckuduvarajendraselva@hof-university.de' class="hyperlinks">
              Chandeesh Babu
            </a>
          </div>
        </MDBFooter>
        <AuthVerify logOut={logOut}/>
      </div>
    </Router>
  );
};
export default App;