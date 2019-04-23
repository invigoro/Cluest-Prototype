import React, { Component } from "react";
import {AppRegistry, FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
  } from "react-native";
  import styles from './styles';
  import {List, ListItem} from 'react-native-elements';
  import { withNavigation } from 'react-navigation';
  import NavigationService from './NavigationService';
  import firebase from './fbase';

var database = firebase.database();

export default class MyStatsScreen extends Component {
  state = {
    steps: null,
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {this.setState({user}); this.getStats(user);
        });
  }
  getStats(user) {
    database.ref('users/' + user.uid + '/').once('value', (snapshot) => {
      var steps = snapshot.val().steps;
      this.setState({steps: steps});
    });
  }
  render ()
  {
      return (
          <View>
              <Text style={styles.header}>Stats Page</Text>
              <Text style={styles.descript}>Total Steps: {this.state.steps}</Text>
          </View>
      )
  }
}