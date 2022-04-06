const parseSortQuery = (sortBy, order) => {
  if (!sortBy) {
    return {};
  }

  return {
    [sortBy]: order || 'asc',
  };
};

export default parseSortQuery;
