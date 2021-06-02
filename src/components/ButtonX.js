import React from "react";
import {Button, Modal, Row, Col, Input, message} from "antd";
import SelectX from "./SelectX";
import emData from "../data/emData";
import axios from "axios";
import isNumeric from "antd/es/_util/isNumeric";

class ButtonX extends React.PureComponent{

    state={
        visible: false,
        bu: '',
        scene: '',
        eid: '',
        name : '',
        description: '',
        salience : '',
        content : ''

    }

    onClick = (e)=> {
        this.setState({
            visible: true
        })
    }

    select = (eid) => {
        this.setState({
            eid: eid
        })
    }


    handleOk = (e) => {
        console.log('handle ok -->', e)
        //新增部门
        if (this.props.id === 1){
            this.addBu()
        }

        //新增场景
        if (this.props.id === 2){
            this.addScene()
        }

        //新增规则
        if (this.props.id === 3){
            this.addRule()
        }
    }

    addBu = () => {
        if (this.state.bu === '' || this.state.bu == null){
            message.error('部门名称为空')
            return
        }

        axios.get('/add/bu?bu='+ this.state.bu)
            .then(response =>{
                if (response.status === 200) {
                    if (response.data.code === 0){
                        message.success('创建部门成功,请刷新页面以加载.', 3)
                        this.setState({
                            visible: false,
                            bu : ''
                        })
                    }else {
                        message.error('创建部门失败:'+ response.data.code, 3)
                    }
                }else {
                    message.error('创建部门失败:'+ response.status, 3)
                }
            })
            .catch(e => {
                message.error('创建部门异常:'+ e, 3)
            })
    }

    addScene = () => {
        if (this.state.bu === '' || this.state.bu == null){
            message.error('部门名称为空')
            return
        }

        if (this.state.scene === '' || this.state.scene == null){
            message.error('场景名称为空')
            return
        }

        if (this.state.eid === '' || this.state.eid == null) {
            message.error('没有选择执行模式')
            return
        }

        axios.get('/add/scene?bu='+ this.state.bu + '&scene='+ this.state.scene + '&eid=' + this.state.eid)
            .then(response =>{
                if (response.status === 200) {
                    if (response.data.code === 0) {
                        message.success('添加场景成功,请刷新页面以加载.', 3)
                        this.setState({
                            visible: false,
                            bu : '',
                            scene: '',
                            eid: ''
                        })
                    }else {
                        message.error('添加场景失败:'+ response.data.message, 3)
                    }
                }else {
                    message.error('添加场景失败:'+ response.status, 3)
                }
            })
            .catch(e => {
                message.error('添加场景异常:'+ e, 3)
            })

    }


    addRule = () => {
        if (this.state.bu === '' || this.state.bu == null || this.state.bu.trim() === ''){
            message.error('部门名称为空',3)
            return
        }

        if (this.state.scene === '' || this.state.scene == null || this.state.scene.trim() === ''){
            message.error('场景名称为空', 3)
            return
        }

        if (this.state.name === '' || this.state.name == null || this.state.name.trim() === ''){
            message.error('规则名称为空', 3)
            return
        }

        if (this.state.description === '' || this.state.description == null|| this.state.description.trim() === ''){
            message.error('规则描述为空',3)
            return
        }

        if (this.state.salience === '' || this.state.salience == null || this.state.salience.trim() === '' || !isNumeric(this.state.salience) || !(this.state.salience%1 === 0) ){
            message.error('规则优先级必须为整数:'+this.state.salience, 3)
            return
        }

        if (this.state.content === '' || this.state.content == null || this.state.content.trim() === ''){
            message.error('规则体为空', 3)
            return
        }

        axios.post('/add/rule',
            {'bu': this.state.bu,
                'scene': this.state.scene,
                'name': this.state.name,
                'description': this.state.description,
                'salience': this.state.salience,
                'content': this.state.content})
            .then(response => {
                if (response.status === 200 ){
                    if (response.data.code === 0) {
                        message.success('创建规则成功,刷新以重新加载!', 3)
                        this.setState({
                            bu:'',
                            scene: '',
                            name:'',
                            description: '',
                            salience:'',
                            content:'',
                            visible: false
                        })
                    }else{
                        message.error('创建规则失败:'+response.data.message, 3)
                    }
                }else{
                    message.error('创建规则失败:'+response.status, 3)
                }
            })
            .catch(e => {
                message.error('创建规则异常:'+e, 3)
            })

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
                            <Row><Input onChange={ e =>{
                                this.setState({
                                    bu: e.target.value
                                })
                            }} value={this.state.bu} /></Row>
                        </Col>
                    )
                    : (
                        (this.props.id === 2) ?
                        (
                            <Col>
                                <Row><span>请输入部门名称:</span></Row>
                                <Row><Input placeholder='请输入部门名称'  onChange={ e =>{
                                    this.setState({
                                        bu: e.target.value
                                    })
                                }} value={this.state.bu}/></Row>

                                <Row><span style={{marginTop: 10}}>请输入场景名称:</span></Row>
                                <Row><Input placeholder='请输入场景名称' onChange={ e =>{
                                    this.setState({
                                        scene: e.target.value
                                    })
                                }} value={this.state.scene}/></Row>
                                <Row style={{marginTop: 10}}>
                                    <SelectX
                                        spanText='执行模式:'
                                        placeholder='请选择执行模式'
                                        onSelected={this.select}
                                        selectOption={emData}
                                        disabled={false}
                                        value = {this.state.eid}
                                    />
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
