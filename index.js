import { AppRegistry, View } from 'react-native'
import { createStore } from 'redux'

// Define action types
const actions = {
    ADDLOCATION: 'ADDLOCATION',
}

const reducer = (state, action) => {
    if(action.type == actions.ADDLOCATION) {

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