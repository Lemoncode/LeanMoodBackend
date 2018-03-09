export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8081,
  MONGODB_CONNECTION_ACCESS: process.env.MONGODB_CONNECTION_ACCESS || 'mongodb://localhost/leanMoodAccess',
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION || 'mongodb://localhost/leanMood',
  ACCESS_TOKEN_HEADER: process.env.ACCESS_TOKEN_HEADER || 'access_token',
};
