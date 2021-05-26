import React from "react";
import {Button, Modal, Row, Col, Input} from "antd";
import SelectX from "./SelectX";
import emData from "../data/emData";

class ButtonX extends React.PureComponent{

    state={
        visible: false
    }

    onClick = (e)=> {
        this.setState({
            visible: true
        })
    }

    handleOk = (e) => {
        //todo
        console.log('ok->', e)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    render() {
        return(
            <div>
                <Button id={this.props.id}  onClick={this.onClick} type={this.props.type} style={this.props.style}>{this.props.text}</Button>
                <Modal title={this.props.text}
                       visible={this.state.visible}
                       okText="保存"
                       cancelText="取消"
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>

                {
                    (this.props.id === 1 ) ?
                    (
                        <Col>
                            <Row><span>请输入部门名称:</span></Row>
                            <Row><Input bordered={true}/></Row>
                        </Col>
                    )
                    : (
                        (this.props.id === 2) ?
                        (
                            <Col>
                                <Row><span>请输入部门名称:</span></Row>
                                <Row><Input bordered={true}/></Row>
                                <Row><span style={{marginTop: 10}}>请输入场景名称:</span></Row>
                                <Row><Input placeholder={'请输入场景名称'}/></Row>
                                <Row style={{marginTop: 10}}>
                                    <SelectX
                                        spanText='执行模式:'
                                        placeholder='请选择执行模式'
                                        onSelected={this.select}
                                        selectOption={emData}
                                        disabled={false}/>
                                </Row>
                            </Col>
                        ) : (
                                <Col>
                                    <Row><span>请输入部门名称:</span></Row>
                                    <Row>
                                        <Input onChange={ e =>{
                                            this.setState({
                                                bu:e.target.value
                                            })
                                        }}/>
                                    </Row>
                                    <Row><span style={{marginTop: 10}}>请输入场景名称:</span></Row>
                                    <Row>
                                        <Input onChange={e=>{
                                            this.setState({
                                                scene: e.target.value
                                            })
                                        }} />
                                    </Row>
                                    <Row><span style={{marginTop: 10}}>请输入规则名称:</span></Row>
                                    <Row>
                                        <Input onChange={e=> {
                                            this.setState({
                                                name: e.target.value
                                            })
                                        }}/>
                                    </Row>
                                    <Row><span style={{marginTop: 10}}>请输入规则描述:</span></Row>
                                    <Row>
                                        <Input onChange={e=> {
                                            this.setState({
                                                description: e.target.value
                                            })
                                        }}/>
                                    </Row>
                                    <Row><span style={{marginTop: 10}}>请输入规则优先级:</span></Row>
                                    <Row>
                                        <Input onChange={e=> {
                                            this.setState({
                                                salience: e.target.value
                                            })
                                        }}/>
                                    </Row>
                                    <Row><span style={{marginTop: 10}}>请输入规则内容:</span></Row>
                                    <Row>
                                        <Input.TextArea onChange={e=> {
                                            this.setState({
                                                content: e.target.value
                                            })
                                        }}/>
                                    </Row>
                                </Col>
                            )
                        )
                }
                </Modal>
            </div>
        )
    }
}



export default ButtonX
