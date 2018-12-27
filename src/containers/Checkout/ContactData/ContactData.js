import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
export default class ContactData extends Component {

    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler=(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients:this.props.ingredients ? this.props.ingredients:null,
            price : this.props.price,
            customer:{
                name:'sudip',
                address:{
                    street: "teststreet",
                    zipCode:'12345',
                    country:"Nepal"
                },
                email:"test@gmail.com",
               
            },
            deliveryMethod:"fastest"
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false});
            this.props.history.push('/');
        }) 
        .catch(error=>{
            this.setState({loading:false});

        })
    }

    render() {
        let form=(
             <form>
                    <input className={classes.input} type="text" name="name" placeholder="Your Name here" />
                    <input className={classes.input} type="email" name="email" placeholder="Your Email here" />
                    <input className={classes.input} type="text" name="street" placeholder="Street" />
                    <input className={classes.input} type="number" name="postalcode" placeholder="PostalCode" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
        );
        if(this.state.loading){
            form=<Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
               {form}
            </div>
        )
    }
}
