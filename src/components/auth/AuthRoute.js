import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";

import Token from './Token';

const token = new Token();

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
