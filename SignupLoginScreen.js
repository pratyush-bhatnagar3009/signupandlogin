import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../Config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
      isModalVisible: false,
    };
  }

  userLogin = (emailId, password) => {
    // email - ag@gmail.com
    // password - 123456
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then((response) => {
        return alert('Successfully Logged In');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("Password Doesn't match \n Check it again");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then((response) => {
          db.collection('users').add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact,
            emailId: this.state.emailId,
          });
          return Alert.alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.mContainer}>
          <ScrollView style={{ width: '100%', flex: 1 }}>
            <KeyboardAvoidingView style={styles.kav}>
              <Text
                style={{
                  fontSize: 20,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  colour: 'red',
                }}>
                Registration
              </Text>

              <TextInput
                style={styles.formInput}
                placeholder={'First Name'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              />

              <TextInput
                style={styles.formInput}
                placeholder={'Last Name'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              />

              <TextInput
                style={styles.formInput}
                placeholder={'Contact no.'}
                keyboardType={'numeric'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
              />

              <TextInput
                style={styles.formInput}
                placeholder={'Address'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />

              <TextInput
                style={styles.formInput}
                placeholder={'Email ID'}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
              />

              <TextInput
                style={styles.formInput}
                placeholder={'Password'}
                secureTextEntry={true}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />

              <TextInput
                style={styles.formInput}
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text style={styles.buttonText}> Register </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}>
                <Text style={styles.buttonText}> Cancel </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        //<ImageBackground
          //source={require('../assets/pic1.webp')}
          style={{ width: 300, height: 400 }}>
          <Text style={styles.head}> Sign-up or Log-in </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Email"
            placeholderTextColor="Blue"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          />

          <TextInput
            style={styles.inputBox}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="Blue"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}>
            <Text> Log-in </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={()=>this.setState({isModalVisible: true})}>
             <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignItems:'Center', backgroundColor: 'yellow'}}>
          {this.showModal()}
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE230',
    alignItems: 'center',
  },
  head: {
    fontSize: 25,
    alignSelf: 'center',
  },
  inputBox: {
    marginTop: 20,
    marginleft: 50,
    borderColor: 'black',
    width: 250,
    height: 150,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignContent: 'center',
  },
  button: {
    width: 100,
    height: 50,
    margin: 10,
    backgroundColor: '#FB7030',
    border: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20
  },
  mContainer:{
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  formInput:{ 
    width:"100%",
    height:35, 
    alignSelf:'center', 
    borderColor:'#ffab91', 
    borderRadius:10, 
    borderWidth:1, 
    marginTop:20, 
   padding:10 
  },
  kav:{
    padding : 50
  }
});
