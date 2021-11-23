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
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
//import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from 'firebase';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
    };
  }

  async loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFontsAsync();
    this.fetchUser();
  }
  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };

  render() {
    let story = this.state.story_data;
    let demo = this.state.story_id;
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate('StoryScreen', {
              story: story,
              demo: demo,
            })
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }>
            <View style={styles.titleContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.storyTitleTextLight
                    : styles.storyTitleText
                }>
                {story.title}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.storyAuthorTextLight
                    : styles.storyAuthorText
                }>
                By {story.author}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.descriptionTextLight
                    : styles.descriptionText
                }>
                {story.description}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.descriptionTextLight
                    : styles.descriptionText
                }>
                Date : {story.created_on}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainerLight: {
    //flex: 1,
    backgroundColor: '#FDD2BF',
    margin: RFValue(13),
    borderRadius: RFValue(20),
    borderWidth: 2,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#A6B1E1',
    borderRadius: RFValue(20),
    borderWidth: 2,
  },
  storyImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  storyTitleTextLight: {
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: 'black',
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  storyAuthorTextLight: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'darkblue',
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
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeTextLight: {
    color: 'black',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#eb3948',
    borderWidth: 2,
    borderRadius: RFValue(30),
  },
});
