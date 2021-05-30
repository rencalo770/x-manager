import React from "react";
import {Layout, Menu} from "antd";
import {CopyOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import AuthContent from "../content/AuthContent";
import ConfigContent from "../content/ConfigContent";
import RuleContent from "../content/RuleContent";
const { Sider } = Layout;


class BaseLayout extends React.PureComponent{

    render() {
        const pathname = this.props.location.pathname;
        const active = pathname.replace(/^\//, '') || 'rules';

        return(
            <Layout>
                <Sider>
                    <Menu theme="dark" mode="inline" selectedKeys={[active]} >
                        <Menu.Item key="rules" icon={<CopyOutlined/>}>
                            <Link  to='/manage/rule' >规则管理</Link>
                        </Menu.Item>
                        <Menu.Item key="auth" icon={<UserOutlined/>} >
                            <Link  to='/manage/auth'>权限管理</Link>
                        </Menu.Item>
                        <Menu.Item key="config" icon={<SettingOutlined/>} >
                            <Link  to='/manage/config'>配置中心</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{background:'lightgray'}}>
                    <Switch>
                        <Route path="/manage/rule" component={RuleContent}/>
                        <Route path='/manage/auth' component={AuthContent}/>
                        <Route path='/manage/config' component={ConfigContent}/>
                    </Switch>
                </Layout>
            </Layout>
        )
    }
}


export default withRouter(BaseLayout)
