import React from 'react';
import classes from "./buildControl.css"
const buildControl = (props) =>{
    <div className = {classes.buildControl}>
        <div className={classes.label}>{props.label}</div>
        <button className = {classes.less}>Less</button>
        <button className = {classes.more}>Add</button>

    </div>
} 


export default buildControl;