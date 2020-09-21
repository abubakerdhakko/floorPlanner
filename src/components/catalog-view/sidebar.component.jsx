import React, { Component } from "react";

import "./new-catalog-item.styles.css";
import CatalogItem from "./catalog-item";
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
    };
  }

  toggleMenu(menu) {
    return this.setState((prevState) => {
      console.log("prev", prevState);
      if (prevState.active == menu) menu = "";
      return {
        active: menu,
      };
    });
    // return this.setState({ active: menu });
  }

  handleActiveMenu(menu) {
    return this.state.active == menu ? "d-block" : "d-none";
  }

  render() {
    const { list, listItems } = this.props;

    // console.log("list", list);
    return (
      <nav id="tool-menu">
        <ul className="parent-menu">
          {list.map((category) => {
            return (
              <li className="" onClick={() => this.toggleMenu(category.name)}>
                {category.label}
                <ul className={this.handleActiveMenu(category.name)}>
                  {category.elements.map((elem) => {
                    // console.log("elem", elem);
                    return (
                      <li>
                        <CatalogItem key={elem.name} element={elem} />
                      </li>
                    );
                    // return <li>{elem.info.title}</li>;
                  })}
                </ul>
              </li>
            );
          })}

          {listItems.map((elemss) => (
            <CatalogItem key={elemss.name} element={elemss} />
          ))}
          {/* <li onClick={() => this.toggleMenu("window")}>
            Window
            <ul className={this.handleActiveMenu("window")}>
              <li>1st window</li>
              <li>2nd widnow</li>
              <li>third window</li>
            </ul>
          </li> */}
          {/* <li onClick={() => this.toggleMenu("door")}>
            Door
            <ul className={this.handleActiveMenu("door")}>
              <li>1st door</li>
              <li>2nd door</li>
              <li>third door</li>
            </ul>
          </li> */}
        </ul>
      </nav>
    );
  }
}

{
  /* <CatalogItem key={elem.name} element={elem} /> */
}
