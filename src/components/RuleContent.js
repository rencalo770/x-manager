import React from "react";
import {Layout, Divider, Switch, Row, Col} from 'antd';
import SelectX from "./SelectX";
import RuleTable from "./RuleTable";
import axios from "axios";
import emData from "../data/emData";
import emHelper from "../data/emHelper";
const {Content} = Layout


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
                //todo
            }
        }).catch(e =>{
            //todo
        })
    }

    //获取部门(bid)下所有的业务场景
    getSceneData = (bid) => {
        axios.get('/scenes?bid='+bid)
            .then(response =>{
                if (response.status === 200){
                    console.log("scenesOption->", response.data)
                    this.setState({
                        scenesOption: response.data
                    })
                }else{
                    //todo
                }
            })
            .catch(e=>{
                //todo
            })
    }

    //选择具体的部门
    buOnSelected = (value, event) =>{
        // 基于具体的部门去获取"场景",在具体的业务场景中修改下面的逻辑即可
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
                console.log("getFixedStatusRules response->", response.data)
                if (response.status === 200){
                    //补全数据
                    let respRules = []
                    for (let i = 0; i < response.data.length; i ++ ){
                        let rule = response.data[i]
                        rule['operate'] = ['查看', '删除', '修改']
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
                    //todo
                }
            })
            .catch(e=>{
                //todo
            })
    }

    //选择具体的场景,每一个场景都会固定的对应一个场景，所以选择场景时，场景上规则的执行模式也确定了
    sceneOnSelected = (value, event) => {
        console.log("sceneSelect-->", this.state.buValue, value, event)

        this.setState({
            sceneValue: event.value
        })

        this.getFixedStatusRules(this.state.buValue, value, this.state.checked)
    }

    //切换(某部的某场景下的规则执行模式)执行模式
    changeExecuteModel = (bid, sid, eid) => {
        axios.get('/change/em?bid='+ bid +'&id=' + sid + '&eid=' + eid)
            .then(response => {
                if (response.status === 200){
                    // todo
                    console.log("change success")
                }else{
                    // todo
                }
            })
            .catch(e =>{
                //todo 没有保存
                console.log("change failed")
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


    //todo 此处是切换选中场景的执行模式，状态需要保存至后端，并向执行的规则引擎发送切换执行模式通知
    emOnSelect = (value, event) =>{
        console.log("emOnSelect->", value, event)
        //send to backend to save

        this.changeExecuteModel(this.state.buValue, this.state.sceneValue, event.value)

        this.setState({
            emValue : event.children
        })
    }

    // todo 切换分类
    onChange  = (e)=>{
        console.log("Switch-->" ,e)
        this.getFixedStatusRules(this.state.buValue, this.state.sceneValue, e)

        this.setState({
            checked: e
        })
    }


    render() {
        return (
            <Content style={{ margin: '24px 16px 20px', background:'white'}}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 10 }}>
                    <Row>
                        <Col>
                            <SelectX spanText='部门:'
                                     placeholder='请选择部门'
                                     onSelected={this.buOnSelected}
                                     selectOption={this.state.buOption}
                                     disabled={false}
                                     value={this.state.buValue}
                            />
                        </Col>
                        <Col>
                            <SelectX spanText='场景:'
                                     placeholder='请选择场景'
                                     onSelected={this.sceneOnSelected}
                                     selectOption={this.state.scenesOption}
                                     disabled={false}
                                     value={this.state.sceneValue}
                            />
                        </Col>
                                             <Col>
                            <SelectX spanText='执行模式:'
                                     placeholder='请选择执行模式'
                                     onSelected={this.emOnSelect}
                                     selectOption={this.state.emOption}
                                     disabled={this.state.emDisabled}
                                     value={this.state.emValue}
                            />
                        </Col>
                                 <Col>
                            <Switch style={{marginLeft: 20}}
                                    checkedChildren="在线规则"
                                    unCheckedChildren="离线规则"
                                    checked={this.state.checked}
                                    disabled={this.state.switchDisabled}
                                    onChange={this.onChange} />
                        </Col>

                    </Row>
                    <Divider/>
                    <RuleTable children={this.state.rules} />
                </div>
            </Content>
        )
    }
}


export default RuleContent
