import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const buildControls = (props) =>{
    <div className={classes.BuildControls}>
        <BuildControl />
    </div>
}

export default buildControls;