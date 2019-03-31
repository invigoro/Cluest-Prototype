import React, { Component } from "react";
import {
    StyleSheet, FlatList,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Button,
  } from "react-native";
  import {List, ListItem} from 'react-native-elements';
import firebase from './fbase';
import NavigationService from './NavigationService';
import DraggableFlatList from 'react-native-draggable-flatlist';

var database = firebase.database();

function handleSubmit(loc){
  //const loc = this.state.locations.filter(item => item.isSelect);
  //console.log(loc);
  NavigationService.navigate('CreateHunt3', {data: loc});
}

export default class CreateHunt2 extends Component {
  state = {
    locations: 'x',
    user: firebase.User,
    data: 'x'
  }
  componentDidMount() {
    const { navigation } = this.props;
    var locations = navigation.getParam('locations', 'no locations');
    //console.log(locations);
    const data = Object.values(locations);
    //console.log(data);

    firebase.auth().onAuthStateChanged(user => {this.setState({user}); 
    this.setState({data});
    //console.log(this.state);
    });
  }
 
  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    let num = index + 1;
    return (
      <ListItem
        title={item.name}
        subtitle={item.latitude + ", " + item.longitude}
        style={{
          backgroundColor: isActive? 'lightgray' : 'white'
        }}
        rightTitle={num}
        onLongPress={move}
        onPressOut={moveEnd}
      />
    )
  }
 
  render() {
    //console.log(this.state.data);
    return (
      <View style={{ flex: 1 }}>
      <Text style={{fontSize: 30, textAlign: 'center', flex: 0.5}}>Re-order to create hunt</Text>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ data })}
          style={{flex: 6}}
        />
        <TouchableOpacity style={{flex:1}} onPress={() => handleSubmit(this.state.data)}>
          <Text>Save Order -></Text>
        </TouchableOpacity>

      </View>
    )
  }
  }