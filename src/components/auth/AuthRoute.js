import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import token from "./Token";


const AuthRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            token.checkUsernameAndToken() ?  (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export  default AuthRoute;
