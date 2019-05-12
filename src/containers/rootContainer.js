import React from 'react'
import queryString from 'query-string'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import RoutesList from '../components/routesList'
import DirectionButtons from '../components/directionButtons'
import StopsList from '../components/stopsList'
import InfoDialog from '../components/infoDialog'
import { fetchProviders, fetchRoutes, fetchDirections, fetchStops, fetchDepartures } from '../utils/apiCalls'

export class RootContainer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      defaultProvider: '8',
      providers: [],
      routes: [],
      directions: [],
      stops: [],
      currentProvider: '8',
      currentRoute: '',
      currentDirection: '',
      currentStopText: '',
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

  componentDidUpdate(prevProps, prevState) {
    const prevParams = queryString.parse(prevProps.location.search)
    const params = queryString.parse(this.props.location.search)

    if (params.r !== prevParams.r) {
      if(!params.r) {
        return this.setState({ 
          currentRoute: '', 
          currentDirection: '',
          directions: [], 
          stops: [],
          departures: [],
          showModal: false,
        })
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

  onSelectRoute = (currentRoute) => {
    const { history } = this.props
    history.push(`?r=${currentRoute}`)
  }

  onSelectDirection = (currentDirection) => {
    const { history } = this.props
    const { currentRoute } = this.state
    history.push(`?r=${currentRoute}&d=${currentDirection}`)
  }

  onStopClicked = ({ Value = '', Text = '' }) => {
    const { currentRoute, currentDirection } = this.state
    fetchDepartures(currentRoute, currentDirection, Value).then(result => {
      this.setState({ departures: result.data, currentStopText: Text, showModal: true })
    })
  }

  closeModal = () => this.setState({ showModal: false })

  render() {
    const { 
      history = {}, 
    } = this.props
    const { 
      routes, 
      currentRoute, 
      directions, 
      currentDirection, 
      stops, 
      currentStopText, 
      showModal, 
      departures 
    } = this.state
    const currentRouteData = routes.find(x => x.Route === currentRoute)
    const currentDirectionData = directions.find(x => x.Value === currentDirection)
    return (
      <Grid container>
        <Grid item xs={false} md={1} />
        <Grid item xs={12} md={5} md-offset={1}>
          {routes.length > 0 &&
            <RoutesList 
              history={history}
              routes={routes}
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