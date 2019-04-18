import React, { Component } from "react";
import {
    StyleSheet, FlatList,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Button,
    TextInput,
  } from "react-native";
  import styles from './styles';
  import firebase from './fbase';
  import NavigationService from './NavigationService';

var database = firebase.database();
  function handleSubmit(state){

    var newPostRef = database.ref("hunts/" + state.user.uid).push({
        author: state.user.displayName,
        authorid: state.user.uid,
        title: state.title,
        descript: state.descript,
        end: state.data.length - 1
    });

    var postID = newPostRef.key;
    for(var i = 0; i < state.data.length; i++)
    {
        database.ref("hunts/" + state.user.uid + "/" + postID + "/" + i).set({
            id: state.data[i].id,
            descript: state.data[i].descript,
            latitude: state.data[i].latitude,
            longitude: state.data[i].longitude,
            name: state.data[i].name
        })
    }
    

    //const loc = this.state.locations.filter(item => item.isSelect);
    //console.log(loc);
    Alert.alert('Hunt Saved', 'Access this hunt in the "My Hunts" section or go to your Friends list to share it!');
    NavigationService.resetToHome();
  }

export default class CreateHunt3 extends Component {
    state = {
      locations: 'x',
      user: firebase.User,
      data: 'x',
      title: 'No Title',
      descript: 'No description'
    }
    componentDidMount() {
      const { navigation } = this.props;
      var data = navigation.getParam('data', 'no locations');
      //console.log(locations);
      //console.log(data);
  
      firebase.auth().onAuthStateChanged(user => {this.setState({user}); 
      this.setState({data});
      //console.log(this.state);
      });
    }
    render() {
        return(
            <View style={styles.forms}>
            <Text style={styles.header}>Enter some info about your hunt</Text>
            <TextInput
              style={styles.header} 
              onChangeText={(title) => this.setState({title})}
              //value={this.state.title}
              placeholder="Enter a title"
              />

              <TextInput
              multiline = {true}
              numberOfLines = {4}
              style={styles.descript} 
              onChangeText={(descript) => this.setState({descript})}
              placeholder = "Enter a description here"/>
            <TouchableOpacity style={styles.opacity} onPress={() => handleSubmit(this.state)}>
                <Text style={styles.submit}>Create my hunt!</Text>
            </TouchableOpacity>
            </View>
            
        )
    }
}