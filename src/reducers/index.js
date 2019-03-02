import { combineReducers } from "redux";
import byId from "./byId";
import pages, * as fromPages from "./pages";
import groups, * as fromGroups from "./groups";

export default combineReducers({ byId, pages, groups });

export const getAllReviews = state =>
  fromGroups.getAll(state.groups).map(r => state.byId[r]);

export const getGroupedReviews = (state, groupBy) =>
  fromGroups.getGrouped(state.groups, groupBy).map(group => ({
    ...group,
    reviews: group.reviews.map(r => state.byId[r])
  }));

export const getLastPageFetched = state =>
  fromPages.getLastPageFetched(state.pages);

export const getHasMore = state => fromPages.getHasMore(state.pages);
export const getIsLoading = state => fromPages.getIsLoading(state.pages);
