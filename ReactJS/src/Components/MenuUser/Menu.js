import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

import './menuuser.css'
import * as Config from '../../Config';
import * as actions from '../../Store/actions/auth';

class MenuUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            csstransforms: false
        }
        this.canvas = React.createRef();
        this.image = React.createRef();
    }
    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user){
            this.convertImage('?')
        }
        else{
            if(!user.image){
                this.convertImage(user.name.charAt(0))
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
    render() {
        let jwt = jwtDecode(Cookies.get('token'))
        return (
            <div>
                <div className='menuuser'>
                    <button className="cn-button" onClick={() => this.addClass()} 
                        style={this.props.isUserPage?{top : '0%'}:{}}>
                        {
                                <div>
                                    <canvas ref={this.canvas} ></canvas>
                                </div>
                            // <img className="avatar-image" src={user.image !== null? 
                            //     Config.API_URL  + "/" + user.image : user.avatar} height={96} width={96}/>
                        }
                    
                    </button>
                    <div className={this.state.csstransforms? `csstransforms opened-nav cn-wrapper`:'cn-wrapper' }
                    style={!this.state.csstransforms?{display: 'none'}:{}}>
                        <ul className="ul-menu-user">
                            <li>
                                <Link to="/login" onClick={()=>this.logout()}>
                                    <span className="fas fa-sign-out-alt" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/viewAll">
                                    <span className="fas fa-info-circle" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <img src="/logo-menu.jpg" />
                                </Link>
                            </li>
                            <li>
                            <Link to="/viewAll">
                                <span className="fas fa-folder" />
                            </Link>
                            </li>
                            <li>
                                <Link to={`/infouser/${jwt.data.userId}`}>
                                    <span className="fas fa-user" />
                                </Link>
                            </li>
                            </ul>
                    </div>
                    <div id="cn-overlay" className="cn-overlay"></div>
                </div>
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
