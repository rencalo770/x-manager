import React from "react";
import {Button, Modal, Table, Input, Col, Row, message} from "antd";
import axios from "axios";
const { Column } = Table;

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


class RuleTable extends React.PureComponent {

    state = {
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

    changeOk = (e) => {

        if (this.state.description === ''  || this.state.description.trim() === ''){
            message.error('描述不能为空!')
            return
        }

        if (!Number.isInteger(this.state.salience)){
            message.error('规则优先级不是正整数')
            return
        }

        if (this.state.content === '' || this.state.content.trim === ''){
            message.error('规则体不能为空!')
            return
        }

        //保存规则
        axios.get('/update/rule?name=' + this.state.name
            + '&description=' + this.state.description
            + '&salience=' + this.state.salience
            + '&content=' + this.state.content)
            .then(response => {
                if (response.status === 200) {
                    message.success('规则保存成功!')
                    this.setState({
                        changeVisible: false
                    })
                }
            })
            .catch(e => {
                message.error('更新规则失败:' + e)
            })
    }

    changeCancel = (e) => {
        this.setState({
            changeVisible: false
        })
    }


    render() {
        return (
            <div>
            <Table dataSource={this.props.rules}>
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
                                        type={text === '删除' ? 'danger' : 'primary'}
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

                                            if (text === '删除') {
                                                // todo
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
                    onOk={this.changeOk}
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
        )
    }
}

export default RuleTable
