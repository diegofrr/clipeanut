import { streamStats, streamViews } from './formatters';
import { generateDashFileFromFormats } from './DashGenerator';
import { translateUploadedDate } from './translateUploadedDate';

const formatters = {
  streamStats,
  streamViews
};

export { generateDashFileFromFormats, formatters, translateUploadedDate };
