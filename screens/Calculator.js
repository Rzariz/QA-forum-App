import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      calculationText: '',
    };
    this.operations = ['DEL', '+', '-', '*', '/'];
  }

  calculationResult() {
    const text = this.state.resultText;
    this.setState({
      calculationText: eval(text),
    });
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':

      case '-':

      case '*':

      case '/':
        return false;
    }
    return true;
  }

  _onPressButton(text) {
    console.log(text);

    if (text == '=') {
      return this.validate() && this.calculationResult(this.state.resultText);
    }

    this.setState({
      resultText: this.state.resultText + text,
    });
  }

  operate(operation) {
    switch (operation) {
      case 'DEL':
        console.log(this.state.resultText);
        let text = this.state.resultText.split('');
        text.pop();
        this.setState({
          resultText: text.join(''),
        });
        break;
      case '+':

      case '-':

      case '*':

      case '/':
        const lastChar = this.state.resultText.split('').pop();

        if (this.operations.indexOf(lastChar) > 0) return;

        if (this.state.text == '') return;
        this.setState({
          resultText: this.state.resultText + operation,
        });
    }
  }

  render() {
    let rows = [];
    let nums = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['.', 0, '='],
    ];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            style={styles.btn}
            onPress={() => this._onPressButton(nums[i][j])}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }

    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          key={this.operations[i]}
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}>
          <Text style={[styles.btnText, styles.white]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
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
               Calculator
              </Text>
            </View>
          </View>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}{' '}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.6,
    flexDirection: 'row',
     backgroundColor: '#8EF6E4',

  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    // alignItems: "center"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'red',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    marginLeft: 10,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  resultText: {
    fontSize: 20,
    paddingRight: 10,
    color: 'black',
  },
  btnText: {
    fontSize: 40,
    color: 'white',
  },
  white: {
    color: 'white',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  devider: {
    borderRightColor: 'yellow',
    borderBottomColor: 'yellow',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculation: {
    flex: 1,
    backgroundColor: '#8EF6E4',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculationText: {
    fontSize: 50,
    paddingRight: 10,
    color: 'black',
  },
  buttons: {
    flex: 3,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    padding: 1,
    backgroundColor: '#62D2A2',
    borderWidth: 3,
    borderRadius: 20,
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#1FAB89',
    borderWidth: 3,
    borderRadius: 20,
  },
});
