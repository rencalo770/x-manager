import React from "react";
import {Button, Modal, Row, Col, Input} from "antd";
import SelectX from "./SelectX";
import emData from "../data/emData";

class ButtonX extends React.PureComponent{

    state={
        isModalVisible: false
    }

    onClick = (e)=> {
        console.log("e, a->", e)
        this.setState({
            isModalVisible: true
        })
    }

    handleOK = (e) => {

    }

    handleCancel = (e) => {
        this.setState({
            isModalVisible: false
        })
    }

    select = (e) => {

    }


    render() {
        return(
            <div>
                <Button id={this.props.id}  onClick={this.onClick} type={this.props.type} style={this.props.style}>{this.props.text}</Button>
                <Modal title={this.props.text}
                       visible={this.state.isModalVisible}
                       okText="保存"
                       cancelText="取消"
                       onOk={this.handleOK}
                       onCancel={this.handleCancel}>
                    {
                        this.props.id === 1 ?
                            (<Input bordered={true} placeholder={'请输入部门名称'}/>)
                        :(
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
                    }
                </Modal>
            </div>

        )
    }
}



export default ButtonX
