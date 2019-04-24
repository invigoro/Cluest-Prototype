//VIEW RECEIVED TREASURE HUNTS, OPEN THEM, OR NAVIGATE TO TREASURE HUNT MODE

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


//Handle treasure hunt mode button
function handleSubmit(hunts) {
  if (hunts == null) {
    Alert.alert("No Hunts Started", "Please start at least one hunt to enter Treasure Hunt Mode.");
  }
  else {
    NavigationService.navigateTo('TreasureHuntMode');
  }
}

//handle moving to view specific hunt
function handleSubmit2(hunts, id) {
  NavigationService.navigate('ReceivedHunt', { hunt: hunts[id] });
}


export default class MyActiveGames extends Component {

  constructor(props) {
    super(props);
    this.getHunts = this.getHunts.bind(this);
  }
  state = {
    user: firebase.User,
    hunts: null
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => { this.setState({ user }); this.getHunts(user) });
  }
  //Retreive hunts from firebase
  getHunts(user) {
    try {
      database.ref('received/' + user.uid).on('value', (snapshot) => {
        var h = snapshot.val();
        huntkeys = Object.keys(h);
        for (var i = 0; i < huntkeys.length; i++) {
          var key = huntkeys[i];
          h[key].id = key;
          h[key].index = i;
        }
        hunts = Object.values(h);
        this.setState({ hunts });
      });
    } catch{ }
  }


  renderRow = ({ item }) => {
    var weight = item.progress == -1 ? 'bold' : 'normal';
    var red = item.progress == -1 ? <View style={{ width: 5, height: 5, backgroundColor: 'red', borderRadius: 5 }}></View> : false;
    return (
      <ListItem
        roundAvatar
        title={item.title}
        subtitle={item.descript}
        titleStyle={{ fontWeight: weight }}
        subtitleStyle={{ fontWeight: weight }}
        avatar={{ uri: item.photo }}
        checkmark={red}
        onPress={() => handleSubmit2(this.state.hunts, item.index)}

      />
    )
  }

  render() {
    return (
      <View style={{ justifyContent: 'space-around' }}>
        <Text style={[styles.header]}>Active Games
        </Text>
        <List >
          <FlatList
            data={this.state.hunts}
            renderItem={this.renderRow}
            keyExtractor={item => item.index}
            style={{ height: '65%' }}
          />
        </List>
        <TouchableOpacity style={[styles.opacity, { marginBottom: 10 }]}>
          <Text style={styles.submit} onPress={() => handleSubmit(this.state.hunts.filter(item => item.progress != item.end && item.progress >= 0))}>
            Enter TREASURE HUNT Mode
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}