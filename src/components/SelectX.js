import React from "react";
import {Select} from "antd";


class SelectX extends React.PureComponent{

    render() {
        return(
            <div>
                <span style={{ marginRight: 8 }}>{this.props.spanText}</span>
                <Select
                    style={{width:150}}
                    placeholder={this.props.placeholder}
                    onSelect={this.props.onSelected}
                    disabled={this.props.disabled}
                    value={this.props.value}
                >
                    {
                        this.props.selectOption.map(option =>{
                          //  console.log("select->", this.props.selectOption)
                            return <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                        })
                    }
                </Select>
            </div>
        )
    }
}

export default SelectX
