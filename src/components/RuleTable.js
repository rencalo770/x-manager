import React from "react";
import {Button, Modal, Table, Input, Col, Row} from "antd";
import axios from "axios";
const { Column } = Table;

const { TextArea } = Input

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
                                            console.log("be ->", this.props.bid, this.props.sid, record.id, record.content)
                                            if (text === '查看') {
                                                this.setState({
                                                    watchVisible: true,
                                                    watchContent: record.content,
                                                })
                                            }

                                            if (text === '修改') {
                                                this.setState({
                                                    changeVisible: true,
                                                    changeRecord : record
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
                            <Input readOnly={true} value={this.state.changeRecord.name}/>
                        </Row>
                        <Row>
                            <span>规则描述:</span>
                        </Row>
                        <Row>
                            <Input readOnly={false} value={this.state.changeRecord.description} onChange={(e)=>{console.log('onchange->',e) }}/>
                        </Row>
                        <Row>
                            <span>规则优先级</span>
                        </Row>
                        <Row>
                            <Input readOnly={false}  value={this.state.changeRecord.salience}/>
                        </Row>
                        <Row>
                            <span>规则体</span>
                        </Row>
                        <Row>
                            <Input.TextArea  autoSize={true} readOnly={false} value={this.state.changeRecord.content}/>
                        </Row>
                    </Col>
                </Modal>
            </div>
        )
    }
}

export default RuleTable
