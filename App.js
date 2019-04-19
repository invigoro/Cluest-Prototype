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
import LoadingScreen from './LoadingScreen';
import CreateHunt1 from './CreateHunt1';
import CreateHunt2 from './CreateHunt2';
import CreateHunt3 from './CreateHunt3';
import SendHunt1 from './SendHunt1';
import TreasureHuntMode from './TreasureHuntMode';
import {Google} from 'expo';
import * as firebase from 'firebase';
import ViewReceivedHunt from "./ViewReceivedHunt";
import DeleteScreen from './DeleteScreen';

//const provider = firebase.auth.GoogleAuthProvider();

//import LogIn from './LogIn';

//import {store} from './index.js'

//Amplify.configure(aws_exports);
console.ignoredYellowBox = ['Setting a timer'];
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
    Login: {
      screen: LogIn,
      navigationOptions: {
        headerLeft: null,
      },
    },
    Loading: LoadingScreen,
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