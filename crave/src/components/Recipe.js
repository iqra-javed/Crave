import React, { Component } from 'react';
import dotenv from 'dotenv';

dotenv.config();

class Recipe extends Component {
  state = {
    activeRecipe: []
  };

  async componentDidMount() {
    let title = this.props.location.state.recipe;

    let req = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${
        process.env.REACT_APP_API_KEY
      }&q=${title}`
    );
    let res = await req.json();

    this.setState({ activeRecipe: res.recipes[0] });
  }

  render() {
    const recipe = this.state.activeRecipe;
    return (
      <div className='container'>
        <div className='active-recipe'>
          <img
            className='active-recipe__img'
            src={recipe.image_url}
            alt={recipe.title}
          />
          <h3 className='active-recipe__title'>{recipe.title}</h3>
          <h4 className='active-recipe__publisher'>
            Publisher: <span>{recipe.publisher}</span>
          </h4>
          <p className='active-recipe__website'>
            Website:{' '}
            <span>
              <a href={recipe.publisher_url}>{recipe.publisher_url}</a>
            </span>
          </p>
          <button className='active-recipe__button'>Go Home</button>
        </div>
      </div>
    );
  }
}

export default Recipe;