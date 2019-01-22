import { AppRegistry, View } from 'react-native';
import { createStore } from 'redux';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

// Define action types
const actions = {
    UPDATELOCATION: 'UPDATELOCATION',
    ADDLOCATION: 'ADDLOCATION',
}

findCoordinates = () => {
    navigator.geolocation.getCurrentPosition( //location is the result of this call as a JSON array
      location => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        this.setState({ latitude });
        this.setState({ longitude });
      },
      error => Alert.alert(error.message),  //only if there is an error
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

const reducer = (state, action) => {
    const {current} = state;
    const {type, payload} = action;

    switch (type) {
        case actions.UPDATELOCATION:
            this.findCoordinates;
            return state;
    }
    return state;
}

const initialState = 
{
    username: '',
    latitude: '',
    longitude: '',
    locations: [{}],
    hunts: [{}],
    friends: [{}],
    games: [{}],
}

// Create a store

const store = createStore(reducer, initialState)

// Import the App container component
import App from './App'

// Pass the store into the app container
const AppWithStore = () => <App store={store} />

AppRegistry.registerComponent('App', () => AppWithStore)