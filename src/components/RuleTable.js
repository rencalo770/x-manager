import React from "react";
import {Button,Table} from "antd";


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


const ruleColumns = [
    /*   {
           title: '部门',
           dataIndex: "bu",
           key: 'bu'
       },
       {
           title: '场景',
           dataIndex: 'scene',
           key: 'scene'
       },*/
    {
        title: '规则id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '规则名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '优先级',
        dataIndex: 'salience',
        key: 'salience',
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '最近修改人',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '最近创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: createTime =>(
            <div>
                { createTime != null? new Date(new Date(createTime).getTime()).Format('yyyy-MM-dd hh:mm:ss') : ''}
            </div>
        )
    },
    {
        title: '最近更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: updateTime =>(
            <div>
                {updateTime != null? new Date(new Date(updateTime).getTime()).Format('yyyy-MM-dd hh:mm:ss') : ''}
            </div>
        )
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render:operate => (
            <div>{
                operate.map((text, id)=>{
                    let t = "primary"
                    if (text === "删除"){
                        t = "danger"
                    }
                    if (id < 1){
                        return <Button key={id} type={t}>{text}</Button>
                    }else {
                        return <Button style={{marginLeft: 8}} key={id} type={t}>{text}</Button>
                    }
                })
            }</div>
        )
    },
];

class RuleTable extends React.PureComponent{
    render() {
        return(
            <Table dataSource={this.props.children} columns={ruleColumns} />
        )
    }
}

export default RuleTable
