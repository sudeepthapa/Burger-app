import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
export default class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name Here'
                },
                value:''
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipCode:  {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:''
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email Here'
                },
                value:''
            },
            deliveryMethod:  {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest' ,displayValue:'Fastest'},
                        {value:'cheapest' , displayValue:'Cheapest'}
                    ]
                },
                value:''
            },
        }
    }

    orderHandler=(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        const formData={};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients:this.props.ingredients ? this.props.ingredients:null,
            price : this.props.price,
            orderData:formData  
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

    inputChangedHandler = (event, inputIdentifiers)=>{
            // console.log(event.target.value);
        const updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifiers]
        };
        updatedFormElement.value=event.target.value;
        updatedOrderForm[inputIdentifiers] =updatedFormElement;  
        this.setState({orderForm:updatedOrderForm})
    }

    render() {
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=(
             <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event)=>this.inputChangedHandler(event,formElement.id)} />
                    ))}
                    <Button btnType="Success" >Order</Button>
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
