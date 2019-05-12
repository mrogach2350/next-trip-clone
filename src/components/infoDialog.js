import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent } from '@material-ui/core'
import { header } from '../utils/styleConstants'

const styles = {
  header,
  listing: {
    marginBottom: '10px'
  },
  content: {
    textAlign: 'center',
    padding: '10px',
  }
}

export const InfoDialog = ({ 
  currentStopText = '', 
  open = false, 
  departures = [],
  handleClose, 
  classes = {},
  currentRouteData = {},
  currentDirectionData = {}, 
}) => {
  return(
    <Dialog open={open} fullWidth onClose={handleClose} >
      <div className={classes.header}>
        <strong>Route:</strong> {currentRouteData.Description}<br/>
        <strong>Stop:</strong> {currentStopText}<br/>
        <strong>Direction:</strong> {currentDirectionData.Text} 
      </div>
      <DialogContent className={classes.content}>
        {departures.length === 0 ? 
          <h4>No Departures left today</h4>:
          departures.map(departure => 
            <div className={classes.listing}>
              <span>{departure.Description}</span><br/>
              <span>Departs At: {departure.DepartureText}</span>
            </div>
          )
        }
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(InfoDialog)