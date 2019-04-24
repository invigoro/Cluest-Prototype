//LIST FB FRIENDS
//SELECTING FRIENDS TAKES YOU TO SendHunt1.js WHICH SENDS HUNTS TO THAT FRIEND

import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { List, ListItem } from 'react-native-elements';
import NavigationService from './NavigationService';


import firebase from './fbase';
import styles from './styles'

var database = firebase.database();

function handleSubmit(item) {
  NavigationService.navigate('SendHunt1', { friend: item });
}


export default class MyFriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.getFriendList = this.getFriendList.bind(this);
  }

  state = {
    user: firebase.User
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => { this.setState({ user }); this.getFriendList(user) });
  }
  getFriendList(user) {
    database.ref('friends/' + user.uid).on('value', (snapshot) => {
      //console.log(user);
      //console.log(user.uid);
      var friendos = snapshot.val();
      //console.log(friendos);
      try {

        var friends = Object.values(friendos);
        this.setState({ friends });


      }
      catch {

      }
      //console.log(this.state);
    });
  }
  renderRow({ item }) {
    return (
      <ListItem
        roundAvatar
        title={item.name}
        id={item.token}
        avatar={{ uri: item.pic }}
        onPress={() => handleSubmit(item)}
      />
    )
  }
  render() {
    const { user } = this.state;
    return (

      <View>
        <Text style={styles.header}>
          My Friends
            </Text>
        <List>
          <FlatList
            data={this.state.friends}
            renderItem={this.renderRow}
            keyExtractor={item => item.token}
          />
        </List>
      </View>
    )
  }
}