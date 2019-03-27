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

export default class CreateHunt1 extends Component {
    componentWillUnmount() {
      
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