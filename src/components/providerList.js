import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Button, Menu, MenuItem } from '@material-ui/core'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',
  },
  button: {
    margin: '20px',
  }
}

export class ProviderList extends React.PureComponent {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleSelectAndClose = (currentProvider) => {
    const { onSelectProvider = () => {} } = this.props
    onSelectProvider(currentProvider)
    this.setState({ anchorEl: null })
  }

  render() {
    const { providers = [], currentProvider = '', classes = {} } = this.props
    const { anchorEl } = this.state
    const currentProviderData = providers.find(x =>  x.Value ===  currentProvider) || {}
    return (
      <Paper className={classes.root}>
        <h4>Filter By Provider: </h4>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.button}
        >
          {currentProviderData.Text || "All Providers" }
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem 
              onClick={() => this.handleSelectAndClose('')}
            >
              All Providers
            </MenuItem>
          {providers.map(provider => 
            <MenuItem 
              onClick={() => this.handleSelectAndClose(provider.Value)}
            >
              {provider.Text}
            </MenuItem>
          )}
        </Menu>
      </Paper>
    )
  }
}

export default withStyles(styles)(ProviderList)