import React from 'react'
import { shallow, mount } from 'enzyme'
import { RootContainer } from '../rootContainer'
import { mockRoutes, mockDirections } from '../testMocks'

describe('RootContainer', () => {
  let props
  beforeEach(() => {
    props = {
      classes: {},
      history: {
        push: jest.fn(),
      }
    }
  })

  it('should render without error', () => {
    const wrapper = shallow(<RootContainer {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('onSelectRoute', () => {
    it('if no arg, should not call history.push', () => {
      const wrapper = shallow(<RootContainer {...props} />)
      const instance = wrapper.instance()

      instance.onSelectRoute()

      expect(props.history.push).not.toHaveBeenCalled()
    })

    it('should properly call history.push', () => {
      const wrapper = shallow(<RootContainer {...props} />)
      const instance = wrapper.instance()
      const mockRoute = '2'
      const mockQuery = `?r=${mockRoute}`

      instance.onSelectRoute(mockRoute)

      expect(props.history.push).toHaveBeenCalledWith(mockQuery)
    })
  })

  describe('onSelectDirection', () => {
    it('if no arg, should not call history.push', () => {
      const wrapper = shallow(<RootContainer {...props} />)
      const instance = wrapper.instance()

      instance.onSelectDirection()

      expect(props.history.push).not.toHaveBeenCalled()
    })

    it('should properly call history.push', () => {
      const wrapper = shallow(<RootContainer {...props} />)
      const instance = wrapper.instance()
      const mockRoute = '2'
      const mockDirection = '1'
      const mockQuery = `?r=${mockRoute}&d=${mockDirection}`
      wrapper.setState({ currentRoute: mockRoute })

      instance.onSelectDirection(mockDirection)

      expect(props.history.push).toHaveBeenCalledWith(mockQuery)
    })
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
  })
})