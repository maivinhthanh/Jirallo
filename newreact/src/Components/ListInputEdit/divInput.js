import React, { Component } from 'react';
import _ from 'lodash'

class DivInput extends Component {

  onInput = (e)=>{
    
    this.props.changeText(this.txtName.textContent, this.props.indexArr)
  }

  render() {
    var name = this.props.children;
    return (
      <div ref={(input)=>{this.txtName = input}} 
        style={{fontSize : this.props.size, marginBottom : this.props.arrow,
         display:'inline', margin: this.props.margin}} 
        onBlur={this.onInput}  value={name} className={`InputField`}  contentEditable="true" >
        {name}
      </div>
    );
  }
}
export default DivInput
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