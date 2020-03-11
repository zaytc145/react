import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth";

const EmployeeRouter = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (
          auth.getAuthStatus() &&
          auth.getAuthUserRole() === "INSPECTION_EMPLOYEE"
        ) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  referer: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
export default EmployeeRouter;
