import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICES ={
    salad:0.5,
    cheese:0.6,
    meat:1,
    bacon:0.4
}
class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props)
    //     this.state = {...}
    // }
    state = {
        ingredients:null,
        totalPrice:4,
        purchaseable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('https://react-my-burger1.firebaseio.com/Ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data})
        })
        .catch(error =>[
            this.setState({error:true})
        ])
    }

    updatePurchaseState(ingredients){
    
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({
            purchaseable: sum>0
        })
    }

    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] =updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] =updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceDeduction;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        //alert("You have successfully ordered");


        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice)
        const queryString = queryParams.join("&")

        this.props.history.push({
            pathname:"/checkout",
            search: "?" + queryString 
        })
    }

    render(){   
        const disabledInfo ={   
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary=null;

         

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
         if(this.state.ingredients){
            burger = (
                <Aux>
                       <Burger ingredients={this.state.ingredients} />
                       <BuildControls 
                           ingredientAdded={this.addIngredientHandler} 
                           ingredientDeleted = {this.removeIngredientHandler}
                           purchaseable= {this.state.purchaseable}
                           disabled = {disabledInfo}
                           price={this.state.totalPrice} 
                           ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary=<OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice }
                />
   
         }
         if(this.state.loading){
            orderSummary=<Spinner />
         }


        return(
            <Aux>

                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
               
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);