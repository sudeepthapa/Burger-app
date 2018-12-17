import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import classes from './burger.css';
const burger =(props)=>{
    let transformedIngredients =Object.keys(props.ingredients)
        .map(igKey=>{
             return [...Array(props.ingredients[igKey])].map((_, i)=> {
                 return <BurgerIngredient key = {igKey+i} type = {igKey} />;
             });
        })
        .reduce((arr, el)=>{
            return arr.concat(el)
        }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please add some ingredients</p>;
       
    }
    console.log(transformedIngredients)
      
    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
export default burger;