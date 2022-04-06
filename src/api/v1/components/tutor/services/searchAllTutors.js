import Tutor from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';
import parseSortQuery from '../../../helpers/queries/parseSortQuery';
import parseSkipAndLimit from '../../../helpers/queries/parseSkipAndLimit';

const searchAllTutors = async (options) => {
  // search
  const searchString = options?.search || '';
  const searchObject = parseSearchString({
    searchString,
    keys: ['fullname', 'profession', 'introduction', 'interests'],
    separator: '+',
  });

  // sort
  const sortObject = parseSortQuery(options.sortBy, options.order);

  const tutors = await Tutor.find(searchObject, null, {
    ...parseSkipAndLimit(options),
    sort: sortObject,
  });

  // return data
  return tutors;
};

export default searchAllTutors;
