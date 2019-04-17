import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity
  } from "react-native";
import firebase from './fbase';

import styles from './styles';
//import {styles} from './StyleSheet';
import {Facebook} from 'expo';

function storeHighScore(user, score) {
  if (user != null) {
    firebase.database().ref('users/' + user.uid).set({
      highscore: score
    });
  }
}


class HomeScreen extends Component {
    //state = App.getState()
    state = {
        user: firebase.User
    }

    componentDidMount() {

      firebase.auth().onAuthStateChanged(user => this.setState({user}));
    }
    componentWillMount() {
      //this.state.user = firebase.user;
      //store = this.props.screenProps
      //const {store} = this.props.screenProps
      //const {info} = store.getState()
      //this.setState({info})
    }
    componentWillUnmount() {

    }
    render() {
      const {user} = this.state

      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          backgroundColor: 'skyblue',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
        style={{width: 50, height: 50, borderRadius: 25}}
        source={{uri: this.state.user.photoURL}}
          /></View>
          <View style={[styles.fourRows, {flexDirection: 'column'}]}>  
            <Text style={styles.welcome}>CLUEST</Text>
            <Text style={[styles.welcome, {fontSize: 18, fontWeight: '300', letterSpacing: 0}]}>Welcome, {this.state.user.displayName}</Text>
          </View>
          <View style={styles.fourRows}> 
            <TouchableOpacity style={styles.squareish} onPress={() => /*logIn()*/this.props.navigation.navigate('Friends')}>
              <Text style={styles.squareText}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareish} onPress={() => this.props.navigation.navigate('ActiveGames', this.props)}>
              <Text style={styles.squareText}>Active Games</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.fourRows}>
            <TouchableOpacity style={styles.squareish} onPress={() => this.props.navigation.navigate('Locations')}>
              <Text style={styles.squareText}>My Locations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareish} onPress={() => this.props.navigation.navigate('Hunts')} >
              <Text style={styles.squareText}>My Hunts</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.fourRows, styles.bottomBar, {flex: 0.15}]}>
            <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Stats')}>
              <Text style={styles.squareText}>Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('NewLocation')}>
              <Text style={styles.squareText}>New Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={() => /*storeHighScore(this.state.user, 600)*/this.props.navigation.navigate('Settings')}>
              <Text style={styles.squareText}>Options</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }


 
  export default HomeScreen;