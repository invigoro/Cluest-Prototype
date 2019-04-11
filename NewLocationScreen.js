import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    TextInput,
  } from "react-native";

  import firebase from './fbase';
  import NavigationService from './NavigationService';
  var database = firebase.database();

  function handleSubmit(info) {
    database.ref('locations/' + info.user.uid).push({
      descript: info.descript,
      latitude: info.latitude,
      longitude: info.longitude,
      name: info.title
    });
    Alert.alert('Location Saved', 'Access this location in the "Locations" section.');
    NavigationService.goBack();
  }

export default class NewLocationScreen extends Component {
  state = {
    latitude: "x",
    longitude: "x",
    title: "",
    descript: "",
    img: "",
    user: firebase.User,
  };

  getLocation = () => {
    if(this.state.latitude == "x" || this.state.longitude == "x")
    {
      return "Getting coordinates..."
    }
    else
    {
      return (this.state.latitude) + ", " + (this.state.longitude);
    }
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

  componentWillMount(){
    this.findCoordinates();
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {this.setState({user})});
  }

  
  render ()
  {

      return (
          <View>
              <TextInput
              style={styles.header} onChangeText={(title) => this.setState({title})}
              //value={this.state.title}
              placeholder="New Location"
              />
              <Text style={styles.subtitle}>{this.getLocation()}</Text>
              <TextInput
              multiline = {true}
              numberOfLines = {4}
              style={styles.descript} onChangeText={(descript) => this.setState({descript})}
              placeholder = "Write a clue to help your friends find this place!"/>
              <TouchableOpacity style={styles.opacity}><Text style={styles.submit} onPress={() => handleSubmit(this.state)}>Save Location</Text></TouchableOpacity>
          </View>
      )
  }
}

const styles = StyleSheet.create ({
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5
  },
  descript: {
    fontSize: 20,
    margin: 8
  },
  submit: {
    fontSize: 20,
    margin: 8,
    textAlign: 'center'
  },
  opacity: {
    backgroundColor: 'skyblue',
    borderRadius: 20,
    padding: 10,
  }
});