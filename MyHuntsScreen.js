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
function handleSubmit() {
  NavigationService.navigateTo('CreateHunt1');
}

export default class MyHuntsScreen extends Component {

  constructor(props) {
    super(props);
    this.getHunts = this.getHunts.bind(this);
  }
  state = {
    user: firebase.User
}
componentDidMount() {
  firebase.auth().onAuthStateChanged(user => {this.setState({user}); this.getHunts(user)});
}
getHunts(user) {
  try{
  database.ref('hunts/' + user.uid).once('value', (snapshot) => {
     if(snapshot.exists()) {
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
    }
      //console.log(this.state);
  });
}catch{return;}
}
renderRow ( {item} ) {
  return (
      <ListItem
      title={item.title}
      subtitle={item.descript}
      //onPress={() => NavigationService.navigate('SavedLocation', { id: item.id, name: item.name, descript: item.descript, latitude: item.latitude, longitude: item.longitude })}
      />
  )
}
  render ()
  {
      return (
        <View>
        <Text style={[styles.header]}>My Hunts
        </Text>
        <List style={{flex: 6}}>
            <FlatList
                data={this.state.hunts}
                renderItem={this.renderRow}
                keyExtractor={item => item.id}
            />
        </List>
        <TouchableOpacity style={[styles.header]}>
          <Text onPress={() => handleSubmit()}>
            Create a new Hunt >
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