import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import SavedCarsDrawerContent from './SavedCarsDrawerContent';

class SavedCarsDrawer extends Component {
  state = {
    cars: [],
    loading: true,
  }

  handleClose = () => {
    if (this.props.handleClose) {
      this.props.handleClose();
    }
  }

  render() {
    return(
      <>
        <Drawer 
          anchor="right" 
          open={this.props.open} 
          onClose={this.handleClose}
        >
          <SavedCarsDrawerContent removedBookmarkedCar={this.props.removedBookmarkedCar} handleClose={() => this.handleClose()} />
        </Drawer>
      </>
    );
  }
}

export default SavedCarsDrawer;