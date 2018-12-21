import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'
const orderSummary = (props)=>{
    const ingredientSummary = Object.keys(props.ingredients).map(igKey=>{
        return <li key={igKey}><strong>{igKey}</strong>:{props.ingredients[igKey]}</li>
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>    
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>


        </Aux>

    )
}

export default orderSummary;