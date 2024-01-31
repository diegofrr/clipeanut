export interface ISearchResultRoot {
  items: ISearchResult[];
  nextpage: string;
  suggestion: string;
  corrected: boolean;
}

export interface ISearchResult {
  url: string;
  type: string;
  name?: string;
  thumbnail: string;
  description?: string;
  subscribers?: number;
  videos?: number;
  verified?: boolean;
  title?: string;
  uploaderName?: string;
  uploaderUrl?: string;
  uploaderAvatar?: string;
  uploadedDate?: string;
  shortDescription?: string;
  duration?: number;
  views?: number;
  uploaded?: number;
  uploaderVerified?: boolean;
  isShort?: boolean;
}
