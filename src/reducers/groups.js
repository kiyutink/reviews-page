import { groupReviews } from "../helpers/groupReviews";

const initialState = {
  all: [],
  day: [],
  week: [],
  month: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REVIEWS_SUCCESS": {
      const { day, week, month } = groupReviews(action.reviews, state);
      return {
        all: [...state.all, ...action.reviews.map(r => r.reviewId)],
        day,
        week,
        month
      };
    }

    default:
      return state;
  }
};

export const getAll = state => state.all;
export const getGrouped = (state, groupBy) => state[groupBy];
