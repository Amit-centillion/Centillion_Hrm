import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./layouts/app-routes";
import { AppWrapper } from "./layouts/app-wrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/src/sweetalert2.scss";
import "./assets/css/style.css";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AppWrapper>
          <AppRoutes />
        </AppWrapper>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
