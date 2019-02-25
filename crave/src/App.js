import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';

class App extends Component {

  getRecipe = e => {
    e.preventDefault();
    let recipe = e.target.elements.recipe.value;
    console.log(recipe)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Crave</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
      </div>
    );
  }
}

export default App;
