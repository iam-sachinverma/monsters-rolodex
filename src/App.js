import { useState, useEffect } from "react";

import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import "./App.css";

// render whole func comp
const App = () => {
  console.log("App comp render");

  // hooks searchField initial value = " " and render App() whenever searchField value different from prev
  // searchField trigger render()

  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  // console.log({ searchField });

  // ! Re-rendering infinite loop
  /* 
    As we know app re-render when special var in hooks update
    so fetching data from internet comes in different memory location so
    react thinks it is a different value of special var and it re render again and again  
  
    We avoid this using side effects using useEffect
  */

  /* 
    useeffect take two params 1. callback() 2.[] of depencies -- values that our side effect relies upon
    callback() trigger whenever values in depencies [] change
    
    To run useEffect() only one time incase of API fetching we pass empty [] to run once when
    app comp init

  */

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setMonsters(data));
  }, []);

  // usecase of effectsdepenencies: whenever [monsters, searchField] change only when this func excuted
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      // includes is not case sentivie
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;

/*

In class render() will run whenever there were 1.Mounting and 2.Update Cycles
and Update Cycle run whenever props changes or states updated
code inside render() will render

*/

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchString: "",
//     };
//     console.log("1. Consturctor Comp Init");
//   }

//   it fires only when comp mount()
//   componentDidMount() {
//     console.log("3. Mounted");
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((data) =>
//         this.setState(
//           () => {
//             return { monsters: data };
//           },
//           () => {
//             console.log(this.state);
//           }
//         )
//       );
//   }

//   onSearchChange = (e) => {
//     // console.log(e.target.value);
//     const searchString = e.target.value.toLowerCase();
//     this.setState(() => {
//       return { searchString };
//     });
//   };

//   render() {
//     console.log("3. Render from App Comp");

//     const filteredMonstersArr = this.state.monsters.filter((monster) => {
//       // includes is not case sentivie
//       return monster.name.toLowerCase().includes(this.state.searchString);
//     });

//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>

//         <SearchBox
//           className='monsters-search-box'
//           onChangeHandler={this.onSearchChange}
//           placeholder='search monsters'
//         />
//         <CardList monsters={filteredMonstersArr} />
//       </div>
//     );
//   }
// }
