import React from "react";
import {Layout, Divider, Switch, Row, Col, message} from 'antd';
import SelectX from "../SelectX";
import TableX from "../TableX";
import axios from "axios";
import emData from "../../data/emData";
import emHelper from "../../data/emHelper";
import ButtonX from "../ButtonX";
import {Redirect} from "react-router-dom";
import '../auth/Token'
import Token from "../auth/Token";
const {Content} = Layout

const token = new Token()

class RuleContent extends React.Component{

    //获取部门信息
    componentDidMount() {
        axios.get('/bu')
            .then(response=>{
            if (response.status === 200){
                this.setState({
                    buOption: response.data
                })
            } else {
                message.error('获取部门信息失败:', response.data)
            }
        }).catch(e =>{
            message.error('获取部门信息异常:',e)
        })
    }

    //获取部门(bid)下所有的业务场景
    getSceneData = (bid) => {
        axios.get('/scenes?bid='+bid)
            .then(response =>{
                if (response.status === 200){
                    this.setState({
                        scenesOption: response.data
                    })
                }else{
                    message.error('获取部门场景信息失败:', response.data)
                }
            })
            .catch(e=>{
                message.error('获取场景信息异常:',e)
            })
    }

    //选择具体的部门
    buOnSelected = (value, event) =>{
        // 基于具体的部门去获取"场景",在具体的业务场景中修改下面的逻辑即可
        if (this.state.buValue === value){
            //此处确保新增场景后，可以拿到最新的场景信息，但不应该切换部门信息
            this.getSceneData(value);
            return
        }
        this.getSceneData(value)
        this.setState({
            buValue: event.value,

            sceneValue: '',

            emValue: '',
            emDisabled : true,

            checked: true,
            switchDisabled: true,

            rules:[],
        })
    }

    //获取指定部门、场景、状态下的规则
    getFixedStatusRules = (bid, sid, checked) => {

        let status = checked ? 1: 0 //1:在线,0:离线
        axios.get('/rules?bid='+ bid +'&sid='+sid + '&status='+status)
            .then(response=>{
                if (response.status === 200){
                    //补全数据
                    let respRules = []
                    for (let i = 0; i < response.data.length; i ++ ){
                        let rule = response.data[i]
                        rule['operate'] = ['查看', '修改', '删除']
                        rule['key'] = response.data[i].id
                        respRules[i] = rule
                    }

                    this.setState({
                        emValue:   emHelper.getSceneExecuteModelId(sid, this.state.scenesOption),
                        emDisabled: false,
                        rules: respRules,
                        switchDisabled: false
                    })
                }else {
                    message.error('获取规则列表失败:', response.data)
                }
            })
            .catch(e=>{
                message.error('获取规则列表异常:', e)
            })
    }

    //选择具体的场景,每一个场景都会固定的对应一个执行模式，所以选择场景时，场景上规则的执行模式也确定了
    sceneOnSelected = (value, event) => {

        this.setState({
            sceneValue: event.value
        })

        this.getFixedStatusRules(this.state.buValue, value, this.state.checked)
    }

    //切换(某部的某场景下的规则执行模式)执行模式
    emOnSelect = (value, event) =>{
        axios.get('/change/em?bid='+ this.state.buValue +'&id=' + this.state.sceneValue + '&eid=' + event.value)
            .then(response => {
                if (response.status === 200){
                    message.success('改变场景的执行模式成功!')
                    this.setState({
                        emValue : event.children
                    })
                }else{
                    message.error('改变场景执行模式失败:', response.data)
                }
            })
            .catch(e =>{
                message.error('改变执行模式异常:', e)
            })
    }

    // todo 切换分类
    onChange  = (e)=>{
        this.getFixedStatusRules(this.state.buValue, this.state.sceneValue, e)

        this.setState({
            checked: e
        })
    }

    state = {
        //部门数据
        buOption : [],
        buValue: '',

        //场景拉下选择框
        scenesOption : [], //部门下存在的场景列表
        sceneValue:'',//场景选中值对应的文本

        //执行模式选中值对应的文本
        emOption: emData, //todo
        emValue: '',
        emDisabled: true, //执行模式是否禁用

        //规则分类切换开关
        checked : true, //在线与离线规则分类切换标志位
        switchDisabled: true, //开关是否禁用

        //规则列表
        rules:[]
    }

    render() {

        //权限控制
        if (!token.checkUsernameAndToken()){
            return <Redirect to='/login'/>
        }

        return (
            <Content style={{ margin: '24px 16px 20px', background:'white'}}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 10 }}>
                    <Row>
                        <Col>
                            <Row>
                                <Col flex={1} >
                                    <SelectX spanText='部门:'
                                             placeholder='请选择部门'
                                             onSelected={this.buOnSelected}
                                             selectOption={this.state.buOption}
                                             disabled={false}
                                             value={this.state.buValue}
                                    />
                                </Col>
                                <Col flex={1}>
                                    <SelectX spanText='场景:'
                                             placeholder='请选择场景'
                                             onSelected={this.sceneOnSelected}
                                             selectOption={this.state.scenesOption}
                                             disabled={false}
                                             value={this.state.sceneValue}
                                    />
                                </Col>
                                <Col flex={1}>
                                    <SelectX spanText='执行模式:'
                                             placeholder='请选择执行模式'
                                             onSelected={this.emOnSelect}
                                             selectOption={this.state.emOption}
                                             disabled={this.state.emDisabled}
                                             value={this.state.emValue}
                                    />
                                </Col>

                                <Col  flex={1} >
                                    <Switch style={{marginLeft: 16, marginTop: 6}}
                                            checkedChildren="在线规则"
                                            unCheckedChildren="离线规则"
                                            checked={this.state.checked}
                                            disabled={this.state.switchDisabled}
                                            onChange={this.onChange} />
                                </Col>
                            </Row>
                        </Col>
                        <Col flex={9}/>
                        <Col flex={2}>
                            <Row>
                                <Col>
                                    <ButtonX id={1}  type='primary' style={{ marginRight: 10, textAlign: 'right'}} text = '新增部门'/>
                                </Col>
                                <Col>
                                    <ButtonX id={2} type='primary' style={{ marginRight: 10, textAlign: 'right'}} text = '新增场景'/>
                                </Col>
                                <Col>
                                    <ButtonX id={3} type='primary' style={{ marginRight: 10, textAlign: 'right'}} text = '新增规则'/>
                                </Col>
                            </Row>

                        </Col>
                    </Row>

                    <Divider/>
                    <TableX rules={this.state.rules} bid={this.state.buValue} sid={this.state.sceneValue} />
                </div>
            </Content>
        )
    }
}


export default RuleContent
