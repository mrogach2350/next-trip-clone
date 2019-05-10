import React from 'react'

import { Grid, List, ListItem, Paper } from '@material-ui/core'
import { fetchProviders, fetchRoutes, fetchDirections } from '../utils/apiCalls'

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
    const routeNumber = e.target.value.toString()
    fetchDirections(routeNumber).then(result => {
      this.setState({ currentRoute: routeNumber, directions: result.data })
    })
  }

  render() {
    const { routes, currentRoute } = this.state

    return (
      <Grid container>
        <Grid item xs={12} md={4} >
          {routes.length > 0 &&
          <Paper style={{ margin: '20px', textAlign: 'center' }}>
            <h1>Routes</h1>
            <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
              {routes.map((route, idx) => 
                <ListItem 
                  onClick={this.onSelectRoute}
                  selected={currentRoute === route.Route}
                  value={route.Route} 
                  key={idx}
                >
                  {route.Description}
                </ListItem>
              )}
            </List>
          </Paper> 
          }
        </Grid>
        <Grid item xs={12} md={4} >
        </Grid>
        <Grid item xs={12} md={4} >
        </Grid>
      </Grid>
    )
  }
}

export default RootContainer