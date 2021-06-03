import React from "react";
import {Layout, Divider, Switch, Row, Col, message, Table, Button, Modal, Input,} from 'antd';
import SelectX from "../SelectX";
//import TableX from "../TableX";
import axios from "axios";
import emData from "../../data/emData";
import emHelper from "../../data/emHelper";
import ButtonX from "../ButtonX";
import {Redirect} from "react-router-dom";
import '../auth/Token'
import Token from "../auth/Token";
import isNumeric from "antd/es/_util/isNumeric";
import {SUCCESS} from "../../data/Contant";
const {Content} = Layout

const { Column } = Table;

const token = new Token()

// eslint-disable-next-line no-extend-native
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


class RuleContent extends React.Component{

    //获取部门信息
    componentDidMount() {
        axios.get('/bu')
            .then(response=>{
            if (response.status === 200){
                if (response.data.code === SUCCESS){
                    this.setState({
                        buOption: response.data.data
                    })
                }else {
                    message.error("获取部门信息失败:"+ response.data.message, 3)
                }
            } else {
                message.error('获取部门信息失败:'+ response.status, 3)
            }
        }).catch(e =>{
            message.error('获取部门信息异常:'+e, 3)
        })
    }

    //获取部门(bid)下所有的业务场景
    getSceneData = (bid) => {
        axios.get('/scenes?bid='+bid)
            .then(response =>{
                if (response.status === 200){
                    if (response.data.code === SUCCESS){
                        this.setState({
                            scenesOption: response.data.data
                        })
                    }else {
                        message.error("获取场景失败:"+ response.data.message, 3)
                    }
                }else{
                    message.error('获取部门的场景信息失败:'+ response.status, 3)
                }
            })
            .catch(e=>{
                message.error('获取场景信息异常:'+ e, 3)
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

                    console.log(" response.data.data--->", response.data.data)
                    //if(response.data.code === SUCCESS){
                        //补全数据
                        let respRules = []
                        if (response.data.data != null){
                            for (let i = 0; i < response.data.data.length; i ++ ){
                                let rule = response.data.data[i]
                                if( status === 1 ) {
                                    rule['operate'] = ['查看', '修改', '下线']
                                }else {
                                    rule['operate'] = ['查看', '修改', '上线']
                                }

                                rule['key'] = response.data.data[i].id
                                respRules[i] = rule
                            }
                        }

                        this.setState({
                            emValue:   emHelper.getSceneExecuteModelId(sid, this.state.scenesOption),
                            emDisabled: false,
                            rules: respRules,
                            switchDisabled: false
                        })
                    /*}else {
                        message.error('获取规则列表失败:'+ response.data.message, 3)
                    }*/

                }else {
                    message.error('获取规则列表失败:'+ response.status, 3)
                }
            })
            .catch(e=>{
                message.error('获取规则列表异常:'+e, 3)
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
        if (event.value === this.state.emValue || event.children === this.state.emValue){
            //选择和之前一致的
            return
        }

        axios.get('/change/em?bid='+ this.state.buValue +'&id=' + this.state.sceneValue + '&eid=' + event.value)
            .then(response => {
                if (response.status === 200){
                    if (response.data.code === SUCCESS){
                        message.success('改变场景的执行模式成功!')
                        this.setState({
                            emValue : event.children
                        })
                    }else {
                        message.error('改变场景执行模式失败:'+response.data.message, 3)
                    }
                }else{
                    message.error('改变场景执行模式失败:'+response.status, 3)
                }
            })
            .catch(e =>{
                message.error('改变执行模式异常:'+ e, 3)
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
        rules:[],

        watchVisible: false,
        watchContent: '',

        changeVisible : false,
        changeRecord: ''
    }


    watchCancel = (e) => {
        this.setState({
            watchVisible: false
        })
    }

    modalChangeOk = (e) => {
        if (this.state.description === '' || this.state.description === null  || this.state.description.trim() === ''){
            message.error('描述不能为空!', 3)
            return
        }

        //todo
        if (this.state.salience === '' || this.state.salience == null || !isNumeric(this.state.salience) || !(this.state.salience%1 === 0)){
            message.error('规则优先级不是正整数'+ this.state.salience, 3)
            return
        }

        if (this.state.content === '' || this.state.content === null  || this.state.content.trim === ''){
            message.error('规则体不能为空!', 3)
            return
        }

        //console.log( 'bu->scene->', this.state.buValue, this.state.sceneValue)
        //保存规则
        axios.post('/update/rule', {
            'bid': this.state.buValue,
            'sid': this.state.sceneValue,
            'username': token.getUsername(),
            'name': this.state.name,
            'description': this.state.description,
            'salience': this.state.salience,
            'content': this.state.content})
            .then(response => {
                if (response.status === 200) {
                    if (response.data.code === SUCCESS){
                        message.success('规则更新成功,刷新以重新加载!', 3)
                        this.setState({
                            changeVisible: false
                        })
                    }else {
                        message.error('规则更新失败!'+response.data.message, 3)
                    }
                }else {
                    message.error('规则更新失败!'+response.status, 3)
                }
            })
            .catch(e => {
                message.error('更新规则异常:' + e, 3)
            })
    }

    changeCancel = (e) => {
        this.setState({
            changeVisible: false
        })
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
                    <Table dataSource={this.state.rules}>
                        <Column title="规则id" dataIndex="id" key="id"/>
                        <Column title="规则名称" dataIndex="name" key="name"/>
                        <Column title="优先级" dataIndex="salience" key="salience"/>
                        <Column title="描述" dataIndex="description" key="description"/>
                        <Column title="最近修改人" dataIndex="username" key="username"/>
                        <Column
                            title="最近创建时间"
                            dataIndex='createTime'
                            key='createTime'
                            render={(createTime, record) => (
                                <div>
                                    {createTime != null ? new Date(new Date(createTime).getTime()).Format('yyyy-MM-dd hh:mm:ss') : ''}
                                </div>
                            )}
                        />
                        <Column
                            title='最近更新时间'
                            dataIndex='updateTime'
                            key='updateTime'
                            render={(updateTime, record) => (
                                <div>
                                    {updateTime != null ? new Date(new Date(updateTime).getTime()).Format('yyyy-MM-dd hh:mm:ss') : ''}
                                </div>
                            )}
                        />
                        <Column
                            title='操作'
                            dataIndex='operate'
                            key='operate'
                            render={(operate, record) => (
                                operate.map((text, id) => {
                                    return <Button style={{marginLeft: 8}}
                                                   key={id}
                                                   type={text === '下线' || text === '上线' ? 'danger' : 'primary'}
                                                   onClick={(e) => {
                                                       if (text === '查看') {
                                                           this.setState({
                                                               watchVisible: true,
                                                               watchContent: record.content,
                                                           })
                                                       }

                                                       if (text === '修改') {
                                                           this.setState({
                                                               changeVisible: true,
                                                               name: record.name,
                                                               description: record.description,
                                                               salience: record.salience,
                                                               content: record.content
                                                           })
                                                       }

                                                       if (text === '下线' || text === '上线') {
                                                           let rules = this.state.rules
                                                           let afterRules= []
                                                           for(let i = 0; i < rules.length; i ++){
                                                               if (rules[i].id === record.id){
                                                                   continue
                                                               }
                                                               afterRules.push(rules[i])
                                                           }

                                                           axios.post('/change/status',{
                                                               'name': record.name,
                                                               'status': (text === '下线'? 0 : 1),
                                                               'bid': this.state.buValue,
                                                               'sid': this.state.sceneValue
                                                           })
                                                               .then(response =>{
                                                                   if (response.status === 200){
                                                                       if (response.data.code === SUCCESS){
                                                                           message.success(text==='下线'? '下线成功': '上线成功', 3)
                                                                           this.setState({
                                                                               rules: afterRules
                                                                           })
                                                                       } else {
                                                                           message.error("更新规则失败:" + response.data.message, 3)
                                                                       }
                                                                   }else {
                                                                       message.error(text==='下线'? '下线失败:'+ response.status : '上线失败:'+ response.status)
                                                                   }
                                                               })
                                                               .catch(e=> {
                                                                   message.error(text==='下线'? '下线异常:'+ e: '上线异常:'+e, 3)
                                                               })
                                                       }
                                                   }}>{text}</Button>
                                })
                            )}/>
                    </Table>
                    <Modal
                        id ='查看'
                        title='规则内容'
                        visible={this.state.watchVisible}
                        onCancel={this.watchCancel}
                        footer ={null}>
                        {<Input.TextArea autoSize={true} readOnly={true} value={this.state.watchContent}/>}
                    </Modal>
                    <Modal
                        id ='修改'
                        title='规则内容'
                        visible={this.state.changeVisible}
                        okText="保存"
                        cancelText="取消"
                        onOk={this.modalChangeOk}
                        onCancel={this.changeCancel}
                        width={600}
                        maskClosable={false}
                    >
                        <Col>
                            <Row>
                                <span>规则名称:</span>
                            </Row>
                            <Row>
                                <Input readOnly={true} value={this.state.name}/>
                            </Row>
                            <Row>
                                <span style={{marginTop: 10}}>规则描述:</span>
                            </Row>
                            <Row>
                                <Input value={this.state.description}
                                       onChange={(e) => {
                                           console.log('onchange->',e.target.value)
                                           this.setState({
                                               description: e.target.value
                                           })
                                       }}/>
                            </Row>
                            <Row>
                                <span style={{marginTop: 10}}>规则优先级:</span>
                            </Row>
                            <Row>
                                <Input value={this.state.salience} onChange={e => {
                                    this.setState({
                                        salience: e.target.value
                                    })
                                }}/>
                            </Row>
                            <Row>
                                <span style={{marginTop: 10}}>规则体:</span>
                            </Row>
                            <Row>
                                <Input.TextArea  autoSize={true} value={this.state.content} onChange={e => {
                                    this.setState({
                                        content: e.target.value
                                    })
                                }}/>
                            </Row>
                        </Col>
                    </Modal>
                </div>
            </Content>
        )
    }
}


export default RuleContent
