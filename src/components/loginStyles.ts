import { Container, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import logo from "../assets/new-logo.jpg";

export const SignInContainer = styled(Container)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${logo})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}) as typeof Container;

export const SignInPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background?.Paper,
  opacity: 0.8,
}));

export const SignInButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const Logo = styled("img")({
  maxWidth: "50%",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "1rem",
});
