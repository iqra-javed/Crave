import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';
import dotenv from 'dotenv';

dotenv.config();

class App extends Component {
  state = {
    recipes: []
  };

  getRecipe = async e => {
    e.preventDefault();
    let recipe = e.target.elements.recipe.value;

    const api_call = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${
        process.env.REACT_APP_API_KEY
      }&q=${recipe}&page=2`
    );
    const data = await api_call.json();
    this.setState({ recipes: data.recipes });
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Crave</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
