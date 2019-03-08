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
    isLoading: false,
    error: ''
  };

  getRecipe = e => {
    e.preventDefault();
    let recipe = e.target.elements.recipe.value;

    recipe
      ? this.setState({ isLoading: true, error: '' }, () => {
          fetch(
            `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${
              process.env.REACT_APP_API_KEY
            }&q=${recipe}&page=2`
          )
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                let error = Object.assign(
                  {},
                  {
                    status: response.status,
                    statusText: response.statusText
                  }
                );
                this.setState({
                  error: error,
                  recipes: [],
                  isLoading: false
                });
                return Promise.reject(error);
              }
            })
            .then(data => {
              data.recipes.length !== 0
                ? this.setState({
                    recipes: data.recipes,
                    isLoading: false,
                    error: ''
                  })
                : this.setState({
                    error: 'No matching recipes were found',
                    isLoading: false,
                    recipes: []
                  });
            })
            .catch(error => {
              console.log('Fetching Failed: ', error.statusText);
            });
        })
      : this.setState({
          error: 'Please enter a recipe name or ingredient to continue'
        });
  };

  componentDidMount() {
    const json = sessionStorage.getItem('recipes');
    // if key does not exist, getItem returns null.
    // In that case, set state equal to empty array instead. Otherwise,
    // providing null as props to Recipes causes app to break.
    const recipes = JSON.parse(json) || [];
    this.setState({ recipes });
  }

  componentDidUpdate() {
    const recipes = JSON.stringify(this.state.recipes);
    sessionStorage.setItem('recipes', recipes);
  }

  render() {
    let loading = <img src={logo} className='App-logo' alt='logo' />;
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Crave</h1>
        </header>
        {this.state.error ? (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {this.state.error.statusText || this.state.error}
          </div>
        ) : null}
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
