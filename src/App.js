import React, { Component } from 'react';
import { SearchBox } from "./components/search-box/search-box.component.jsx";
import { CardList } from "./components/card-list/card-list.component.jsx";
//import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      monsters : [
        {id : 1, name : 'Frankeistein'}, {id : 2, name : 'Dracula'}, {id : 3, name : 'Zombie'},
        {id : 4, name : 'Elegun'}, {id : 5, name : 'Armadioha'}, {id : 6, name : 'Sango'},
        {id : 7, name : 'Egbere'}, {id : 8, name : 'Osanyi'},{id : 9, name : 'Omiomio'}, 
        {id : 10, name : 'Wileewilee'}
        //{id : 10, name : 'Wileewilee111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'}
      ],
      searchField:"",
      num_of_lives: 0
    }
    this.props = props
  };


//componentDidMount(){
//  fetch("./justText.text")
//  .then(response => response.text())
//  .then(user => this.setState({ monsters:user }))
//}

onSearchChange = e => {
  this.setState({searchField:e.target.value})
}
onIncreaseLive = () => {
  this.setState((prevState, prevProps) => {
    return { num_of_lives:prevState.num_of_lives + prevProps.increase }
    // OR USE
    //return { num_of_lives:prevState.num_of_lives + this.props.increase }
  }, () => console.log(this.state.num_of_lives))
}
render() {
  const { monsters, searchField } = this.state
  const findMonster = monsters.filter(monster => 
        monster.name.toLowerCase().includes(searchField.toLowerCase())
  )

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <p>{this.state.num_of_lives}</p>
      <SearchBox 
        placeholder="search monster" 
        onSearchChange = {this.onSearchChange}
        onIncreaseLive = {this.onIncreaseLive}
      />
      <CardList monsters={ findMonster } />
    </div>
  );
 }
}
 
export default App; 

//monsters-rolodex
//SHA256:+DiY3wvvV6TuJJhbpZisF/zLDAOzPMSvHdkr4UvCOqU



