import { PIPED_VALUES } from '.';

export const HOME_PAGE_VALUES = {
  TRENDING_VIDEO: {
    TITLE_MAX_LENGTH: 50,
    INITIAL_STATE: {
      pipedInstanceList: PIPED_VALUES.INSTANCES,
      TRENDING_VIDEOS: [],
      LOADING: false
    }
  }
};

export const WATCH_PAGE_VALUES = {
  VIDEO_PLAYER: {
    INITIAL_STATE: {
      pipedInstanceList: PIPED_VALUES.INSTANCES,
      isVideoLoaded: false,
      canRetry: false
    }
  }
};

export const SETTINGS_PAGE_VALUES = {};
