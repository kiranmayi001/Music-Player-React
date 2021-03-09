import React, { Component } from 'react'
import classes from './HomePage.module.css'

import axios from "axios"

import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

export class HomePage extends Component {


    state = {
        musicData: [],
        dataLength: 0
    }
    componentDidMount() {
        axios.get("https://5ff9e67117386d0017b52317.mockapi.io/musicplayer")
            .then(response => {
                console.log(response.data)

                this.setState({ musicData: response.data, dataLength: response.data.length })
            })
            .catch(err => {
                console.log("Error")
            })
    }
    render() {
        console.log(this.state.dataLength)
        let musicCards = this.state.musicData.map(item => {
            return (
                <Link to={{
                    pathname: `/PlayerPage/${item.id}`,
                    state: this.state.dataLength
                }} className={classes.MusicCard} >
                    <div >

                        <img src={item.albumCover} className={classes.SongImage} />
                        {/* <FontAwesomeIcon icon={faPlay} className={classes.PlayButton}/> */}
                        <h2 className={classes.SongName}>{item.track}</h2>
                        <p className={classes.ArtistName}>{item.artist}</p>
                    </div>
                </Link>
            )
        })

        return (
            <div className={classes.HomePage}>
                {musicCards}
            </div>
        )
    }
}

export default HomePage




