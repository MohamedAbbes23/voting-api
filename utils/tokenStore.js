const refreshTokens = [];

const addToken = (token) => refreshTokens.push(token);

const removeToken = (token) => {
  const index = refreshTokens.indexOf(token);
  if (index > -1) refreshTokens.splice(index, 1);
};

const isValid = (token) => refreshTokens.includes(token);

module.exports = { addToken, removeToken, isValid };
