import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

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

//import {store} from './index.js'

Amplify.configure(aws_exports);

const mapStateToProps = (state) => ({
  username: state.username,
  latitude: state.latitude,
  longitude: state.longitude
})

const styles = StyleSheet.create({
  fourRows: {
    flex: 0.25, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  squareish: {
    padding: 15,
    textAlign: 'center',
    borderRadius: 35,
    width: '32%',
    backgroundColor: 'white',
    height: '64%',
  },
  welcome: {
    fontSize: 35,
    textAlign: "justify",
    margin: 10,
    fontWeight: '600',
    textShadowOffset: {width: 50, height: 50},
    textShadowColor: 'black',
    letterSpacing: 25,
    textAlignVertical: 'bottom'
  },
  squareText: {
    textAlign: 'center',
    flex: 1,
    textAlignVertical: 'center',
    fontWeight: '500',
    color: 'black',
    fontSize: 16
  },
  bottomBar: {
    backgroundColor: 'tan'
  },
  bottomButton: {
    width: '33%',
    height: '100%',
  }

});

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
    return<AppContainer screenProps={this.props}/>;
    /*const {info} = this.props
    return (
      <Text>{info}</Text>
    )*/
  }
}

//const itGoes = connect()(App)
itGoes = App;

export default itGoes