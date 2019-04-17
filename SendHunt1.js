import React, { Component } from "react";
import {AppRegistry, FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
  } from "react-native";
  import styles from './styles';
  import {List, ListItem} from 'react-native-elements';
  import { withNavigation } from 'react-navigation';
  import NavigationService from './NavigationService';
  import firebase from './fbase';

var database = firebase.database();


function handleSubmit(hunts, user, friend){
  //console.log(hunts);
      //console.log(hunts[j]["id"]);
      database.ref('received/' + friend.token + '/' + hunts.id).once("value", snapshot => {
        if (!snapshot.exists()){
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds
      /*if(hunts.length == 1){
      j--;}*/

     database.ref('received/' + friend.token + '/' + hunts.id).set({
        author: user.displayName,
        authorid: user.uid,
        title: hunts.title,
        descript: hunts.descript,
        photo: user.photoURL,
        progress: -1,
        end: hunts.end,
        date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec, 
    });

    var i = 0;
    while(i < 1000) {
      try{
        database.ref("received/" + friend.token + "/" + hunts["id"] + "/" + i).set({
          id: hunts[i].id,
          descript: hunts[i].descript,
          latitude: hunts[i].latitude,
          longitude: hunts[i].longitude,
          name: hunts[i].name
      })
      }
      catch {break;}
      i++;
    }}
  })
  Alert.alert("Success", "Treasure hunts sent to " + friend.name + "!");
    
    //const hunt = this.state.hunts.filter(item => item.isSelect);
    //console.log(hunt);
    
    NavigationService.resetToHome();
  
}

export default class SendHunt1 extends Component {
    constructor(props) {
        super(props);
        this.getHunts = this.getHunts.bind(this);
      }
      
        state = {
          user: firebase.User,
          hunts: [],
          friend: "no friend selected"
      }
      componentDidMount() {
        const { navigation } = this.props;
        var friend = navigation.getParam('friend', 'no friend selected');
        firebase.auth().onAuthStateChanged(user => {this.setState({user}); this.getHunts(user)});
        this.setState({friend});
      }

      
      getHunts(user) {
        database.ref('hunts/' + user.uid).on('value', (snapshot) => {
            try {
                var hunt = snapshot.val();
                huntkeys = Object.keys(hunt);
                for(var i = 0; i < huntkeys.length; i++) {
                var key = huntkeys[i];
                hunt[key].id = key;
                //hunt[key].isSelect = false;
                //hunt[key].selectedClass = styles.list;
            }
            hunts = Object.values(hunt);
            this.setState({hunts});
        }
        catch {}
        });
      }
      /*selectItem = item => {
          item.isSelect = !item.isSelect;
          item.selectedClass = item.isSelect ? styles.selected: styles.list;
          var index = -1;
          for(var i = 0; i < this.state.hunts.length; i++)
          {
              if(this.state.hunts[i].id == item.id) {index = i;}
          }
          this.state.hunts[index] = item;
          this.setState({
              hunts: this.state.hunts,
          });

      };*/
      renderItem = ( {item} ) => {
          
          return(
        
  <ListItem
    title={item.title}
    subtitle={item.descript}
    onPress = {() => handleSubmit(item, this.state.user, this.state.friend)}
        />
);}


    render ()
    {
        //const itemNumber = this.state.hunts.filter(item => item.isSelect);
        return (
            <View>
                <Text style={styles.header}>Choose a hunt</Text>
                <FlatList
                    data={this.state.hunts}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    extraData={this.state}
                    />
                <TouchableOpacity onPress={() => handleSubmit(itemNumber, this.state.user, this.state.friend)}>
                    <Text style={styles.header}>Send to {this.state.friend.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
  }