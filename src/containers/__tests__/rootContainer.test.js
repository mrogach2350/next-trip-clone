import React from 'react'
import { shallow } from 'enzyme'
import { RootContainer } from '../rootContainer'

describe('RootContainer', () => {
  let props

  beforeEach(() => {
    props = {
      classes: {},
    }
  })
  it('should render without error', () => {
    const wrapper = shallow(<RootContainer {...props} />)

    expect(wrapper).toMatchSnapshot()
  })
})