import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
//import { ScrollView } from 'react-native-gesture-handler'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: 'image_1',
      dropdownHeight: 40,
      light_theme: true,
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  }
  componentDidMount() {
    this.loadFontAsync();
    this.fetchUser();
  }
  async addStory() {
    if (this.state.title && this.state.description) {
      var today = new Date();
      var dd = String(today.getDate());
      var mm = String(today.getMonth() + 1); //January is 0!
      var yyyy = today.getFullYear();

      today = dd + '/' + mm + '/' + yyyy;
      var nemo = 'NoAnswer';
      let storyData = {
        title: this.state.title,
        description: this.state.description,
        author: firebase.auth().currentUser.displayName,
        created_on: today,
        author_uid: firebase.auth().currentUser.uid,
        answer: nemo,
      };
      await firebase
        .database()
        .ref('/posts/' + Math.random().toString(36).slice(2))
        .set(storyData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate('Feed');
    } else {
      Alert.alert(
        'Error',
        'All fields are required !!!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }>
                {' '}
                Ask a Query{' '}
              </Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ScrollView>
              <Image
                source={require('../askQuestion.jpg')}
                style={styles.previewImage}
              />
              <Text
                style={
                  this.state.light_theme ? styles.queryLight : styles.query
                }>
                {' '}
                Have a doubt? Go ahead and and ask it.
              </Text>
              <TextInput
                style={
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont
                }
                onChangeText={(title) => this.setState({ title })}
                placeholder={'Subject'}
                placeholderTextColor={
                  this.state.light_theme ? 'black' : 'white'
                }
              />
              <TextInput
                style={[
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(description) => this.setState({ description })}
                placeholder={'Type your question'}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={
                  this.state.light_theme ? 'black' : 'white'
                }
              />
            </ScrollView>
            <View style={styles.submitButton}>
              <TouchableOpacity
                onPress={() => this.addStory()}
                style={styles.newsubmitButton}>
                <Text> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    // alignItems: "center"
  },
  iconImage: {
    width: '100%',
    height: '100%',
    marginLeft: 10,
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  fieldContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: 'black',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'black',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: 'top',
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsubmitButton: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 50,
    marginBottom: RFValue(60),
    
  },
  query: {
    color: 'white',
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
  },
  queryLight: {
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
  },
});
