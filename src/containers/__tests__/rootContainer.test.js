import React from 'react'
import { shallow, mount } from 'enzyme'
import { RootContainer } from '../rootContainer'
import { mockRoutes, mockDirections } from '../testMocks'

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
      history: {
        location: {
          search: '',
        },
        push: jest.fn(),
      }
    }
  })

  it('should render without error', () => {
    const wrapper = mount(<RootContainer {...props} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('clicking a list item should call onSelectRoute', () => {
    const wrapper = mount(<RootContainer {...props} />)
    const instance = wrapper.instance()
    const mockRouteValue = mockRoutes[0].Route
    jest.spyOn(instance, 'onSelectRoute')
    wrapper.setState({ routes: mockRoutes })

    wrapper.find('ListItem').first().simulate('click')
    
    expect(instance.onSelectRoute).toHaveBeenCalledWith(mockRouteValue)
    expect(props.history.push).toHaveBeenCalled()
  })

  it('clicking a direction button should call onSelectDirection', () => {
    const wrapper = mount(<RootContainer {...props} />)
    const instance = wrapper.instance()
    const mockDirectionValue = mockDirections[1].Value
    const mockDirectionText = mockDirections[1].Text
    jest.spyOn(instance, 'onSelectDirection')
    wrapper.setState({ 
      currentRoute: '2', 
      routes: mockRoutes, 
      directions: mockDirections 
    })

    const secondDirectionButton = wrapper.find('Button').last()
    secondDirectionButton.simulate('click')
    
    expect(secondDirectionButton.text()).toEqual(mockDirectionText)
    expect(instance.onSelectDirection).toHaveBeenCalledWith(mockDirectionValue)
    expect(props.history.push).toHaveBeenCalled()
  })
})