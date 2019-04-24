//MODIFY OR DELETE SAVED LOCATION

import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { Component } from "react";
import styles from './styles';
import firebase from './fbase';
import NavigationService from './NavigationService';
var database = firebase.database();

//modify node in firebase
function handleSubmit(info) {
  database.ref('locations/' + info.user.uid + "/" + info.id).set({
    descript: info.descript,
    latitude: info.latitude,
    longitude: info.longitude,
    name: info.name
  });
  NavigationService.goBack();
}

function handleRemove(info) {
  var path = 'locations/' + info.user.uid + '/' + info.id;
  console.log(path);
  NavigationService.navigate('DeleteScreen', { path: path });
}
export default class SavedLocation extends Component {
  state = {
    user: firebase.User,
    loading: true
  }
  //get all info of selected location
  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'no id');
    const name = navigation.getParam('name', 'Enter a name here!');
    const longitude = navigation.getParam('longitude', 'null');
    const latitude = navigation.getParam('latitude', 'null');
    const descript = navigation.getParam('descript', 'Enter a description here!');
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      this.setState({ id });
      this.setState({ name });
      this.setState({ longitude });
      this.setState({ latitude });
      this.setState({ descript });
    });
    this.setState({ loading: false });
  }
  render() {
    const descript = this.props.navigation.getParam('descript', 'Enter a description here!');
    const loading = this.state.loading;
    return (
      <View>
        {loading == true ?
          <Text>Loading location info...</Text> :
          <View style={styles.forms}>
            <TextInput
              style={styles.header} onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />
            <Text style={styles.subtitle}>{this.state.latitude}, {this.state.longitude}</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.descript} onChangeText={(descript) => this.setState({ descript })}
              value={this.state.descript} />
            <TouchableOpacity style={styles.opacity}><Text style={styles.submit} onPress={() => handleSubmit(this.state)}>Save Location</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemove(this.state)} style={styles.deleteop}><Image style={styles.deleteim} source={require('./assets/trashbutton.png')} /></TouchableOpacity></View>
        }
      </View>
    )
  }
}
