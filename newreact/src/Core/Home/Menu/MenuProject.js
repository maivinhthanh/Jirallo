import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import Draggable from 'react-draggable'; // The default
import Avatar from '@material-ui/core/Avatar';

import * as Config from '../../../Config';
import * as actions from '../action';
import MenuUI from './MenuUI'
import MenuProjectUI from './MenuProjectUI'

class MenuUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            csstransforms: false,
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        }
        this.canvas = React.createRef();
        this.image = React.createRef();
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user){
            // this.convertImage('?')
        }
        else{
            if(!user.image){
                // this.convertImage(user.name.charAt(0))
            }
        }
        
    }

    addClass = () =>{
        this.setState({
            csstransforms : !this.state.csstransforms
        })
    }

    logout = () =>{
        Cookies.remove('token')
        Cookies.remove('refreshtoken')
        this.props.logout()
        this.setState({
            
            redirect: true
        })
    }

    convertImage = (data) =>{
        let tCtx = this.canvas.current.getContext('2d')
        // let imageElem = this.image.current
        tCtx.canvas.width = 50;
        tCtx.font = "40px serif";
        tCtx.strokeText(data, 13, 80);
        
        // imageElem.src = tCtx.canvas.toDataURL();
    }

    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
    };
    
    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
    };
    
    onStop = () => {
        this.setState({activeDrags: --this.state.activeDrags});
    };
    
      // For controlled component
    adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x: x - 10, y}});
    };
    
    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {controlledPosition} = this.state;
        const {x, y} = controlledPosition;
        this.setState({controlledPosition: {x, y: y - 10}});
    };
    
    onControlledDrag = (e, position) => {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    };
    
    onControlledDragStop = (e, position) => {
        this.onControlledDrag(e, position);
        this.onStop();
    };

    render() {
        let jwt = jwtDecode(Cookies.get('token'))
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;

        return (
            <div className="Main-Menu">
                <Draggable  {...dragHandlers}>
                    <div > 
                        <MenuUI jwt={jwt}/>
                        <MenuProjectUI idproject={this.props.idproject}/>
                    </div>
                    
                </Draggable>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch( actions.logout() ),

    };
};
export default connect( null, mapDispatchToProps )(MenuUser)
