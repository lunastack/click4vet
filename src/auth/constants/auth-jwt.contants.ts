export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  tokenExpiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
};

console.log("jwtConstants ", jwtConstants);

