import {StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    TextInput,} from 'react-native';
import React, { Component } from "react";
import firebase from './fbase';
import NavigationService from './NavigationService';
var database = firebase.database();

function handleSubmit(info) {
    console.log(info);
    console.log(info.latitude);
    database.ref('locations/' + info.user.uid + "/" + info.id).set({
      descript: info.descript,
      latitude: info.latitude,
      longitude: info.longitude,
      name: info.title
    });
    NavigationService.goBack();
  }
export default class SavedLocation extends Component{
    state = {
    user: firebase.User,
    }
    componentDidMount() {
        const {navigation } = this.props;
        const id = navigation.getParam('id', 'no id');
        const name = navigation.getParam('name', 'Enter a name here!');
        const longitude = navigation.getParam('longitude', 'null');
        const latitude = navigation.getParam('latitude', 'null');
        const descript = navigation.getParam('descript', 'Enter a description here!');
        firebase.auth().onAuthStateChanged(user => {this.setState({user}); 
        this.setState({id});
        this.setState({name});
        this.setState({longitude});
        this.setState({latitude});
        this.setState({descript});});
      }
    render()
    {
        const descript = this.props.navigation.getParam('descript', 'Enter a description here!');
        return (
            <View>
                <TextInput
                style={styles.header} onChangeText={(title) => this.setState({title})}
                //value={this.state.title}
                placeholder={this.state.name}
                />
                <Text style={styles.subtitle}>{this.state.latitude}, {this.state.longitude}</Text>
                <TextInput
                multiline = {true}
                numberOfLines = {4}
                style={styles.descript} onChangeText={(descript) => this.setState({descript})}
                placeholder = {descript}/>
                <TouchableOpacity><Text onPress={() => handleSubmit(this.state)}>Save Location</Text></TouchableOpacity>
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
    }
  });