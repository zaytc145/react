import React from 'react'; 
import Sidebar from '../Sidebar';

class SecondLayout extends React.Component {
    state = {
        mini:true,
    }
    
    changeVue = () => {
        this.setState({mini:!this.state.mini})
    }

    render(){
        return (
            <div>
                <Sidebar 
                mini={this.state.mini}
                changeVue={this.changeVue}
                />
                <div id="main">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default SecondLayout;