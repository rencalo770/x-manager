import React from "react";
import {Layout, Menu} from 'antd'; //
import { UserOutlined, CopyOutlined,SettingOutlined } from '@ant-design/icons';
import { Route, Switch, Link,withRouter} from "react-router-dom";
import RuleContent from "./RuleContent";
import AuthContent from "./AuthContent";
import ConfigContent from "./ConfigContent";
import "antd/dist/antd.css"

const { Header, Sider } = Layout;


class LayoutX extends React.Component{

    render() {
        const pathname = this.props.location.pathname;
        const active = pathname.replace(/^\//, '') || 'rules';
        return(
            <Layout>
                <Header/>
                <Layout
                    style={{
                        height: "100vh",
                        left: 10,
                        overflow: "auto",
                    }}
                >
                    <Sider>
                        <Menu theme="dark" mode="inline" selectedKeys={[active]} >
                            <Menu.Item key="rules" icon={<CopyOutlined/>}>
                                <Link  to='/' >规则管理</Link>
                            </Menu.Item>
                            <Menu.Item key="auth" icon={<UserOutlined/>} >
                                <Link  to='/auth'>权限管理</Link>
                            </Menu.Item>
                            <Menu.Item key="config" icon={<SettingOutlined/>} >
                                <Link  to='/config'>配置中心</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{background:'lightgray'}}>
                        <Switch>
                            <Route path="/" component={RuleContent}/>
                            <Route path='/auth' component={AuthContent}/>
                            <Route path='/config' component={ConfigContent}/>
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(LayoutX)
