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

function handleSubmit(loc){
    //const loc = this.state.locations.filter(item => item.isSelect);
    //console.log(loc);
    NavigationService.navigate('CreateHunt2', {locations: loc});
  }

export default class CreateHunt1 extends Component {
    constructor(props) {
        super(props);
        this.getLocations = this.getLocations.bind(this);
      }
      
        state = {
          user: firebase.User,
          locations: []
      }
      componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {this.setState({user}); this.getLocations(user)});
      }

      
      getLocations(user) {
        database.ref('locations/' + user.uid).on('value', (snapshot) => {
            try {
                var loc = snapshot.val();
                lockeys = Object.keys(loc);
                for(var i = 0; i < lockeys.length; i++) {
                var key = lockeys[i];
                loc[key].id = key;
                loc[key].isSelect = false;
                loc[key].selectedClass = styles.list;
            }
            locations = Object.values(loc);
            this.setState({locations});
        }
        catch {}
        });
      }
      selectItem = item => {
          item.isSelect = !item.isSelect;
          item.selectedClass = item.isSelect ? styles.selected: styles.list;
          var index = -1;
          for(var i = 0; i < this.state.locations.length; i++)
          {
              if(this.state.locations[i].id == item.id) {index = i;}
          }
          this.state.locations[index] = item;
          this.setState({
              locations: this.state.locations,
          });

      };
      renderItem = ( {item} ) => {
          
          return(
        <TouchableOpacity
    style={[item.selectedClass]}      
    onPress={() => this.selectItem(item)}
  >
  <ListItem
    title={item.name}
    subtitle={item.latitude + ", " + item.longitude}
        />
</TouchableOpacity>
);}


    render ()
    {
        const itemNumber = this.state.locations.filter(item => item.isSelect);
        //console.log(itemNumber);
        
        return (
            <View>
                <Text style={{fontSize: 30, textAlign: 'center'}}>Choose 2 or more Locations</Text>
                <FlatList
                    data={this.state.locations}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    extraData={this.state}
                    />
                <TouchableOpacity onPress={() => handleSubmit(itemNumber)}>
                    <Text>Make a Treasure Hunt!</Text>
                </TouchableOpacity>
            </View>
        )
    }
  }
  const styles = StyleSheet.create({
    list: {
        backgroundColor: "white",
      },
      selected: {backgroundColor: "lightgray"},
  });