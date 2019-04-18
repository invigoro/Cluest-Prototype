import {StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    TextInput,} from 'react-native';
import React, { Component } from "react";
import styles from './styles';
import firebase from './fbase';
import NavigationService from './NavigationService';
var database = firebase.database();

function handleSubmit(info) {
    //console.log(info);
    //console.log(info.latitude);
    database.ref('locations/' + info.user.uid + "/" + info.id).set({
      descript: info.descript,
      latitude: info.latitude,
      longitude: info.longitude,
      name: info.name
    });
    NavigationService.goBack();
  }
export default class SavedLocation extends Component{
    state = {
    user: firebase.User,
    loading: true
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
        this.setState({loading: false});
      }
    render()
    {
        const descript = this.props.navigation.getParam('descript', 'Enter a description here!');
        const loading = this.state.loading;
        return (
            <View>
              { loading == true ? 
              <Text>Loading location info...</Text> :
                <View style={styles.forms}>
                <TextInput
                style={styles.header} onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                //placeholder={this.state.name}
                />
                <Text style={styles.subtitle}>{this.state.latitude}, {this.state.longitude}</Text>
                <TextInput
                multiline = {true}
                numberOfLines = {4}
                style={styles.descript} onChangeText={(descript) => this.setState({descript})}
                value = {this.state.descript}/>
                <TouchableOpacity style={styles.opacity}><Text style={styles.submit} onPress={() => handleSubmit(this.state)}>Save Location</Text></TouchableOpacity></View>
              }
            </View>
        )
    }
  }
  