import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Button,
  } from "react-native";
import firebase from './fbase';
import NavigationService from './NavigationService';

function logout()
{
  firebase.auth().signOut();
  NavigationService.reset();
}
export default class SettingsScreen extends Component {
  componentWillUnmount() {
    
  }
  render ()
  {
      return (
          <View>
              <Text>Settings Screen</Text>
              <Button title="Log Out" onPress={()=>logout()}></Button>
          </View>
      )
  }
}