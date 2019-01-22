import React, { Component } from "react";
import {
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import {createStore } from 'redux';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class HomeScreen extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
      }}>
        <View style={[styles.fourRows, {flexDirection: 'column'}]}>  
          <Text style={styles.welcome}>CLUEST</Text>
          <Text style={[styles.welcome, {fontSize: 18, fontWeight: '300', letterSpacing: 0}]}>Welcome, \Username\</Text>
        </View>
        <View style={styles.fourRows}> 
          <TouchableOpacity style={styles.squareish} onPress={() => this.props.navigation.navigate('Friends')}>
            <Text style={styles.squareText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.squareish} onPress={() => this.props.navigation.navigate('ActiveGames')}>
            <Text style={styles.squareText}>Active Games</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fourRows}>
          <TouchableOpacity style={styles.squareish} onPress={() => this.props.navigation.navigate('Locations')}>
            <Text style={styles.squareText}>My Locations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.squareish} onPress={() => this.props.navigation.navigate('Hunts')} >
            <Text style={styles.squareText}>My Hunts</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.fourRows, styles.bottomBar, {flex: 0.15}]}>
          <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Stats')}>
            <Text style={styles.squareText}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('NewLocation')}>
            <Text style={styles.squareText}>New Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Settings')}>
            <Text style={styles.squareText}>Options</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
class MyLocationsScreen extends Component {
  render ()
  {
      return (
          <View>
              <Text>Locations Page</Text>
          </View>
      )
  }
}
class MyFriendsScreen extends Component {
  render ()
  {
      return (
          <View>
              <Text>Friends Page</Text>
          </View>
      )
  }
}
class MyHuntsScreen extends Component {
  render ()
  {
      return (
          <View>
              <Text>Hunts Page</Text>
          </View>
      )
  }
}
class MyActiveGamesScreen extends Component {
  render ()
  {
      return (
          <View>
              <Text>Active Games Page</Text>
          </View>
      )
  }
}
class MyStatsScreen extends Component {
  render ()
  {
      return (
          <View>
              <Text>Stats Page</Text>
          </View>
      )
  }
}
class SettingsScreen extends Component {
  render ()
  {
      return (
          <View>
              <Text>Settings Screen</Text>
          </View>
      )
  }
}
class NewLocationScreen extends Component {
  state = {
    latitude: "o",
    longitude: "h"
  };

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

  componentDidMount(){
    this.findCoordinates;
  }
  render ()
  {

      return (
          <View>
              <Text>New Location</Text>
              <Text>{this.state.latitude}, {this.state.longitude}</Text>
          </View>
      )
  }
}
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
    backgroundColor: 'steelblue',
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
    color: 'white',
    fontSize: 16
  },
  bottomBar: {
    backgroundColor: 'skyblue'
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
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {

  render()
  {
    return<AppContainer />;
  }
}