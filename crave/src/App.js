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

    this.setState({ isLoading: true }, async () => {
      const api_call = await fetch(
        `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${
          process.env.REACT_APP_API_KEY
        }&q=${recipe}&page=2`
      );
      const data = await api_call.json();
      this.setState({ recipes: data.recipes, isLoading: false });
    });

    //   try {
    //     let response = await fetch('/no-user-here');
    //     let user = await response.json();
    //   } catch(err) {
    //     // catches errors both in fetch and response.json
    //     alert(err);
    //   }
    // }
  };

  componentDidMount() {
    const json = localStorage.getItem('recipes');
    console.log("componentDidMount")
    console.log(json)
    // if local storage is an empty array, getItem returns null.
    // In that case, set state equal to empty array instead. Otherwise if
    // Providing null as props to Recipes causes app to break.
    const recipes = JSON.parse(json) || [];
    this.setState({ recipes });
  }

  componentDidUpdate() {
    console.log("componentDIdUpdate")
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
  }

  render() {
    let loading = <img src={logo} className='App-logo' alt='logo' />;
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Crave</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        {this.state.isLoading ? (
          loading
        ) : (
          <Recipes recipes={this.state.recipes} />
        )}
      </div>
    );
  }
}

export default App;
