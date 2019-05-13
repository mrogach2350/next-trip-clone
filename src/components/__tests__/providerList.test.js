import React from 'react'
import { shallow } from 'enzyme'
import { ProviderList } from '../providerList'

describe('ProviderList', () => {
  it('should render without error', () => {
    const wrapper = shallow(<ProviderList/>)

    expect(wrapper).toMatchSnapshot()
  })
})