//SHOW CURRENT CLUES OF HUNTS RECEIVED
//CAN START HUNT OR CONTINUE FROM HERE
//CAN DELETE HUNT
//SHOWS PREVIOUS CLUES AS WELL 

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import React, { Component } from "react";
import styles from './styles';
import firebase from './fbase';
import NavigationService from './NavigationService';
var database = firebase.database();

//Navigate to treasure hunt mode
function handleSubmit(info) {
  if (info.hunt.progress < 0) {
    database.ref('received/' + info.user.uid + '/' + info.hunt.id + '/progress').set(0);
    Alert.alert("Hunt begun!", "The first clue for this hunt is available in the list at the top of the screen.")
  }
  NavigationService.navigateTo('TreasureHuntMode')
}

//delete hunt
function handleRemove(info) {
  var path = 'received/' + info.user.uid + '/' + info.hunt.id;
  console.log(path);
  NavigationService.navigate('DeleteScreen', { path: path });
}

export default class ViewReceivedHunt extends Component {
  state = {
    user: firebase.User,
    hunt: {
      title: 'null',
      descript: 'null'
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => { this.setState({ user }) });
    const { navigation } = this.props;
    const hunt = navigation.getParam('hunt', 'no hunt');
    this.setState({ hunt });
  }
  renderRow({ item }) {
    return (
      <ListItem
        title={item.name}
        subtitle={item.descript}
        hideChevron={true}
      />
    )
  }
  render() {
    const hunt = this.props.navigation.getParam('hunt', 'no hunt');
    var pastClues = []
    for (var i = hunt.progress - 1; i >= 0; i--) {
      pastClues.push(hunt[i])
    }
    return (
      <View style={styles.forms}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: hunt.photo }}
        />
        <Text style={styles.header}>{hunt.title}</Text>
        <Text style={styles.subtitle}>{hunt.author}</Text>
        <Text style={styles.descript}>{hunt.descript}</Text>
        <Text style={styles.descript}>Next Clue: {hunt.progress >= 0 ? (hunt[hunt.progress].descript).toString() : 'Start this hunt to find out!'}</Text>
        <TouchableOpacity style={styles.opacity}><Text style={styles.submit} onPress={() => handleSubmit(this.state)}>{hunt.progress >= 0 ? 'Continue Hunt!' : 'Begin Hunt!'}</Text></TouchableOpacity>
        {hunt.progress > 0 ? <View style={{ marginBottom: 15 }}><Text style={[styles.header]}>Past Clues</Text>

          <FlatList
            data={pastClues}
            renderItem={this.renderRow}
          /></View>
          : null}
        <TouchableOpacity onPress={() => handleRemove(this.state)} style={styles.deleteop}><Image style={styles.deleteim} source={require('./assets/trashbutton.png')} /></TouchableOpacity>
      </View>
    )
  }
}