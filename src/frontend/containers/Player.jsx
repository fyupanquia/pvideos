/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
//import { Redirect } from 'react-router-dom'
import { getVideoSource } from '../actions'
import '../assets/styles/components/Player.scss'

const Player = (props) => {
  const { id } = props.match.params
  console.log(id, '<<<<')
  useEffect(() => {
    if (
      props.playing === null ||
      (props.playing != null && props.playing.id !== id)
    ) {
      props.getVideoSource(id)
    } else {
      // if (props.playing.id!=id) {
      //    props.playing = null;
      // }
    }
  }, [props.playing])

  return props.playing == null ? (
    <h2>Loading...</h2>
  ) : props.playing ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={props.playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <span>NOOO</span>
  )

  // <Redirect to="/404/" />
}

const mapStateToProps = (state) => {
  return {
    playing: state.playing
  }
}

const mapDispatchToProps = {
  getVideoSource
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
