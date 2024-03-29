import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drinks" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="Explore" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="Food" />
      </Link>

    </footer>
  );
}

export default Footer;
