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

function getKey(item) {
    console.log(item);
    var myItem = Object.keys(item);
    console.log(myItem);
    return myItem[0];
}
  
class MyLocationsScreen extends Component {
  
  /*state = {
    //THESE ARE ALL SAMPLE COORDINATES
    games: [
        {
            id: 1,
            name: 'Location 1',
            latitude: '34.234',
            longitude: '56.234',
        },
        {
            id: 2,
            name: 'Location 2',
            latitude: '44.234',
            longitude: '78.096',
        },
        {
            id: 3,
            name: 'Location 3',
            latitude: '101.111',
            longitude: '-98.870',
        }
    ]
}*/
constructor(props) {
    super(props);
    this.getLocations = this.getLocations.bind(this);
  }
  
    state = {
      user: firebase.User
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {this.setState({user}); this.getLocations(user)});
  }
  getLocations(user) {
    database.ref('locations/' + user.uid).on('value', (snapshot) => {
      //console.log(user);
      //console.log(user.uid);
        var loc = snapshot.val();
        //console.log(friendos);
        lockeys = Object.keys(loc);
        //console.log(loc);
        for(var i = 0; i < lockeys.length; i++) {
            var key = lockeys[i];
            loc[key].id = key;
            //console.log(loc[key].id)
        }
        locations = Object.values(loc);
        this.setState({locations});

        //console.log(this.state);
    });
  }
renderRow ( {item} ) {
    return (
        <ListItem
        title={item.name}
        subtitle={item.latitude + ", " + item.longitude}
        onPress={() => NavigationService.navigate('SavedLocation', { id: item.id, name: item.name, descript: item.descript, latitude: item.latitude, longitude: item.longitude })}
        />
    )
}
render ()
{
    const {navigate} = this.props.navigation;
    //console.log(navigate)
    //console.log(this.state.locations)
    return (
        /*<View>
            <Text>Active Games Page</Text>
        </View>*/
        <View>
            <Text style={{fontSize: 30, textAlign: 'center'}}>
                My Locations
            </Text>
            <List>
                <FlatList
                    data={this.state.locations}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.id}
                />
            </List>
        </View>
    );
}
}

export default MyLocationsScreen;
