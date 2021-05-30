import React from "react";
import {Col, Row, Typography} from "antd";

const { Title, Paragraph} = Typography;

class HomeContent extends React.PureComponent{

    render() {
        return(
            <Row>
                <Col span={3}/>
                <Col span={12}>
                    <Typography style={{marginTop:20}}>
                        <Title>X-manager</Title>
                        <Paragraph>
                            一个规则管理系统的前端<br/>
                            不仅可以被用于gengine的规则管理<br/>
                            也可被用于任何其他需要管理的规则系统
                        </Paragraph>
                        <Title>gengine</Title>
                        <Paragraph>
                            是一个golang规则引擎<br/>
                            是golang的一种轻量动态加载解决方案<br/>
                            可以被应用于风控、推荐、AB实验等任何需要规则动态加载的golang应用领域
                        </Paragraph>
                    </Typography>
                </Col>
                <Col span={3}/>
            </Row>
        )
    }
}

export default HomeContent
