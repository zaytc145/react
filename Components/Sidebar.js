import React from "react";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: ""
    };

    this.links = [
      { icon: "assignment_ind", text: "Кабинет", to: "/company/cabinet" },
      { icon: "home", text: "Объекты", to: "/company/cabinet/objects" },
      { icon: "perm_identity", text: "Прорабы", to: "/company/cabinet/foremen" },
      { icon: "people", text: "Бригады", to: "/" },
      { icon: "insert_chart", text: "График Прорабов", to: "/" },
      { icon: "insert_chart", text: "График Бригады", to: "/" },
      { icon: "assignment", text: "Чек-листы", to: "/" },
      { icon: "account_circle", text: "Личный кабинет", to: "/" },
      { icon: "business_center", text: "Технологии", to: "/" },
      { icon: "cancel", text: "Выйти", to: "/" }
    ];
  }

  addActiveClass = e => {
    const clicked = e.target.closest("a").id;
    if (
      this.state.selected === clicked &&
      e.target.closest("a").className !== "selected"
    ) {
      this.setState({ selected: "" });
    } else {
      this.setState({ selected: clicked });
    }
  };

  componentDidMount = () => {
    this.setState({ selected: localStorage.getItem("selected") });
  };

  showLinks = () => {
      return this.linksTemplate(this.links);
  };

  linksTemplate = links => {
    return links.map((el, i) => {
      return (
        <Link
          key={i}
          className={this.state.selected === `link-${i + 1}` ? "selected" : ""}
          id={`link-${i + 1}`}
          to={el.to}
          onClick={this.addActiveClass}
        >
          <span>
            <i className="material-icons">{el.icon}</i>
          </span>
          <span className="icon-text">{el.text}</span>
        </Link>
      );
    });
  };

  render(){
    return (
      <div
        id="mySidebar"
        className="sidebar"
        onMouseOver={this.props.changeVue}
        onMouseOut={this.props.changeVue}
        style={this.props.mini ? { width: "55px" } : { width: "245px" }}
      >
        {this.showLinks("builder")}
      </div>
    );
  }
}

export default Sidebar;
