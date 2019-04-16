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

  const styles = StyleSheet.create({
    fourRows: {
      flex: 0.25, 
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'space-around'
    },
    squareish: {
      padding: 15,
      textAlign: 'center',
      borderRadius: 35,
      width: '32%',
      backgroundColor: '#e6ffff',
      height: '64%',
    },
    welcome: {
      fontSize: 35,
      textAlign: "justify",
      margin: 10,
      fontWeight: '600',
      textShadowOffset: {width: 50, height: 50},
      textShadowColor: 'black',
      letterSpacing: 25,
      textAlignVertical: 'bottom'
    },
    squareText: {
      textAlign: 'center',
      flex: 1,
      textAlignVertical: 'center',
      fontWeight: '500',
      color: 'black',
      fontSize: 16
    },
    bottomBar: {
      backgroundColor: 'tan'
    },
    bottomButton: {
      width: '33%',
      height: '100%',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  
  });
 
  export default HomeScreen;