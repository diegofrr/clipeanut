import { ITrendingVideo } from '@/types';

export enum ActionTypes {
  SET_TRENDING_VIDEOS,
  SET_IS_LOADING
}

export type TrendingVideosAction = SetTrendingVideosAction | SetIsLoadingAction;

export interface TrendingVideosState {
  trendingVideos: ITrendingVideo[];
  isLoading: boolean;
}

export interface SetTrendingVideosAction {
  type: ActionTypes.SET_TRENDING_VIDEOS;
  payload: ITrendingVideo[];
}

export interface SetIsLoadingAction {
  type: ActionTypes.SET_IS_LOADING;
  payload: boolean;
}
