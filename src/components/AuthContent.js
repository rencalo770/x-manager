import React from "react";
import {Layout} from 'antd';

const {Content} = Layout

class AuthContent extends React.Component{

    render() {
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
