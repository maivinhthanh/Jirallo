import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

import './menuuser.css'
import * as Config from '../../Config';


class MenuUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            csstransforms: false
        }
      }
    addClass = () =>{
        this.setState({
            csstransforms : !this.state.csstransforms
        })
    }
    render() {
        let user = JSON.parse(localStorage.getItem('user'))
        let jwt = jwtDecode(Cookies.get('token'))
        return (
            <div>
                <div className='menuuser'>
                    <button className="cn-button" onClick={() => this.addClass()} 
                        style={this.props.isUserPage?{top : '0%'}:{}}>
                    <img className="avatar-image" src={user.image !== null? Config.API_URL  + "/" + user.image : user.avatar} height={96} width={96}/>
                    </button>
                    <div className={this.state.csstransforms? `csstransforms opened-nav cn-wrapper`:'cn-wrapper' }
                    style={!this.state.csstransforms?{display: 'none'}:{}}>
                        <ul className="ul-menu-user">
                            <li>
                                <Link to="/viewAll">
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
                                    <span className="fas fa-home" />
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
export default MenuUser
