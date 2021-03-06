import React from 'react';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

const Explore = () => {
  return (
    <div className='explore'>
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
      <Slider />
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent"> 
            <img
              className='exploreCategoryImg' 
              src={ rentCategoryImage}
             alt="rent category" />
             <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to="/category/sale"> 
            <img
              className='exploreCategoryImg' 
              src={ sellCategoryImage}
             alt="sell category" />
             <p className="exploreCategoryName">Places for Sale</p>
          </Link>
        </div>
      </main>
      </div>
  )
}

export default Explore;