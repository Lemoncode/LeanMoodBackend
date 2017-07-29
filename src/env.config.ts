export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8081,
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION || 'mongodb://localhost/leanMood',
};
