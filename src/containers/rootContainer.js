import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import RoutesList from '../components/routesList'
import DirectionButtons from '../components/directionButtons'
import StopsList from '../components/stopsList'
import InfoDialog from '../components/infoDialog'
import ProviderList from '../components/providerList'
import { getParsedSearchString } from '../utils/selectors'
import { fetchProviders, fetchRoutes, fetchDirections, fetchStops, fetchDepartures } from '../utils/apiCalls'

const initialState = {
  providers: [],
  routes: [],
  directions: [],
  stops: [],
  departures: [],
  currentProvider: '',
  currentRoute: '',
  currentDirection: '',
  currentStopText: '',
  showModal: false,
}

export class RootContainer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = initialState
  }

  async componentDidMount() {
    const params = getParsedSearchString(this.props)
    const providersResults = await fetchProviders()
    const providers = await providersResults.data
    // const providers = await fetchProviders().data
    const routesResult = await fetchRoutes()
    const routes = await routesResult.data

    if (params.r !== '') {
      const directionsResult = await fetchDirections(params.r)
      const directions = await directionsResult.data

      // Check to see if direction is present on load
      if (params.d !== '') {
        const stopsResult = await fetchStops(params.r, params.d)
        const stops = await stopsResult.data
        return this.setState({ 
          currentRoute: params.r, 
          currentDirection: params.d, 
          providers,
          directions, 
          routes,
          stops 
        })
      }
      return this.setState({ currentRoute: params.r, directions, routes, providers })
    }
    return this.setState({ routes, providers })
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevParams = getParsedSearchString(prevProps)
    const params = getParsedSearchString(this.props)

    // Check if route is selected
    // if not, reset state
    if (params.r !== prevParams.r) {
      if(!params.r) {
        return this.setState(state => ({
          ...initialState,
          providers: state.providers,
          routes: state.routes,
        }))
      }

      // if route is selected, fetch directions
      const directionsResult = await fetchDirections(params.r)
      const directions = await directionsResult.data
      return this.setState({ currentRoute: params.r, directions })
    }

    // if direction changed
    if (params.d !== prevParams.d) {
      // if no direction clear selection
      if(!params.d) return this.setState({ currentDirection: '', stops: [] })

      // if direction, fetch stops
      const stopsResult = await fetchStops(params.r, params.d)
      const stops = await stopsResult.data
      return this.setState({ currentDirection: params.d, stops })

    }
  }

  onSelectRoute = (currentRoute = '') => {
    const { history } = this.props
    if (currentRoute !== '') history.push(`?r=${currentRoute}`)
  }

  onSelectDirection = (currentDirection = '') => {
    const { history } = this.props
    const { currentRoute } = this.state
    if (currentDirection !== '') history.push(`?r=${currentRoute}&d=${currentDirection}`)
  }

  onStopClicked = async ({ Value = '', Text = '' }) => {
    const { currentRoute, currentDirection } = this.state
    const departuresResult = await fetchDepartures(currentRoute, currentDirection, Value)
    const departures = departuresResult.data

    return this.setState({ departures, currentStopText: Text, showModal: true })
  }

  closeModal = () => this.setState({ showModal: false })

  onSelectProvider = (currentProvider = '') => this.setState({ currentProvider })

  render() {
    const { history = {} } = this.props
    const { 
      providers,
      routes = [], 
      directions, 
      stops, 
      departures,
      currentProvider, 
      currentRoute, 
      currentDirection, 
      currentStopText, 
      showModal, 
    } = this.state
    const filteredRoutes =  currentProvider === '' ? routes : routes.filter(x =>  x.ProviderID === currentProvider)
    const currentRouteData = routes.find(x => x.Route === currentRoute)
    const currentDirectionData = directions.find(x => x.Value === currentDirection)
    return (
      <Grid container>
        <Grid item xs={false} md={1} />
        <Grid item xs={12} md={5} md-offset={1}>
          {providers.length > 0 &&
            <ProviderList
              currentProvider={currentProvider}
              providers={providers}
              onSelectProvider={this.onSelectProvider}
            />
          }
          {routes.length > 0 &&
            <RoutesList 
              history={history}
              routes={filteredRoutes}
              currentRouteData={currentRouteData}
              onSelectRoute={this.onSelectRoute}
            /> 
          }
          {directions.length > 0 &&
            <DirectionButtons 
              directions={directions}
              currentDirection={currentDirection}
              onSelectDirection={this.onSelectDirection}
            />
          }
        </Grid> 
        <Grid item xs={12} md={5}>
          {stops.length > 0 &&
            <StopsList stops={stops} onStopClicked={this.onStopClicked} />
          }
        </Grid>
        <InfoDialog 
          open={showModal} 
          currentStopText={currentStopText} 
          departures={departures}
          handleClose={this.closeModal} 
          currentRouteData={currentRouteData}
          currentDirectionData={currentDirectionData}
        />
      </Grid>
    )
  }
}

RootContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      search: PropTypes.string,
    })
  })
}

export default RootContainer