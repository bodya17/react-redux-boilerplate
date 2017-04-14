function posts(state = [], action) {
  switch(action.type) {
    case 'INCREMENT_LIKES' :
      console.log("Incrementing Likes!!");
      const i = action.index;
      return [
        ...state.slice(0,i), // before the one we are updating
        {...state[i], likes: state[i].likes - 100},
        ...state.slice(i + 1), // after the one we are updating
      ];

    case 'ADD_POST':
      // const {code, caption, likes, id, display_src} = action;
      return state.concat(action.post)
    default:
      return state;
  }
}

export default posts;
