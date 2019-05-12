import React from 'react'
import { shallow } from 'enzyme'
import { StopsList } from '../stopsList'

describe('StopsList', () => {
  it('should render without error', () => {
    const wrapper = shallow(<StopsList />)

    expect(wrapper).toMatchSnapshot()
  })
})