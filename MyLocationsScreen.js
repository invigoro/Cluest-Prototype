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
  
class MyLocationsScreen extends Component {
  
  state = {
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
}
renderRow ( {item} ) {
    return (
        <ListItem
        title={item.name}
        subtitle={item.latitude + ", " + item.longitude}
        onPress={() => NavigationService.navigate('SavedLocation', { id: id, name: item.name, latitude: item.latitude, longitude: item.longitude })}
        />
    )
}
render ()
{
    const {navigate} = this.props.navigation;
    console.log(navigate)
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
                    data={this.state.games}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.name}
                />
            </List>
        </View>
    );
}
}

export default MyLocationsScreen;
