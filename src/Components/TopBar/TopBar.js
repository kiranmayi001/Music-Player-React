import React, { Component } from 'react'
import classes from './TopBar.module.css'



export class TopBar extends Component {


    render() {
        return (
            <div className={classes.TopBar}>
                <h1 className={classes.Logo}>LiveWire</h1>
                <input type="search" className={classes.SearchField} />
            </div>
        )
    }
}

export default TopBar


