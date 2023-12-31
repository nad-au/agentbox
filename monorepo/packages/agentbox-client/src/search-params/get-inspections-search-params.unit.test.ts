import { getInspectionsSearchParams } from './get-inspections-search-params'

describe('getInspectionSearchParams()', () => {
  const RealDate = Date.now

  beforeAll(() => {
    global.Date.now = jest.fn(() =>
      new Date('2022-03-27T23:10:57.508Z').getTime(),
    )
  })

  afterAll(() => {
    global.Date.now = RealDate
  })

  it('should make the correct search params when the fetchAll is true', () => {
    const searchParams = getInspectionsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: true,
    })

    expect(searchParams).toEqual({
      limit: 0,
      include: 'contact,listing',
      'filter[modifiedAfter]': '2022-03-26T23:10:57.508Z',
    })
  })

  it('should make the correct search params for the given fetch period', () => {
    const searchParams = getInspectionsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: false,
    })

    expect(searchParams).toEqual({
      limit: 0,
      include: 'contact,listing',
      'filter[modifiedAfter]': '2022-03-27T22:50:57.508Z',
    })
  })

  it('should include office the correct search params for the given fetch period', () => {
    const searchParams = getInspectionsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: false,
    })

    expect(searchParams).toEqual({
      limit: 0,
      include: 'contact,listing',
      'filter[modifiedAfter]': '2022-03-27T22:50:57.508Z',
    })
  })

  it('should include the office location when not consolidating', () => {
    const searchParams = getInspectionsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: false,
      crmOfficeId: '123',
    })

    expect(searchParams).toEqual({
      limit: 0,
      include: 'contact,listing',
      'filter[modifiedAfter]': '2022-03-27T22:50:57.508Z',
      'filter[listingOfficeId]': '123',
    })
  })

  it('should ignore the office location when consolidating', () => {
    const searchParams = getInspectionsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: false,
      crmOfficeId: '123',
      consolidateLocations: true,
    })

    expect(searchParams).toEqual({
      limit: 0,
      include: 'contact,listing',
      'filter[modifiedAfter]': '2022-03-27T22:50:57.508Z',
    })
  })
})
