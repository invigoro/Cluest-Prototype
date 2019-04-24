//LIST OF ALL LOCATIONS SAVED
//LOCATIONS CAN BE MODIFIED AND DELETED

import React, { Component } from "react";
import {
    AppRegistry, FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { List, ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import NavigationService from './NavigationService';
import firebase from './fbase';
import styles from './styles';

var database = firebase.database();

class MyLocationsScreen extends Component {
    constructor(props) {
        super(props);
        this.getLocations = this.getLocations.bind(this); //bind function to this instance 
    }
    state = {
        user: firebase.User
    }
    //Get current fbase user
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => { this.setState({ user }); this.getLocations(user) });
    }
    getLocations(user) {
        try {
            database.ref('locations/' + user.uid).on('value', (snapshot) => {
                var loc = snapshot.val();
                lockeys = Object.keys(loc);
                for (var i = 0; i < lockeys.length; i++) {
                    var key = lockeys[i];
                    loc[key].id = key;
                }
                locations = Object.values(loc);
                this.setState({ locations });
            });
        } catch{ }
    }
    renderRow({ item }) {
        return (
            <TouchableWithoutFeedback>
                <ListItem
                    title={item.name}
                    subtitle={item.latitude + ", " + item.longitude}
                    onPress={() => NavigationService.navigate('SavedLocation', { id: item.id, name: item.name, descript: item.descript, latitude: item.latitude, longitude: item.longitude })}
                /></TouchableWithoutFeedback>
        )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text style={styles.header}>
                    My Locations
                </Text>
                <List>
                    <FlatList
                        data={this.state.locations}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.name}
                        style={{ marginBottom: 150 }}
                    />
                </List>
            </View>
        );
    }
}

export default MyLocationsScreen;