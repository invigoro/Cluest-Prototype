//PRIMARY CONTAINER FOR ENTIRE APPLICATION
//CONTAINS NAVIGATION ROUTES AND INITIALIZES NAVIGATOR

//IMPORTS
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { StackNavigator, createAppContainer, createStackNavigator, createBottomTabNavigator, StackActions } from 'react-navigation'; // Version can be specified in package.json

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
import LogIn from './LogIn';
import CreateHunt1 from './CreateHunt1';
import CreateHunt2 from './CreateHunt2';
import CreateHunt3 from './CreateHunt3';
import SendHunt1 from './SendHunt1';
import TreasureHuntMode from './TreasureHuntMode';
import { Google } from 'expo';
import * as firebase from 'firebase';
import ViewReceivedHunt from "./ViewReceivedHunt";
import DeleteScreen from './DeleteScreen';

//IGNORE THE TIMER WARNING
console.ignoredYellowBox = ['Setting a timer'];
const mapStateToProps = (state) => ({
  username: state.username,
  latitude: state.latitude,
  longitude: state.longitude
})

//MAIN NAVIGATION
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
    Login: {
      screen: LogIn,
      navigationOptions: {
        headerLeft: null,
      },
    },
    CreateHunt1: CreateHunt1,
    CreateHunt2: CreateHunt2,
    CreateHunt3: CreateHunt3,
    SendHunt1: SendHunt1,
    TreasureHuntMode: TreasureHuntMode,
    ReceivedHunt: ViewReceivedHunt,
    DeleteScreen: DeleteScreen,
  },
  {
    initialRouteName: 'Login',
  }
);


const AppContainer = createAppContainer(RootStack);

class App extends Component {

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default App;