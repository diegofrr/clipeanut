import { ActionTypes, type TrendingVideosAction, type TrendingVideosState } from './types';

export const initialTrendingVideosState: TrendingVideosState = {
  trendingVideos: [],
  isLoading: false
};

export const trendingVideoReducer = (state: TrendingVideosState, action: TrendingVideosAction): TrendingVideosState => {
  switch (action.type) {
    case ActionTypes.SET_TRENDING_VIDEOS:
      return { ...state, trendingVideos: action.payload };
    case ActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
