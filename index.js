import { AppRegistry, View } from 'react-native';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { reducer, initialState } from './storeCommands';




// Create a store

const store = createStore(reducer, initialState)

// Import the App container component
import {App} from './App'

//Provider
const AppWithStore = (
    <Provider store={store}>
        <App />
    </Provider>
)

// Pass the store into the app container
ReactDOM.render(AppWithStore, document.getQuerySelector('#app'))

