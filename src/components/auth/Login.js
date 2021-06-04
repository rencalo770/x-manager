import React from "react";
import { Input, Layout, Form, Button, Row, Col, message} from 'antd';
import './Token'
import axios from "axios";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {Redirect } from "react-router-dom";
import {SUCCESS} from "../../data/Contant";
import token from "./Token";


const {Content} = Layout


class Login extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false
        }
    }

    handleFinish = (e) => {
        //e.preventDefault()
        axios.post(`/user/login`, {'username': e.username, 'password': e.password})
            .then(res =>{
                if(res.status === 200){
                    if (res.data.code === SUCCESS){
                        //登陆成功，设置username和token
                        token.setToken(res.data.data.username, res.data.data.token)
                        this.setState({ redirectToReferrer: true });
                        message.success("登陆成功!", 2)
                    }else {
                        message.error("用户名或密码错误!",3)
                    }
                }else {
                    message.error("服务异常:" + res.status, 3)
                }
            })
            .catch(e => {
                message.error("登陆异常:"+ e, 3)
            });
    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: "/manage/rule" } };

        if (this.state.redirectToReferrer ) {
            return <Redirect  to={from} />;
        }

        return(
            <Content>
                <Row type="flex" justify="space-around" align="middle" style={{marginTop:"100px"}}>
                    <Col span={3} />
                    <Col span={6}>
                        <Form onFinish={this.handleFinish}>
                            <Form.Item name='username' rules={[{ required: true ,message: 'Please input your username!'}]}>
                                <Input prefix={<UserOutlined />} placeholder="Username"
                                       onChange={(event) => {
                                           this.setState({
                                               username : event.target.value,
                                           })
                                       }}
                                />
                            </Form.Item>
                            <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input prefix={<LockOutlined />} type="password" placeholder="Password"
                                       onChange={(event) => {
                                           this.setState({
                                               password : event.target.value,
                                           })
                                       }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                                    登陆
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </Content>
        )
    }
}



export default Login
