import React from 'react'

import { Grid, List, ListItem, Paper } from '@material-ui/core'

import RoutesList from '../components/routesList'
import DirectionButtons from '../components/directionButtons'
import StopsList from '../components/stopsList'

import { fetchProviders, fetchRoutes, fetchDirections, fetchStops } from '../utils/apiCalls'

export class RootContainer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      defaultProvider: '8',
      providers: [],
      currentProvider: '8',
      routes: [],
      currentRoute: '',
      directions: [],
      currentDirection: '0',
      stops: [],
    }
  }

  componentDidMount() {
    const { currentProvider } = this.state
    fetchProviders().then(results => this.setState({ providers: results.data }))
    fetchRoutes().then(results => {
      const filteredRoutes = results.data.filter(x => x.ProviderID === currentProvider)
      this.setState({ routes: filteredRoutes })
    })
  }

  onSelectRoute = (e) => {
    const currentRoute = e.target.value.toString()
    fetchDirections(currentRoute).then(result => {
      const directions = result.data
      this.setState({ currentRoute, directions })
    })
  }

  onSelectDirection = (e) => {
    const { currentRoute } = this.state
    const currentDirection = e.target.value.toString()
    fetchStops(currentRoute, currentDirection).then(result => {
      const stops = result.data
      this.setState({ currentDirection, stops })
    })
  }

  render() {
    const { routes, currentRoute, directions, currentDirection, stops } = this.state

    return (
      <Grid container>
        <Grid item xs={12} md={4} >
          {routes.length > 0 &&
            <RoutesList 
              routes={routes}
              currentRoute={currentRoute}
              onSelectRoute={this.onSelectRoute}
            />
          }
        </Grid>
        <Grid item xs={12} md={4} >
          {directions.length > 0 &&
            <DirectionButtons 
              directions={directions}
              currentDirection={currentDirection}
              onSelectDirection={this.onSelectDirection}
            />
          }
        </Grid>
        <Grid item xs={12} md={4} >
          {stops.length > 0 &&
            <StopsList stops={stops} />
          }
        </Grid>
      </Grid>
    )
  }
}

export default RootContainer