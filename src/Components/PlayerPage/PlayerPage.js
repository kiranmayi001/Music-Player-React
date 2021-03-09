import classes from './PlayerPage.module.css'
import React, { Component } from 'react'

import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faRandom, faPlayCircle, faStepBackward, faStepForward, faRedoAlt, faVolumeMute, faPauseCircle, faVolumeDown } from "@fortawesome/free-solid-svg-icons"

export default class PlayerPage extends Component {
    constructor(props) {
        super(props);
        this.playPause = React.createRef()
        this.inputProgress = React.createRef()
        this.state = {
            data: {},
            playButton: 'true',
            id: 1,
            value: 0,
            v: 0,
            audioDuration: 0,
            currentDuration: 0,
            audioMute: false,
            currentProgressBar:0

        }
    }


    componentDidMount() {
        this.setState({ id: this.props.match.params.vId })
      this.setState({currentProgressBar:0})
        // this.setState({ audioDuration: 0})
        // this.setState({ audioDuration: this.playPause.current.duration })
        axios.get(`https://5ff9e67117386d0017b52317.mockapi.io/musicplayer/${this.state.id}`)
            .then(response => {
                console.log(response.data)
                // alert("cdm")
                this.setState({currentProgressBar:0})
                this.setState({ data: response.data })
                console.log(this.state.data.file.duration)
                // this.setState({ audioDuration: JSON.parse(this.playPause.current.duration )})
            })

            .catch(err => {
                console.log("Error")
            })
    }

    componentDidUpdate(prevProps, prevState) {
        
        // this.setState({ id: this.props.match.params.vId })
        if (prevState.id !== this.state.id) {
           
            // this.setState({ audioDuration: JSON.parse(this.playPause.current.duration)})
            axios.get(`https://5ff9e67117386d0017b52317.mockapi.io/musicplayer/${this.state.id}`)
                .then(response => {
                    console.log(response.data)
                    this.setState({ data: response.data })
                    this.setState({currentProgressBar:0})
                })
                .catch(err => {
                    console.log("Error")
                })
        }
    }



    HandlePlay = () => {
        // this.setState({currentProgressBar:0})
        this.setState({ audioDuration: this.playPause.current.duration })
        // this.setState({ playButton: !this.state.playButton })
        if (this.state.playButton === 'true') {

            this.playPause.current.play()
            // console.log()
            // this.setState({ currentDuration: this.playPause.current.currentTime })

            this.setState({ playButton: 'false' })
        } else {
            this.playPause.current.pause()

            this.setState({ playButton: 'true' })
        }
        console.log(this.state.playButton)
    }


    HandleForwordButton = () => {
        // this.setState({currentProgressBar:0})
     
        this.setState({ playButton: 'true' })
        this.playPause.current.play()
        this.setState({ audioDuration: this.playPause.current.duration })

        if (this.state.id !== this.props.location.state) {
            // if(this.playPause.current.duration){
            this.setState({ id: parseInt(this.state.id) + 1 })
            // alert("bro")
            // this.setState({currentProgressBar:0})
            alert(this.state.id)
        } else {
            this.setState({ id: 0 })
        }
    }
    // }

    HandleBackwordButton = () => {
        this.inputProgress.current.value=0;
        this.setState({ audioDuration: this.playPause.current.duration })
        if (this.state.id !== 0) {
            this.setState({ id: parseInt(this.state.id) - 1 })
            alert(this.state.id)
        }
    }


    HandleAudioRange = (e) => {
        if (e.target.value != 0) {
            this.setState({ value: (e.target.value / 100), v: (e.target.value / 100) })
            console.log(e.target.value / 100)
            this.playPause.current.volume = this.state.value;
        } else {
            this.setState({ value: 0 })
            this.playPause.current.volume = 0
        }
    }


    HandleMuteUnMute = () => {
        this.setState({ audioMute: !this.state.audioMute })

        if (this.state.audioDuration !== false) {
            this.setState({ value: 0 })
            this.playPause.current.volume = this.state.value;
        } else {
            this.setState({ value: this.state.v })
            this.playPause.current.volume = this.state.v;
        }
    }

    // AudiProgressBar = (e) => {
    //     console.log(e.target.value)
    //     e.target.value = this.state.currentDuration
    //     this.setState({ currentDuration: e.target.value })
    // }

    //To Handle the auto forword of the audio progress bar
    audioProgress = (e) => {
        console.log(e)
        console.log(e.nativeEvent.srcElement.currentTime)
        this.setState({ currentDuration: e.nativeEvent.srcElement.currentTime })
        this.setState({ currentProgressBar: (this.state.currentDuration / this.state.audioDuration) * 100 })
    }

    handleProgressBar = () => {
        
        this.setState({ currentProgressBar:0 })
    }

    render() {

        console.log(this.state.AudioDuration)
        return (
            <div className={classes.wrap}>
                <div className={classes.Opacity}>
                </div>
                <div className={classes.PlayerPage} style={{ backgroundImage: `url(${this.state.data.albumCover})`, width: '100%', height: '100vh', backgroundPosition: 'initial' }}>
                    {/* <div  styles={{ backgroundImage:`url(${car})` }}>   */}

                    <div className={classes.Wrapper}>

                        <img src={this.state.data.albumCover} alt="musicCover" className={classes.SongImage} />
                        <h2 className={classes.SongName}>{this.state.data.track}</h2>
                        <p className={classes.ArtistName}>{this.state.data.artist}</p>



                    </div>
                    <div className={classes.SongControls}>
                        <div className={classes.ControlWrapper}>

                            {/* // onTimeUpdate inbuild method to keep updating the time every seconde with refrence to the current time */}
                            <audio src={this.state.data.file} type="audio/mp3" ref={this.playPause} onTimeUpdate={(e) => { this.audioProgress(e) }}> </audio>
                            <input type="range" class={classes.Progressbar} ref={this.inputProgress} className={classes.AudiProgressBar} value={this.state.currentProgressBar}  onChange={this.handleProgressBar} />

                        </div>
                        <div className={classes.ControlStyle}>
                            <p className={classes.SongNames}>{this.state.data.track}</p>
                            <div className={classes.Icons}>

                                < FontAwesomeIcon icon={faRandom} className={classes.RandomButton} />
                                < FontAwesomeIcon icon={faStepBackward} className={classes.backwordButton} onClick={this.HandleBackwordButton} />
                                {this.state.playButton === "true" ?
                                    < FontAwesomeIcon icon={faPlayCircle} className={classes.PlayButton} onClick={this.HandlePlay} />
                                    :
                                    < FontAwesomeIcon icon={faPauseCircle} className={classes.PlayButton} onClick={this.HandlePlay} />}
                                < FontAwesomeIcon icon={faStepForward} className={classes.ForwordButton} onClick={this.HandleForwordButton} />
                                < FontAwesomeIcon icon={faRedoAlt} className={classes.RepeatButton} />
                            </div>

                            <div className={classes.AudioDurationWrapper}>

                                <p className={classes.AudioDuration}>{
                                (Math.floor((this.state.currentDuration) / 60))}:{Math.floor((this.state.currentDuration%60))}
                                /{(((this.state.audioDuration) / 60).toFixed(2)).split(".").join(":")}</p>

                                <input type="range" className={classes.AudioController} onChange={(e) => this.HandleAudioRange(e)} />
                                {
                                    this.state.audioMute === false ?
                                        <FontAwesomeIcon icon={faVolumeDown} className={classes.MuteButton} onClick={this.HandleMuteUnMute} />
                                        :
                                        <FontAwesomeIcon icon={faVolumeMute} className={classes.MuteButton} onClick={this.HandleMuteUnMute} />

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}