import {StyleSheet} from 'react-native';

const styles = StyleSheet.create ({
    list: {
        backgroundColor: "white",
      },
      selected: {backgroundColor: "lightgray"},
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
    },
    submit: {
      fontSize: 20,
      margin: 8,
      textAlign: 'center'
    },
    opacity: {
      backgroundColor: 'skyblue',
      borderRadius: 20,
      padding: 10,
      margin: 10,
    },
    fourRows: {
        flex: 0.25, 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-around'
      },
      squareish: {
        padding: 15,
        textAlign: 'center',
        borderRadius: 35,
        width: '32%',
        backgroundColor: '#e6ffff',
        height: '64%',
      },
      welcome: {
        fontSize: 35,
        textAlign: "justify",
        margin: 10,
        fontWeight: '600',
        textShadowOffset: {width: 50, height: 50},
        textShadowColor: 'black',
        letterSpacing: 25,
        textAlignVertical: 'bottom'
      },
      squareText: {
        textAlign: 'center',
        flex: 1,
        textAlignVertical: 'center',
        fontWeight: '500',
        color: 'black',
        fontSize: 16
      },
      bottomBar: {
        backgroundColor: 'tan'
      },
      bottomButton: {
        width: '33%',
        height: '100%',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      flexhalf: {
          flex: 0.5,
      },
      forms: {
        padding: 10,
      }
  });

export default styles;