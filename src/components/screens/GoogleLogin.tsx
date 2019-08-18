import React from "react";
import { connect } from "react-redux";
import { userLogin } from "react-admin";
import ReactGoogleLogin from "react-google-login";
import Grid from "@material-ui/core/Grid";

const googleClientId =
  "36338562012-9hdofvvt61e84t2bbip954lv0rc9fufk.apps.googleusercontent.com";

const GoogleLogin = ({ userLogin }: { [key: string]: any }) => {
  const handleResponse = (response: any) => {
    const access_token = response && response.getAuthResponse().access_token;
    if (access_token) {
      userLogin({ access_token });
    }
  };
  return (
    <Grid
      justify="center"
      alignItems="center"
      container
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <ReactGoogleLogin
          clientId={googleClientId}
          buttonText="Login With Google"
          onSuccess={handleResponse}
          onFailure={handleResponse}
        />
      </Grid>
    </Grid>
  );
};

export default connect(
  undefined,
  { userLogin }
)(GoogleLogin);
