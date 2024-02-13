export interface IFavoriteStream {
  id: string;
  type: 'video' | 'music';
  thumbnail: string;
  title: string;
  uploaderName: string;
  uploaderUrl: string;
  uploaderAvatar: string;
  duration: number;
  isShort: boolean;
}
