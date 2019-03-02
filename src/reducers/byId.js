export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_REVIEWS_SUCCESS": {
      const newState = { ...state };
      action.reviews.forEach(r => {
        newState[r.reviewId] = r;
      });
      return newState;
    }

    default:
      return state;
  }
};
