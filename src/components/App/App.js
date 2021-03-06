import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import VTDashboard from "../VTDashboard/VTDashboard";
import VTProfile from "../VTProfile/VTProfile";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import ClientStepper from "../ClientStepper/ClientStepper";
import ClientProfile from "../ClientProfile/ClientProfile";
import ClientServiceRequest from "../ClientServiceRequest/ClientServiceRequest";
import VTStepper from "../VTStepper/VTStepper";
import SearchPage from "../SearchPage/SearchPage";
import ClientDashBoard from "../ClientDashboard/ClientDashboard";
import CarePlan from "../CarePlan/CarePlan";
import "./App.css";
import VTServiceRequest from "../VTServiceRequest/VTServiceRequest";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/landingpg */}
            <Redirect exact from="/" to="/landingpg" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/about" component={AboutPage} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute exact path="/home" component={UserPage} />
            <Route
              exact
              path="/client-registration"
              component={ClientStepper}
            />
            <Route exact path="/vet-tech-registration" component={VTStepper} />
            <Route exact path="/landingPg" component={LandingPage} />
            <ProtectedRoute exact path="/vtdashboard" component={VTDashboard} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute
              exact
              path="/client-profile/:id"
              component={ClientProfile}
            />
            <ProtectedRoute
              exact
              path="/vt-profile/:id"
              component={VTProfile}
            />
            <ProtectedRoute
              exact
              path="/vt-service/:id"
              component={VTServiceRequest}
            />
            <ProtectedRoute
              exact
              path="/client_service/:id"
              component={ClientServiceRequest}
            />
            <ProtectedRoute exact path="/search" component={SearchPage} />
            <ProtectedRoute
              exact
              path="/clientdashboard"
              component={ClientDashBoard}
            />
            <ProtectedRoute exact path="/careplan/:id" component={CarePlan} />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
