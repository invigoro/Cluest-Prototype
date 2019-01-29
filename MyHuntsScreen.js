import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
  } from "react-native";
export default class MyHuntsScreen extends Component {
  render ()
  {
      return (
          <View>
              <Text>Hunts Page {this.props.username}</Text>
          </View>
      )
  }
}