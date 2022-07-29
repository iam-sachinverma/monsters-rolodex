import { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchString: "",
    };
    console.log("1. Consturctor Comp Init");
  }

  componentDidMount() {
    console.log("3. Mounted");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          () => {
            return { monsters: data };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onSearchChange = (e) => {
    // console.log(e.target.value);
    const searchString = e.target.value.toLowerCase();
    this.setState(() => {
      return { searchString };
    });
  };

  render() {
    console.log("3. Render from App Comp");

    const filteredMonstersArr = this.state.monsters.filter((monster) => {
      // includes is not case sentivie
      return monster.name.toLowerCase().includes(this.state.searchString);
    });

    return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>

        <SearchBox
          className='monsters-search-box'
          onChangeHandler={this.onSearchChange}
          placeholder='search monsters'
        />
        <CardList monsters={filteredMonstersArr} />
      </div>
    );
  }
}

export default App;
