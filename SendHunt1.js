//SEND HUNT TO A FRIEND
//ONLY ONE HUNT AT A TIME CURRENTLY, WILL ALLOW MULTIPLE LATER

import React, { Component } from "react";
import {
  AppRegistry, FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import styles from './styles';
import { List, ListItem } from 'react-native-elements';
import NavigationService from './NavigationService';
import firebase from './fbase';

var database = firebase.database();


function handleSubmit(hunts, user, friend) {
  database.ref('received/' + friend.token + '/' + hunts.id).once("value", snapshot => {
    if (!snapshot.exists()) {
      //set start date
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds

      //get info from hunt
      database.ref('received/' + friend.token + '/' + hunts.id).set({
        author: user.displayName,
        authorid: user.uid,
        title: hunts.title,
        descript: hunts.descript,
        photo: user.photoURL,
        progress: -1,
        end: hunts.end,
        date:
          date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
      });

      var i = 0;
      while (i < 1000 /*hopefully there won't be more than 1000 locations in a single hunt*/) {
        try {//iterate through up to 1000, each time there is a note with that value as its key, add it as a location to the new hunt
          database.ref("received/" + friend.token + "/" + hunts["id"] + "/" + i).set({
            id: hunts[i].id,
            descript: hunts[i].descript,
            latitude: hunts[i].latitude,
            longitude: hunts[i].longitude,
            name: hunts[i].name
          })
        }
        catch { break; }
        i++;
      }
    }
  })
  Alert.alert("Success", "Treasure hunt sent to " + friend.name + "!");
  NavigationService.resetToHome();

}

export default class SendHunt1 extends Component {
  constructor(props) {
    super(props);
    this.getHunts = this.getHunts.bind(this);
  }

  state = {
    user: firebase.User,
    hunts: [],
    friend: "no friend selected"
  }
  componentDidMount() {
    const { navigation } = this.props;
    var friend = navigation.getParam('friend', 'no friend selected');
    firebase.auth().onAuthStateChanged(user => { this.setState({ user }); this.getHunts(user) });
    this.setState({ friend });
  }


  getHunts(user) {
    database.ref('hunts/' + user.uid).on('value', (snapshot) => {
      try {
        var hunt = snapshot.val();
        huntkeys = Object.keys(hunt);
        for (var i = 0; i < huntkeys.length; i++) {
          var key = huntkeys[i];
          hunt[key].id = key;
        }
        hunts = Object.values(hunt);
        this.setState({ hunts });
      }
      catch { }
    });
  }
  renderItem = ({ item }) => {

    return (

      <ListItem
        title={item.title}
        subtitle={item.descript}
        onPress={() => handleSubmit(item, this.state.user, this.state.friend)}
      />
    );
  }


  render() {
    return (
      <View>
        <Text style={[styles.header]}>Choose a hunt</Text>
        <FlatList
          data={this.state.hunts}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          extraData={this.state}
        />
        <TouchableOpacity onPress={() => handleSubmit(itemNumber, this.state.user, this.state.friend)}>
          <Text style={[styles.descript, { textAlign: 'center' }]}>Select a hunt to send to {this.state.friend.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}