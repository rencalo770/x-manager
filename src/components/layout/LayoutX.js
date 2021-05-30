import React from "react";
import {Layout, Menu} from 'antd'; //
import { Route, withRouter} from "react-router-dom";
import { BlockOutlined } from '@ant-design/icons';
import "antd/dist/antd.css"
import AuthControl from "../auth/LoginControl";
import Login from "../auth/Login";
import RuleLayout from "./BaseLayout";
import HomeContent from "../content/HomeContent";
import AuthRoute from "../auth/AuthRoute";

const {SubMenu} = Menu

const { Header } = Layout;


class LayoutX extends React.Component{

    render() {
        return(
            <Layout>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{margin: 0, padding: 0, width: '100%', height: '100%'}}
                    >
                        <SubMenu style={{ float:'left' }} key="1x" title={<div> <BlockOutlined />X-MANAGER</div> }/>
                        <SubMenu style={{ float:'right' }} key="2x" title={<AuthControl/>}/>
                    </Menu>

                </Header>
                <Layout style={{height: "100vh", left: 10, overflow: "auto",}}>
                    <Route exact path='/' component={HomeContent}/>
                    <Route exact path='/login' component={Login}/>
                    <AuthRoute path='/manage' component={RuleLayout}/>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(LayoutX)
