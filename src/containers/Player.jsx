import React, { useEffect, useState } from'react'
import { connect } from 'react-redux'
import { getVideoSource } from '../actions'
import { Redirect } from 'react-router-dom'
import '../assets/styles/components/Player.scss'

const Player = props => {
    const { id } = props.match.params;
    //const [ loading, setLoading ] = useState(false)
    //const hasPlaying =  Object.keys(props.playing).length > 0;
    //const NotFound   = typeof playing === false;


    useEffect(()=> {
        if (props.playing===null || (props.playing!=null && props.playing.id!=id) ) {
            props.getVideoSource(id);
        } else {
            //if (props.playing.id!=id) {
            //    props.playing = null;
            //}
        }
    }, [props.playing]);

    console.log(props.playing)

    return  props.playing ==null ? 
            <h2>Loading...</h2> :
            (
                props.playing ? (
                    <div className="Player">
                        <video controls={true} autoPlay>
                            <source src={ props.playing.source } type="video/mp4" />
                        </video>
                        <div className="Player-back">
                            <button type="button" onClick={ () => props.history.goBack() }>
                                Regresar
                            </button>
                        </div>
                    </div>
                ) : <Redirect to="/404/" />
            );

            // <Redirect to="/404/" />
}

const mapStateToProps = state => {
    return {
        playing : state.playing
    }
}

const mapDispatchToProps = {
    getVideoSource
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)