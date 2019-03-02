import { Api } from "../api/api";

export const fetchReviews = page => dispatch => {
  dispatch({ type: "FETCH_REVIEWS_REQUEST" });
  return Api.getReviews(page).then(
    res => {
      dispatch({
        type: "FETCH_REVIEWS_SUCCESS",
        reviews: res.reviews,
        hasMore: res.hasMore,
        page
      });
    },
    error => {
      dispatch({ type: "FETCH_REVIEWS_ERROR", error });
    }
  );
};
