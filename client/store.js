import { createStore, compose } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import { persistStore, autoRehydrate } from 'redux-persist';
// import the root reducer
import rootReducer from './reducers/index';
import * as actions from './actions/actionCreators'

import comments from './data/comments';
import posts from './data/posts';


console.log('Actions: ', actions);
// create an object for the default data
const defaultState = {
  posts,
  comments
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

// const store = createStore(rootReducer, autoRehydrate());
const store = createStore(rootReducer, defaultState, enhancers);
persistStore(store)

// defaultState.posts.forEach((post, i) => {
//     store.dispatch(actions.addPost(post))
// })

// for (let postId in defaultState.comments) {

//     defaultState.comments[postId].forEach(c => {
//       console.log(c)
//       store.dispatch(actions.addComment(postId, c.user, c.text))
//     })
// }

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}


export default store;
