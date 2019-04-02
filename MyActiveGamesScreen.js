import React, { Component } from "react";
import {AppRegistry, FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
  } from "react-native";
  import {List, ListItem} from 'react-native-elements';
  import { withNavigation } from 'react-navigation';
  import NavigationService from './NavigationService';
  import firebase from './fbase';

var database = firebase.database();

function handleSubmit(hunts) {
  NavigationService.navigate('TreasureHuntMode', {data: hunts});
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
          //console.log(loc[key].id)
      }
      hunts = Object.values(h);
      this.setState({hunts});

      //console.log(this.state);
  });
}catch{}
}
renderRow ( {item} ) {
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
      //onPress={() => NavigationService.navigate('SavedLocation', { id: item.id, name: item.name, descript: item.descript, latitude: item.latitude, longitude: item.longitude })}
      />
  )
}
  render ()
  {
      return (
        <View>
        <Text style={[styles.header]}>Active Games
        </Text>
        <List style={{flex: 6}}>
            <FlatList
                data={this.state.hunts}
                renderItem={this.renderRow}
                keyExtractor={item => item.id}
            />
        </List>
        <TouchableOpacity style={[styles.header]}>
          <Text onPress={() => handleSubmit(this.state.hunts.filter(item => item.progress != item.end && item.progress >= 0))}>
            Enter TREASURE HUNT Mode >
          </Text>
        </TouchableOpacity>
    </View>
      )
  }
}
const styles = StyleSheet.create ({
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5
  },
  descript: {
    fontSize: 20,
    margin: 8
  },
  flexhalf: {
    flex: 0.5,
  }
});