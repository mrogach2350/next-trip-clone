import React from 'react'
import { shallow } from 'enzyme'
import { RoutesList } from '../routesList'

describe('RoutesList', () => {
  it('should render without error', () => {
    const wrapper = shallow(<RoutesList />)

    expect(wrapper).toMatchSnapshot()
  })
})