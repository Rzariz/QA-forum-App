import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Profile from '../screens/Profile';
import StackNavigator from './StackNavigator';
import Logout from '../screens/Logout';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomSidebarMenu from '../screens/CustomSidebarMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === 'light' ? true : false });
  };

  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          inactiveTintColor: this.state.light_theme ? 'black' : 'white',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="home"
                size={size}
                color={focused ? 'red' : 'blue'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={focused ? 'red' : 'blue'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
         options={{
            unmountOnBlur: true,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="log-out-outline"
                size={size}
                color={focused ? 'red' : 'blue'}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
}

//export default DrawerNavigator;
