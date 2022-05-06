import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import PhotosPage from './components/PhotosPage'
import PhotoDetails from "./components/PhotoDetails";
import PhotoUploadForm from "./components/PhotoUploadModal";
import ErrorPage from "./components/404";
import { loadAllPhotos } from "./store/photo";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupForm from "./components/SignupFormModal/SignupForm";

import { useSelector } from 'react-redux'



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { 
    (async() => {
    await dispatch(loadAllPhotos()).then(() => setIsLoaded(true))
    await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  })()
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <Footer/>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path='/photos'>
            <PhotosPage />
          </Route>
          <Route path='/photos/:id'>
            <PhotoDetails />
          </Route>
          <Route path='/photos/newPhoto'>
            <PhotoUploadForm />
          </Route>
          <ErrorPage />
          <Route/>
        </Switch>
      )}

    </>
  );
}

export default App;
