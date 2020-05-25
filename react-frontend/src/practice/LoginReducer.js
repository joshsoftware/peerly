import { ADD_ARTICLE } from "./LoginAction";

const initialState = {
  articles: [{ title: "React Redux Tutorial for Beginners", id: 1 }],
};

const rootReducer = (state = initialState, action) => {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload),
    });
  }
  return state;
};

export default rootReducer;
