import React from 'react'
import { shallow } from 'enzyme'
import { RootContainer } from '../rootContainer'

describe('RootContainer', () => {
  it('should render without error', () => {
    const wrapper = shallow(<RootContainer />)

    expect(wrapper).toMatchSnapshot()
  })
})