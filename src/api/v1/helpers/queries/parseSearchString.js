const parseSearchString = ({
  searchString = 'Last+First',
  keys = ['fullname'],
  separator = '+',
}) => {
  const parsedSearchString =
    searchString.length === 0 ? '' : searchString.split(separator).join(' ');

  const searchFields = keys.map((key) => {
    return {
      [`${key}`]: { $regex: parsedSearchString, $options: 'i' },
    };
  });

  const searchObject =
    parsedSearchString.length === 0
      ? null
      : {
          $or: searchFields,
        };

  return searchObject;
};

export default parseSearchString;
