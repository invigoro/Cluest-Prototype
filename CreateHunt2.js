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

export default class CreateHunt2 extends Component {
    componentWillUnmount() {
      
    }
    componentDidMount() {
        const {navigation } = this.props;
        const locations = navigation.getParam('locations', 'no locations');
        firebase.auth().onAuthStateChanged(user => {this.setState({user}); 
        this.setState({locations});
        console.log(locations);
        });
      }
    render ()
    {
        return (
            <View>
                <Text>Create Hunt</Text>
            </View>
        )
    }
  }