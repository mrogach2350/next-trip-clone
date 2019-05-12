import React from 'react'
import { shallow, mount } from 'enzyme'
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

describe('Root Container - Mount', () => {
  let props

  beforeEach(() => {
    props = {
      classes: {},
    }
  })
  it('should render without error', () => {
    const wrapper = mount(<RootContainer {...props} />)

    expect(wrapper).toMatchSnapshot()
  })
})