import { streamStats, streamViews } from './formatters';
import { generateDashFileFromFormats } from './DashGenerator';

const formatters = {
  streamStats,
  streamViews
};

export { generateDashFileFromFormats, formatters };
