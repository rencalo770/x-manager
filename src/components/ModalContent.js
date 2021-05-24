import React from "react";
import {Col, Input, Row} from "antd";
import SelectX from "./SelectX";
import emData from "../data/emData";



class ModalContent extends React.PureComponent{

    render() {
        if (this.props.id === 1 ) {
            return  <Input bordered={true} placeholder={'请输入部门名称'}/>
        } else if (this.props.id === 2) {
            return (
                <Col>
                    <Row>
                        <Input bordered={true} placeholder={'请输入部门名称'}/>
                    </Row>
                    <Row>
                        <Input style={{marginTop: 10}} placeholder={'请输入场景名称'}/>
                    </Row>
                    <Row style={{marginTop: 10}}>
                        <SelectX
                            spanText='执行模式:'
                            placeholder='请选择执行模式'
                            onSelected={this.select}
                            selectOption={emData}
                            disabled={false}/>
                    </Row>
                </Col>
            )
        }else {
            return(
                <Col>
                    <Row>
                        <p>hello  world</p>
                    </Row>
                </Col>
            )
        }
    }
}


export default ModalContent
