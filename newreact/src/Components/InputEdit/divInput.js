import React, { Component } from 'react';
import _ from 'lodash'

class InputField extends Component {

  onInput = (e)=>{
    
    this.props.changeText(this.txtName.textContent)
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
// const mapStateToProps = (state) =>{
//   return {
//     info : state.info,
//   }
// }

// const mapDispatchToProps = (dispatch, props) =>{
//   return{
//     fetchCV : (id) =>{
//       dispatch(actions.actFetchCVRequest(id));
//     }
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(InputField);