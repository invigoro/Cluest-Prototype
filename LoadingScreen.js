import { Facebook } from 'expo';
import firebase from './fbase';

import NavigationService from './NavigationService';
import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Button
  } from "react-native";

  export default class LoadingScreen extends Component {
    componentWillMount()
    {
        firebase.auth().onAuthStateChanged(user => {
            /*if(firebase.User) {
                NavigationService.navigateTo('Home');
            }
            else
            {
                NavigationService.navigateTo('Login');
            }*/
            NavigationService.navigateTo('Login');
            
        })
    }
    render ()
    {
      return (
          <View>
              <Text >Loading...</Text>
          </View>
      );
    }

  }