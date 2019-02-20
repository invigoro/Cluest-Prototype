import {Text, View} from 'react-native';
import React, { Component } from "react";
export default class SavedLocation extends Component{
    render()
    {
        const {navigation } = this.props;
        const id = navigation.getParam('id', 'no id');
        const name = navigation.getParam('name', 'NO NAME');
        const longitude = navigation.getParam('longitude', 'null');
        const latitude = navigation.getParam('latitude', 'null');
        return(
            <View>
                <Text>{name}</Text>
                <Text>{latitude}, {longitude}</Text>
            </View>
        );
    }
}