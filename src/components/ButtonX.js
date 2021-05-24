import React from "react";
import {Button, Modal, Row, Col, Input} from "antd";
import ModalContent from "./ModalContent";

class ButtonX extends React.PureComponent{

    state={
        isModalVisible: false
    }

    onClick = (e)=> {
        this.setState({
            isModalVisible: true
        })
    }

    handleOK = (e) => {
        //todo
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
                        <ModalContent id ={this.props.id}/>
                </Modal>
            </div>

        )
    }
}



export default ButtonX
