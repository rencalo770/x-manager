import React from "react";
import {Button, Modal, Table, Input} from "antd";
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
        readOnly : true,
        isModalVisible: false,
        record: '',
        buttonText: ''
    }

    handleOK = (e) => {
        //todo
    }

    handleCancel = (e) => {
        //todo
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
                                                   console.log("be ->",  this.props.bid, this.props.sid, record.id)
                                                   this.setState({
                                                       isModalVisible: true,
                                                       readOnly: true,
                                                       record: record,
                                                       buttonText: text
                                                   })
                                               }

                                               if (text === '修改') {
                                                   //todo
                                               }

                                               if (text === '删除') {
                                                   // todo
                                               }
                                           }}>{text}</Button>
                        })
                    )}/>
            </Table>
            <Modal title='规则内容'
                   visible={this.state.isModalVisible}
                   okText="保存"
                   cancelText="取消"
                   onOk={this.handleOK}
                   onCancel={this.handleCancel}>
                {
                    <Input.TextArea autoSize={true} readOnly={true} defaultValue={this.state.record.content}/>
                }
            </Modal>
            </div>
        )
    }
}

export default RuleTable
