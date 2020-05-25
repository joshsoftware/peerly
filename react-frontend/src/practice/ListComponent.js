import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  return { articles: state.articles };
};

const ConnectedList = ({ articles }) => (
  <ul>
    {articles.map((el) => (
      <li key={el.id}>{el.title}</li>
    ))}
  </ul>
);

ConnectedList.propTypes = {
  articles: PropTypes.array.isRequired,
};

const List = connect(mapStateToProps)(ConnectedList);

export default List;
