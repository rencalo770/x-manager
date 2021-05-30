import React from "react";
import {Layout} from 'antd';
import '../auth/Token'
import Token from "../auth/Token";
import {Redirect} from "react-router-dom";

const {Content} = Layout

const token = new Token()

class AuthContent extends React.Component{

    render() {

        //权限控制
        if (!token.checkUsernameAndToken()){
            return <Redirect to='/login'/>
        }

        return(
            <Content style={{ margin: '24px 16px 20px', background:'white'}}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 10 }}>
                    {this.props.location.pathname}
                </div>
            </Content>
        )
    }
}


export default AuthContent
