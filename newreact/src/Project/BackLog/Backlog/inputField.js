import React, { Component } from 'react';
import _ from 'lodash'
var size = "";
var arrow = "";
var font = "";
var margin = "";

class InputField extends Component {

  onInput = (e)=>{
    _.isEqual(this.props.nameInput, 'sprint') && this.props.newdata(this.txtName.textContent);
    _.isEqual(this.props.nameInput, 'issue') && this.props.changeName(this.txtName.textContent);
    _.isEqual(this.props.nameInput, 'epic') && this.props.editNameEpic(this.txtName.textContent)
    _.isEqual(this.props.nameInput, 'project') && this.props.editData(this.txtName.textContent)
  }
  
  render() {
    var name = this.props.children;
    return (
      <div ref={(input)=>{this.txtName = input}} 
        style={{fontSize : size || this.props.size, marginBottom : arrow || this.props.arrow,
        fontFamily: font, display:'inline', margin: margin || this.props.margin}} 
        onBlur={this.onInput}  value={name} className={`InputField`}  contenteditable="true" >
        {name}
      </div>
    );
  }
}
export default InputField
