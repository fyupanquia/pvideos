import React from 'react'
import { connect } from 'react-redux'
import Search from '../components/Search'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import '../assets/styles/App.scss'

// const API = 'http://localhost:3000/initalState'

const Home = ({ myList, trends, originals }) => {
  // const initialState = useInitialState(API);
  return (
    <React.Fragment>
      <Search isHome />
      {myList.length > 0 && (
        <Categories key='my-list-categories' title='Mi Lista'>
          <Carousel key='my-list-carousel'>
            {myList.map(item => (
              <CarouselItem key={`${item._id}my-list`} {...item} isList />
            ))}
          </Carousel>
        </Categories>
      )}
      <Categories key='trends-categories' title='Tendencias'>
        <Carousel key='trends-carousel'>
          {trends.map(item => (
            <CarouselItem key={`${item._id}trends`} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories key='originals-categories' title='Originales de Platzi Video'>
        <Carousel key='originals-carousel'>
          {originals.map(item => (
            <CarouselItem key={`${item._id}originals`} {...item} />
          ))}
        </Carousel>
      </Categories>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals
  }
}

export default connect(mapStateToProps, null)(Home)
