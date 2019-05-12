import React from 'react'
import { shallow } from 'enzyme'
import { DirectionButtons } from '../directionButtons'

describe('DirectionButtons', () => {
  it('should render without error', () => {
    const wrapper = shallow(<DirectionButtons />)

    expect(wrapper).toMatchSnapshot()
  })
})