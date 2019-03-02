const initialState = { lastPageFetched: 0, hasMore: true, isLoading: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REVIEWS_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_REVIEWS_SUCCESS":
      return {
        ...state,
        lastPageFetched: action.page,
        hasMore: action.hasMore,
        isLoading: false
      };

    default:
      return state;
  }
};

export const getLastPageFetched = state => state.lastPageFetched;
export const getHasMore = state => state.hasMore;
export const getIsLoading = state => state.isLoading;
