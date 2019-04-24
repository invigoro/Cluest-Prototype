//VIEW CREATED HUNTS OR MAKE A NEW ONE

//IMPORTS
import React, { Component } from "react";
import {
  AppRegistry, FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { List, ListItem } from 'react-native-elements';
import styles from './styles';
import NavigationService from './NavigationService';
import firebase from './fbase';

var database = firebase.database();

function handleSubmit() {
  NavigationService.navigateTo('CreateHunt1');
}

export default class MyHuntsScreen extends Component {

  constructor(props) {
    super(props);
    this.getHunts = this.getHunts.bind(this);
  }
  state = {
    user: firebase.User
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => { this.setState({ user }); this.getHunts(user) });
  }
  getHunts(user) {
    try {
      database.ref('hunts/' + user.uid).once('value', (snapshot) => {
        if (snapshot.exists()) {
          var h = snapshot.val();
          huntkeys = Object.keys(h);
          for (var i = 0; i < huntkeys.length; i++) {
            var key = huntkeys[i];
            h[key].id = key;
          }
          hunts = Object.values(h);
          this.setState({ hunts });
        }
      });
    } catch{ return; }
  }
  renderRow({ item }) {
    return (
      <ListItem
        hideChevron={true}
        title={item.title}
        subtitle={item.descript}
      />
    )
  }
  render() {
    return (
      <View>
        <Text style={[styles.header]}>My Hunts
        </Text>
        <List style={{ flex: 6 }}>
          <FlatList
            data={this.state.hunts}
            renderItem={this.renderRow}
            keyExtractor={item => item.id}
          />
        </List>
        <TouchableOpacity style={[styles.opacity]}>
          <Text style={styles.submit} onPress={() => handleSubmit()}>
            Create a new Hunt
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}