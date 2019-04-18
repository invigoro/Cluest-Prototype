import { Facebook } from 'expo';
import firebase from './fbase';
import facebookappid from './keys';

import NavigationService from './NavigationService';
import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Button,
    Image,
    ImageBackground,
  } from "react-native";
  import styles from './styles';

  var newid = null;
  var fuser = null;
  var friendies = null;
  console.ignoredYellowBox = ['Setting a timer'];

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      console.log("We are authenticated now!");
      fuser = user;
    }
    
  });

  function setFID(user, fid, fiends) {
    var friendID = null;
    var info = null;
    if (user != null) {
      
      firebase.database().ref('users/' + user.uid).set({
        fbid: fid,
        picture: user.photoURL,
        displayName: user.displayName
      });
      //get friend info
      //console.log(fiends)
      //console.log(user)
      /*firebase.database().ref('users/' + user.uid).set({
        friends: fiends,

      });*/
      for(i = 0; i < fiends.length; i++){
        var friendfbID = fiends[i]["id"];
        //how do I get friend ID
        //second operation to query database for actual token
        
        //I hope this one actually returns the user node w/ the correct val
        firebase.database().ref("users").orderByChild("fbid").equalTo(friendfbID).once("value", (snapshot) => {
          snapshot.forEach((child) => {this.friendID = child.key});
          
          //console.log(this.friendID);
          firebase.database().ref('users/' + this.friendID).once('value', (snapshot) => {
            this.info = snapshot.val();
            
            firebase.database().ref('friends/' + user.uid + "/" + friendfbID).set({
              name: this.info.displayName,
              pic: this.info.picture,
              token: this.friendID
            });
            this.info = [this.info.fbid, this.info.displayName, this.info.picture];
        });
        });

    }

    }
  }

  async function logIn() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync(facebookappid, {
        permissions: ['public_profile', 'user_friends'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const friendos = await fetch(`https://graph.facebook.com/v3.2/me/friends?access_token=${token}`);
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        
        friendies = (await friendos.json()).data;
        var me = (await response.json());
        newid = me.id;
        //console.log(me)
        //console.log(friendies);
        //Alert.alert('User id', 'Hi' + newid);
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
        // Sign in with credential from the Facebook user.
        await firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
          // Handle Errors here.
        });

        setFID(fuser, newid, friendies);
        
        
    NavigationService.navigateTo('Home');
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  export default class LogIn extends Component {
    state = {
      loading: true
    }
    componentDidMount(){
      this.setState({loading: false})
    }
    render ()
    {
      const loading = this.state.loading;
      return (
        <ImageBackground
        source={require('./assets/splashnew.png')}
        imageStyle={{resizeMode: 'contain'}}
        style={{flex: 1, backgroundColor: '#B8F7FF'}}
      >
          {
            loading == true ? 
            <Text style={styles.header}>Loading...</Text> : 
            <View style={{padding: 30, flex: .70, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'stretch'}}>
            <Button title="Log in with Facebook" onPress={() => logIn()}></Button>
            </View>
          }
          </ImageBackground>
      );
    }
  }
