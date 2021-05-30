import React from "react";
import {withRouter} from "react-router-dom";
import Token from "./Token";

const token = new Token();

const AuthCon = withRouter(
    ({ history }) =>
        token.checkUsernameAndToken() ? (
            <div>
                {token.getUsername()}
                <a
                    href='/login'
                    onClick={() => {
                        //history.push("/login");
                        token.delToken()
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;退出
                </a>
            </div>
        ) : (
            window.location.pathname === '/'
                ? (<div><a href="/login" >登陆</a>&nbsp;&nbsp;&nbsp;&nbsp;</div>)
                : (<div><a href="/" >主页</a>&nbsp;&nbsp;&nbsp;&nbsp;</div>)
        )
);

export default AuthCon;
