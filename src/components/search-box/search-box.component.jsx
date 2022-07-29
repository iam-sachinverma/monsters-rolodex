import { Component } from "react";
import "./search-box.styles.css";

class SearchBox extends Component {
  render() {
    console.log("SearchBox Comp render");
    return (
      <div>
        <input
          type='search'
          className={`search-box ${this.props.className}`}
          placeholder={this.props.placeholder}
          onChange={this.props.onChangeHandler}
        />
      </div>
    );
  }
}

export default SearchBox;
