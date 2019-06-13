import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

const Card = props => {
  // {
  //   console.log(props.friend);
  // }
  return (
    <Link to={`/friends/${props.friend.id}`}>
      <div className="friend-card">
        <p>Name: {props.friend.name}</p>
        <p>Age: {props.friend.age}</p>
        <p>Email: {props.friend.email} </p>
      </div>
    </Link>
  );
};

Card.propTypes = {
  //fill out prop types
  friend: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
  })
};
export default Card;
