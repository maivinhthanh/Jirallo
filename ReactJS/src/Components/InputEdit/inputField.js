import React, { Component } from 'react';
// import './InputField.css';
import {connect} from 'react-redux';
// import * as actions from './../../../actions/info.action';


var size = "";
var arrow = "";
var font = "";

class InputField extends Component {

  onInput = (e)=>{
    if(this.props.newdata){
      this.props.newdata(this.txtName.textContent);
    }
    this.props.changeName(this.txtName.textContent)
  }
  
  // shouldComponentUpdate(nextProps){
  //   console.log(nextProps.sprint)
  //   console.log(this.props.sprint)
  //   size = nextProps.sprint.size  +"px";
  //   arrow = nextProps.sprint.arrow + "px";
  //   font = nextProps.sprint.font;
  //   //console.log(this.props.info);
  //   return true;
  // }
//   componentWillMount(){
//     this.props.fetchCV(1);
//   }

  render() {
    console.log(this.props)
    var name = this.props.children;
    return (
      <div ref={(input)=>{this.txtName = input}} style={{fontSize : size, marginBottom : arrow, fontFamily: font}} 
      onBlur={this.onInput}  value={name} className={`InputField ${this.props.class}`}  contenteditable="true" >
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