import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
  } from "react-native";
export default class NewLocationScreen extends Component {
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
    this.findCoordinates();
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