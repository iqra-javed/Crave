import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';
import logo from './logo.svg';
import dotenv from 'dotenv';


dotenv.config();

class App extends Component {
  state = {
    recipes: [],
    isLoading: false
  };

  getRecipe = e => {
    e.preventDefault();
    let recipe = e.target.elements.recipe.value;

    this.setState({isLoading: true}, async () => {
      const api_call = await fetch(
        `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${
          process.env.REACT_APP_API_KEY
        }&q=${recipe}&page=2`
      );
      const data = await api_call.json();
      this.setState({ recipes: data.recipes, isLoading: false });
    })

    
  };

  componentDidMount() {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  }

  componentDidUpdate() {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }

  render() {
    let loading = <img src={logo} className='App-logo' alt='logo' />;
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Crave</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        {this.state.isLoading ? loading :  <Recipes recipes={this.state.recipes} /> }
       
      </div>
    );
  }
}

export default App;
