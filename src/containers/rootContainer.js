import React from 'react'
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

  componentDidMount() {
    fetchProviders().then(results => this.setState({ providers: results.data }))
    fetchRoutes().then(results => this.setState({ routes: results.data }))
  }

  componentDidUpdate(prevProps, prevState) {
    const prevParams = getParsedSearchString(prevProps)
    const params = getParsedSearchString(this.props)

    if (params.r !== prevParams.r) {
      if(!params.r) {
        return this.setState(state => ({
          ...initialState,
          providers: state.providers,
          routes: state.routes,
        }))
      }

      return fetchDirections(params.r).then(result => {
        const directions = result.data
        this.setState({ currentRoute: params.r, directions })
      }) 
    }

    if (params.d !== prevParams.d) {
      if(!params.d) {
        return this.setState({ currentDirection: '', stops: [] })
      }

      return fetchStops(params.r, params.d).then(result => {
        const stops = result.data
        this.setState({ currentDirection: params.d, stops })
      })
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

  onStopClicked = ({ Value = '', Text = '' }) => {
    const { currentRoute, currentDirection } = this.state
    fetchDepartures(currentRoute, currentDirection, Value).then(result => {
      this.setState({ departures: result.data, currentStopText: Text, showModal: true })
    })
  }

  closeModal = () => this.setState({ showModal: false })

  onSelectProvider = (currentProvider = '') => this.setState({ currentProvider })

  render() {
    const { history = {} } = this.props
    const { 
      providers,
      routes, 
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
              currentRoute={currentRoute}
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

export default RootContainer