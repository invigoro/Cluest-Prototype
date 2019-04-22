import React, { Component } from "react";
import {AppRegistry, FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
  } from "react-native";
  import {List, ListItem} from 'react-native-elements';
  import styles from './styles';
  import { withNavigation } from 'react-navigation';
  import NavigationService from './NavigationService';
  import firebase from './fbase';

var database = firebase.database();

function handleSubmit(hunts) {
  if (hunts == null)
  {
    Alert.alert("No Hunts Started", "Please select at least one hunt and begin it to enter Treasure Hunt Mode.");
  }
  else {
    NavigationService.navigateTo('TreasureHuntMode');
  }
}

function handleSubmit2(hunts, id, user){
  /*console.log('\nBEGIN\nid: \n-----------');
  console.log(id);
  console.log('\nhunts:\n----------');
  console.log(hunts);
  console.log('\nuser:\n--------------');
  console.log(user);
  console.log('\nprogress:\n-----------');
  console.log(hunts[id].progress);
  console.log('\nhunt[index]:\n-----------');
  console.log(hunts[id]);
  console.log("Title: " + hunts[id].title);*/
  if(hunts[id].progress >= 0) {
    console.log('greater than 0');
  //var filteredHunts = hunts.filter(item => item.progress != item.end && item.progress >= 0);
    NavigationService.navigate('ReceivedHunt', {hunt: hunts[id]});
  }
  else {
    hunt = hunts[id]
    database.ref('received/' + user.uid + '/' + hunt.id + '/progress').set(0);
    Alert.alert('Hunt started', 'This hunt has been started and the first clue is available at the top of the screen.');
    NavigationService.navigateTo('TreasureHuntMode');
    //handleSubmit(filteredHunts);
  }
  
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
  firebase.auth().onAuthStateChanged(user => {this.setState({user}); this.getHunts(user)});
}
getHunts(user) {
  try{
  database.ref('received/' + user.uid).on('value', (snapshot) => {
     
    //console.log(user);
    //console.log(user.uid);
      var h = snapshot.val();
      //console.log(friendos);
      huntkeys = Object.keys(h);
      //console.log(loc);
      for(var i = 0; i < huntkeys.length; i++) {
          var key = huntkeys[i];
          h[key].id = key;
          h[key].index = i;
          //console.log(loc[key].id)
      }
      hunts = Object.values(h);
      this.setState({hunts});
      //console.log(hunts);

      //console.log(this.state);
  });
}catch{}
}


renderRow = ( {item} ) => {
  var weight = item.progress == -1 ? 'bold' : 'normal';
  var red = item.progress == -1 ? <View style={{width: 5, height: 5, backgroundColor: 'red', borderRadius: 5}}></View> : false;
  return (
      <ListItem
      roundAvatar
      title={item.title}
      subtitle={item.descript}
      titleStyle={{fontWeight: weight}}
      subtitleStyle={{fontWeight: weight}}
      avatar={{ uri: item.photo }}
      checkmark={red}
      onPress={() => handleSubmit2(this.state.hunts, item.index, this.state.user)}
      //onPress={() => NavigationService.navigate('SavedLocation', { id: item.id, name: item.name, descript: item.descript, latitude: item.latitude, longitude: item.longitude })}
      />
  )
}

  render ()
  {
      return (
        <View style={{justifyContent: 'space-around'}}>
        <Text style={[styles.header]}>Active Games
        </Text>
        <List >
            <FlatList
                data={this.state.hunts}
                renderItem={this.renderRow}
                keyExtractor={item => item.index}
                style={{height: '65%'}}
            />
        </List>
        <TouchableOpacity style={[styles.opacity, {marginBottom: 10}]}>
          <Text style={styles.submit} onPress={() => handleSubmit(this.state.hunts.filter(item => item.progress != item.end && item.progress >= 0))}>
            Enter TREASURE HUNT Mode
          </Text>
        </TouchableOpacity>
    </View>
      )
  }
}