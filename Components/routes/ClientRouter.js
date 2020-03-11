import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth";

const ClientRouter = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.getAuthStatus() && auth.getAuthUserRole() === "CLIENT") {
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
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
export default ClientRouter;
