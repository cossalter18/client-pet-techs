import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";

import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Badge from '@material-ui/core/Badge';
import Typography from "@material-ui/core/Typography";


const styles = (theme) => ({
  root: {
    backgroundColor: "#f7f7f7",
    borderBottom: "2px solid #195C60",
    backgroundSize: "cover",
    position: "fixed",
    marginTop: "0px",
    width: "100%",
    height: "70px",
    top: "0px",
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    float: "left",
    position: "fixed",
    top: "7px",
    left: 5,
    marginBottom: "50%",
  },
  img: {
    borderRadius: "50%",
  },
});

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

class Nav extends Component {
  state = {
    notifiClick: true,
  }
  handleOnClickNotifi = () => {
    this.setState({
      notifiClick: false,
    })
  }
  componentDidMount(){

  }


  render() {
    const { classes, clientInfo, user, clientRequest } = this.props;
    // console.log('---------->user id:', this.props.user.id)

    return (
      <HideOnScroll {...this.props}>
        <div className={classes.root}>
          <Link to="/landingpg">
            <img
              className={classes.logo}
              src="images/VetTechlogo.png"
              alt="profile"
              height="130"
              width="130"
            />
          </Link>
          <div className="nav-right">
            {/* Show the link to the info page and the logout button if the user is logged in */}
            {user.id && (
              <>
                <Link
                  className="nav-link"
                  to={
                    this.props.isVetTech ? `/vtdashboard` : `/clientdashboard`
                  }
                >
                  {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
                  Dashboard
                </Link>
                {!this.props.isVetTech && (
                  <Link className="nav-link" to="/search">
                    Search for Services
                  </Link>

                )}
              </>
            )}
            <Link className="nav-link" to="/about">
              About
            </Link>
            {user.id && (
              <>
                <div className="nav-link">
                  <Link
                    className="profile"
                    to={
                      this.props.isVetTech
                        ? `/vt-profile/${user.id}`
                        : `/client-profile/${user.id}`
                    }
                  >
                    {user.username}
                    {/* {this.state.notifiClick && clientRequest.filter(cr => cr.request_status === 0).length > 0 ?
                      <Badge color="secondary" badgeContent={clientRequest.filter(cr => cr.request_status === 0).length} onClick={this.handleOnClickNotifi}>
                        <Typography>{user.username}</Typography>
                      </Badge>
                      :
                      <Typography>{user.username}</Typography>
                    } */}
                  </Link>
                </div>


                <div className="profile_icon">
                  <Link to={`/client-profile/${user.id}`}>
                    {/* {clientInfo.map((client) => {
                      if (client.profile_img === null || client.profile_img === '') {
                        return (
                          <div key={client.user_id}>
                            <img className={classes.img} src="images/blank-profile-picture.png" alt="profile" height="30" width="30" />
                          </div>
                        )
                      } else {
                        return (
                          <div key={client.user_id}>
                            <img className={classes.img} src={client.profile_img} alt="profile" height="30" width="30" />
                          </div>
                        )
                      }
                    })} */}
                    {/* <p>here{JSON.stringify(client.profile_img)}</p> */}
                  </Link>
                </div>

                <LogOutButton className="nav-link" />
              </>
            )}
            {/* Always show this link since the about page is not protected */}
          </div>
        </div>
      </HideOnScroll >
    );
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = (reduxState) => ({
  user: reduxState.user,
  clientInfo: reduxState.clientInfo,
  isVetTech: reduxState.user.user_type === 1,
  clientRequest: reduxState.clientRequestReducer,

});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Nav)
);
