import { createStore } from "redux";
import rootReducer from "./LoginReducer";

const store = createStore(rootReducer);
export default store;
