import React from "react";
import { Provider } from "react-redux";
import "App.css";
import MainViewContainer from "containers/marksViewContainer";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/privateRoute";
import SignIn from "components/signin";
import Layout from "components/layout";
import store from "../src/state/store";
import AttendanceView from "components/attendanceView";

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
                  <AttendanceView />
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
                  <MainViewContainer />
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
