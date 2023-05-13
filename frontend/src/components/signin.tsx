import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../state/hooks";
// import { userLogin } from "../state/ducks/auth/authActions";
import { TextField, Typography, Button, Grid, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";

import logoImg from "../assets/new-logo.jpg";
import {
  SignInButton,
  SignInContainer,
  SignInPaper,
  Logo,
} from "../components/loginStyles";

const SignIn: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useAppDispatch();
  const isAuth = false;//= useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    navigate("/");
    // dispatch(userLogin({ username: username, password: password }));
  };

  return (
    <SignInContainer maxWidth="xs">
      <Collapse in={checked}>
        <SignInPaper elevation={3}>
          <Logo src={logoImg} alt="Logo" />
          <Typography component="h1" variant="h5" align="center">
            Dummy Sign In
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <SignInButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Sign In
            </SignInButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button color="primary" size="small">
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
          </form>
        </SignInPaper>
      </Collapse>
    </SignInContainer>
  );
};

export default SignIn;