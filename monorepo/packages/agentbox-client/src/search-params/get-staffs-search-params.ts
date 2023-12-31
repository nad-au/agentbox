import {
  FetchPeriod,
  FetchStaffsConfig,
  GetSearchParamsFn,
} from '../types/search'
import { getModifiedAfterDate } from './get-modified-after-date'

const DEFAULT_FETCH_PERIOD: FetchPeriod = {
  minutes: 10,
}

const defaultSearchParams = {
  limit: 0,
  'filter[status]': 'all',
}

export const getStaffsSearchParams: GetSearchParamsFn<FetchStaffsConfig> = ({
  fetchPeriod = DEFAULT_FETCH_PERIOD,
  fetchAll = false,
  crmOfficeId,
  consolidateLocations = false,
  extraSearchParams = {},
} = {}) => {
  const calculatedSearchParams = {}

  if (!fetchAll) {
    calculatedSearchParams['filter[modifiedAfter]'] =
      getModifiedAfterDate(fetchPeriod).toISO()
  }

  if (!consolidateLocations && crmOfficeId) {
    calculatedSearchParams['filter[officeId]'] = crmOfficeId
  }

  return {
    ...defaultSearchParams,
    ...calculatedSearchParams,
    ...extraSearchParams,
  }
}
