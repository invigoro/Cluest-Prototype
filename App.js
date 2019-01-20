import React, { Component } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

export default class App extends Component {
  state = {
    latitude: "",
    longitude: ""
  };

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
          <TouchableOpacity style={styles.squareish} >
            <Text style={styles.squareText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.squareish} >
            <Text style={styles.squareText}>Active Games</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fourRows}>
          <TouchableOpacity style={styles.squareish} >
            <Text style={styles.squareText}>My Locations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.squareish} >
            <Text style={styles.squareText}>My Hunts</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.fourRows, styles.bottomBar, {flex: 0.15}]}>

        </View>
      </View>
    );
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