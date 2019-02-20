import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { StackNavigator, createAppContainer, createStackNavigator, createBottomTabNavigator, StackActions} from 'react-navigation'; // Version can be specified in package.json
///import {styles} from './StyleSheet';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import {actions} from './storeCommands';
import {Provider, connect} from 'react-redux';
import HomeScreen from './HomeScreen';
import MyActiveGamesScreen from './MyActiveGamesScreen';
import MyLocationsScreen from './MyLocationsScreen';
import MyFriendsScreen from './MyFriendsScreen';
import MyHuntsScreen from './MyHuntsScreen';
import MyStatsScreen from './MyStatsScreen';
import NewLocationScreen from './NewLocationScreen';
import SettingsScreen from './SettingsScreen';
import SavedLocation from './SavedLocation';
import NavigationService from './NavigationService';
import {Google} from 'expo';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCxLDLimqSoYI8pYC08vfSFLMGFumC3MVk",
  authDomain: "cluest-8da73.firebaseapp.com",
  databaseURL: "https://cluest-8da73.firebaseio.com",
  storageBucket: "cluest-8da73.appspot.com",
}

firebase.initializeApp(firebaseConfig);
//import LogIn from './LogIn';

//import {store} from './index.js'

//Amplify.configure(aws_exports);

const mapStateToProps = (state) => ({
  username: state.username,
  latitude: state.latitude,
  longitude: state.longitude
})

/*const clientId = 'cluest-8da73';
const { type, accessToken, user } = Google.logInAsync({ clientId });

if (type === 'success') {
  /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
  /*console.log(user);
}*/

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Locations: MyLocationsScreen,
    Friends: MyFriendsScreen,
    ActiveGames: MyActiveGamesScreen,
    Hunts: MyHuntsScreen,
    NewLocation: NewLocationScreen,
    Settings: SettingsScreen,
    Stats: MyStatsScreen,
    SavedLocation: SavedLocation,
  },
  {
    initialRouteName: 'Home',
    //headerMode: 'Screen'
  }
);


const AppContainer = createAppContainer(RootStack);

class App extends Component {
  
  render()
  {
    /*<View style={styles.container}>
        <LogIn />
      </View>*/
    return(
      <AppContainer 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
    /*const {info} = this.props
    return (
      <Text>{info}</Text>
    )*/
  }
}


//export default connect()(App);
export default App;