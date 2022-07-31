// import { Component } from "react";
import "./search-box.styles.css";

const SearchBox = ({ className, placeholder, onChangeHandler }) => {
  return (
    <div>
      <input
        type='search'
        className={`search-box ${className}`}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};

// class SearchBox extends Component {
//   render() {
//     console.log("SearchBox Comp render");
//     return (
//       <div>
//         <input
//           type='search'
//           className={`search-box ${this.props.className}`}
//           placeholder={this.props.placeholder}
//           onChange={this.props.onChangeHandler}
//         />
//       </div>
//     );
//   }
// }

export default SearchBox;
