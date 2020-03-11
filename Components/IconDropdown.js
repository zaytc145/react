import React from "react";

class Dropdown extends React.Component {
  dropdown = React.createRef();
  state = {
    showDD: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.dropdown.current && !this.dropdown.current.contains(event.target)) {
      this.setState({
        showDD: false,
      });
    }
  };

  handleClick = () => {
    this.setState(state => {
      return {
        showDD: !state.showDD,
      };
    });
  };

  render() {
    return (
      <div className="dropdown" ref={this.dropdown}>
      <img onClick={this.handleClick} src={this.props.icon} alt="select-icon" className="select-icon"></img>
        <div id="myDropdown" className={`dropdown-content ${ this.state.showDD ? "show" : null}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
