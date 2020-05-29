import React  from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutRequest } from '../actions'
import gravatar from '..//utils/gravatar'
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = props => {
    const {user} = props 

    const hasUser = user!=null && user!=undefined && Object.keys(user).length > 0;
    //const hasUser = user ? true : false;

    const handleLogout =  event => {
        event.preventDefault();
        props.logoutRequest({})
    }
    return (
        <header className="header">
          <img className="header__img" src={logo} alt="Platzi Video" />
          <div className="header__menu">
            <div className="header__menu--profile">
                {
                    hasUser ? 
                    <img src={ gravatar(user.email) } alt={user.email} /> :
                    <img src={userIcon} alt="" />
                }
              <p>Perfil</p>
            </div>
            <ul>
                {
                    hasUser ?
                        <>
                        {/* <li><Link to="/">{user.email}</Link></li> */}
                        <li><Link to="/logout" onClick={ handleLogout } >Logout</Link></li>
                        </>
                    :
                    <li><Link to="/login">Login</Link></li>
                }
            </ul>
          </div>
        </header>
      );
}


const mapStateToProps = state => {
  return {
    user : state.user
  }
}

const dispatchStateToProps = {
    logoutRequest
}

export default connect(mapStateToProps, dispatchStateToProps)(Header);
