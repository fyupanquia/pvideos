import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import  { setFavourite, deleteFavourite } from '../actions'
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, isList } = props

  const handleSetFavourite = () => {
    props.setFavourite({
      id, cover, title, year, contentRating, duration
    })
  }

  const handleDeleteFavourite = () => {
        props.deleteFavourite(id)
  }

   return (
      <div className="carousel-item">
        <img className="carousel-item__img" src={cover} alt={title}  />
        <div className="carousel-item__details">
          <div>
            {/* 
                <img className="carousel-item__details--img" src={playIcon} alt="Play" />
            */}
            {
                isList ?
                <img className="carousel-item__details--img" src={removeIcon} alt="Remove" onClick={handleDeleteFavourite}/> :
                <img className="carousel-item__details--img" src={plusIcon} alt="Add" onClick={handleSetFavourite}/>
            }
          </div>
          <p className="carousel-item__details--title">{title}</p>
          <p className="carousel-item__details--subtitle">
            {`${year} ${contentRating} ${duration}`}
          </p>
        </div>
      </div>
    )
}


CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
}

const  mapDispatchToProps = {
  setFavourite,
  deleteFavourite
}

export default connect(null, mapDispatchToProps)(CarouselItem)