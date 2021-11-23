import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';

import * as Speech from 'expo-speech';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
    newAnswer : '',
      myanswer: this.props.route.params.story.answer,
    };
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
  async loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFontsAsync();
    this.fetchUser();
  }
  async addAnswer() {
    if (this.state.newAnswer) {
      await firebase
        .database()
        .ref('/posts/')
        .child(this.props.route.params.demo)
        .child('answer')
        .set(this.state.newAnswer);
        Alert.alert("Your answer is submitted 😊");
    } else {
      Alert.alert(
        'Error',
        'Please type some answer !!!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
    this.setState({ myanswer: this.state.newAnswer });
  }

  render() {
   //console.log(this.props.route.params.demo.story_id);
    //let story = this.state.story_data;
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } else if (!this.state.fontsLoaded) {
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
                Question Corner{' '}
              </Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView
              style={
                this.state.light_theme
                  ? styles.storyCardLight
                  : styles.storyCard
              }>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.storyTitleTextLight
                        : styles.storyTitleText
                    }>
                    Subject : {this.props.route.params.story.title}{'\n'}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.storyAuthorTextLight
                        : styles.storyAuthorText
                    }>
                    Asked By : {this.props.route.params.story.author}{'\n'}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.descriptionTextLight
                        : styles.descriptionText
                    }>
                    Date : {this.props.route.params.story.created_on}{'\n'}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.storyTextLight
                        : styles.storyText
                    }>
                    Question : {this.props.route.params.story.description}{'\n'}
                  </Text>

                  <TextInput
                    style={[
                      this.state.light_theme
                        ? styles.inputFontLight
                        : styles.inputFont,
                      styles.inputFontExtra,
                      styles.inputTextBig,
                    ]}
                    onChangeText={(newans) => this.setState({ newAnswer : newans })}
                    placeholder={'Type your answer'}
                    multiline={true}
                    numberOfLines={4}
                    placeholderTextColor={
                      this.state.light_theme ? 'black' : 'white'
                    }
                  />
                  <Text>{'\n'}</Text>
                </View>
                
              </View>

              <Text
                  style={
                    this.state.light_theme
                      ? styles.storyTitleTextLight
                      : styles.storyTitleText
                  }>
                  {' '}
                  ANSWER : {this.state.myanswer}{'\n'}{'\n'}
                </Text>
              <View style={styles.submitButton}>
                <Button
                  onPress={() => this.addAnswer()}
                  title=" Submit Answer "
                  color="#841584"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424874',
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
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
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
  storyContainer: {
    flex: 1,
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: '#A6B1E1',
    borderRadius: RFValue(20),
    borderWidth: 2,
  },
  storyCardLight: {
    margin: RFValue(20),
    backgroundColor: '#FDD2BF',
    borderRadius: RFValue(20),
    borderWidth: 2,
  },
  image: {
    width: '100%',
    alignSelf: 'center',
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: 'contain',
  },
  dataContainer: {
    flexDirection: 'row',
    padding: RFValue(20),
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyTitleText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'white',
  },
  storyTitleTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'black',
  },
  storyAuthorText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: 'white',
  },
  storyAuthorTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: 'coral',
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTextContainer: {
    padding: RFValue(20),
  },

  storyText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'red',
  },
  storyTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'red',
  },
  moralText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  moralTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'green',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeTextLight: {
    //color: "black",
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: 'white',
    paddingTop: RFValue(10),
  },
  descriptionTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: 'black',
    paddingTop: RFValue(10),
  },
  likeButtonLiked: {
    flexDirection: 'row',
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeButtonDisliked: {
    flexDirection: 'row',
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eb3948',
    borderRadius: RFValue(30),
    borderWidth: 2,
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
});
