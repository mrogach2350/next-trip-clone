import React from 'react'
import { shallow } from 'enzyme'
import { InfoDialog } from '../infoDialog'

describe('InfoDialog', () => {
  it('should render without error', () => {
    const wrapper = shallow(<InfoDialog />)

    expect(wrapper).toMatchSnapshot()
  })
})