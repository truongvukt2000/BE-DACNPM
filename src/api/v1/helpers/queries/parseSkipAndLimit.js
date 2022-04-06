const parseSkipAndLimit = (options) => {
  const skipValue = parseInt(options?.skip) || 0;
  const limitValue = parseInt(options?.limit);

  if (isNaN(limitValue)) {
    return {
      skip: skipValue,
    };
  }

  return {
    skip: skipValue,
    limit: limitValue,
  };
};

export default parseSkipAndLimit;
