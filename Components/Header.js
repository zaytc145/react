import React from 'react';
import { Link } from 'react-router-dom';
import auth from './auth';
import IconDropdown from './IconDropdown';
import JP from '../style/images/icons/JP.svg';
import EN from '../style/images/icons/EN.svg';
import RU from '../style/images/icons/RU.svg';
import internet from '../style/images/icons/internet.svg';

class Header extends React.Component{
  
  state={
    show:false,
  }
  
  showMenu = () => {
    this.setState({show:!this.state.show})
  }

    
  render(){
    return(
      <header>
        <nav>
          <div className="logo">
            <h2>The Nav</h2>
          </div>
          <ul className={`nav-links ${this.state.show ? 'nav-active' : ''}`}>
            <li><Link to='/' onClick={() => this.setState({show:false})}>Main</Link></li>
            {!auth.getAuthStatus() ? 
            <>            
              <li><Link to='/registration' onClick={() => this.setState({show:false})}>Registration</Link></li>
              <li><Link to='/login' onClick={() => this.setState({show:false})}>Login</Link></li>
            </>:
            <>
              <li><Link to={`/${auth.getAuthUserRole().toLowerCase()}/cabinet/`} onClick={() => this.setState({show:false})}>Cabinet</Link></li>
             <li><Link to='/' 
             onClick={() => {
               this.setState({show:false})
               auth.logout();
              }}>Logout</Link></li>             
              </>
            }
            <li>
              <IconDropdown icon={internet}>
                <img src={JP} alt=""></img>
                <img src={EN} alt=""></img>
                <img src={RU} alt=""></img>
              </IconDropdown>
            </li>
          </ul>
          <div className="burger" onClick={this.showMenu}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>
        { this.state.show ? <div className="shadow" ></div>: ''}
      </header>
    )
  }
}

export default Header;