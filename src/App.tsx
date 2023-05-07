import React from "react";
import { Provider } from "react-redux";
import "App.css";
import configureAppStore from "state";
import MainViewContainer from "containers/marksViewContainer";
import AttendanceViewContainer from "containers/attendanceViewContainer";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/privateRoute";
import SignIn from "components/signin";
import Layout from "components/layout";

const initialState = (window as any).initialReduxState;
const store = configureAppStore(initialState);
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/attendance"
          element={
            <PrivateRoute
              outlet={
                <Layout>
                  <AttendanceViewContainer />{" "}
                </Layout>
              }
            />
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute
              outlet={
                <Layout>
                  <MainViewContainer />{" "}
                </Layout>
              }
            />
          }
        />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Provider>
  );
}

export default App;
