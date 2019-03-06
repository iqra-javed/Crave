import React from 'react';

const Recipes = props => (
  <div className='container'>
    <div className='row'>
      {props.recipes.map(recipe => (
        <div
          key={recipe.recipe_id}
          className='col-md-4'
          style={{ marginBottom: '2rem' }}
        >
          <div className='recipe__box'>
            <img
              className='recipe__box-img'
              src={recipe.image_url}
              alt={recipe.title}
            />
            <div className='recipe__text'>
              <h5 className='recipe__title'>{recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...`}</h5>
              <p className='recipe__subtitle'>
                Publisher: <span>{recipe.publisher}</span>
              </p>
            </div>
            <button className="recipe__button">View Recipe</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// const Recipes = props => (
//   <div>
//     {props.recipes.map(recipe => (
//       <div key={recipe.recipe_id}>
//         <img src={recipe.image_url} alt={recipe.title} />
//         <p>{recipe.title}</p>
//       </div>
//     ))}
//   </div>
// );

export default Recipes;
