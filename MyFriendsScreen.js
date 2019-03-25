import React, { Component } from "react";
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    Alert,
    TouchableOpacity
  } from "react-native";
  import {List, ListItem} from 'react-native-elements';
 

import firebase from './fbase';

var database = firebase.database();



export default class MyFriendsScreen extends Component {
constructor(props) {
  super(props);
  this.getFriendList = this.getFriendList.bind(this);
}

  state = {
    user: firebase.User
}
componentDidMount() {
  firebase.auth().onAuthStateChanged(user => {this.setState({user}); this.getFriendList(user)});
}
getFriendList(user) {
  database.ref('friends/' + user.uid).once('value', (snapshot) => {
    //console.log(user);
    //console.log(user.uid);
      var friendos = snapshot.val();
      //console.log(friendos);
      var friends = Object.values(friendos);
      this.setState({friends});
      //console.log(this.state);
  });
}
renderRow ( {item} ) {
  return (
      <ListItem
      title={item.name}
      id={item.token}
      avatar={{uri: item.pic}}
      />
  )
}
  render ()
  {
    const {user} = this.state;
    return (
      
          <View>
              <Text style={{fontSize: 30, textAlign: 'center'}}>
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