import idx from 'idx'
import queryString from 'query-string'

export const getSearchString = (props = {}) => idx(props, _ => _.location.search)

export const getParsedSearchString = (props = {}) =>
  queryString.parse(getSearchString(props))