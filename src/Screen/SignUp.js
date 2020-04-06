import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView, ImageBackground, AsyncStorage } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import data from '../Components/GlobalComponents';
import TextInput from 'react-native-textinput-with-icons';

import Spinner from 'react-native-loading-spinner-overlay';

import API from '../Components/Api';
import randomID from '@thewizard0f0z/randomid-generator';
import { Dialog } from 'react-native-simple-dialogs';
import DialogBoxes from './DialogBoxes';







export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            re_password: "",
            phoneNo: "",
            email: "",
            isshowError: false,
            errorMsg: "",
            expo_token: "",
            isSpinnerVisible: false,
            isShowSuccessDialog:false
        }
        AsyncStorage.getItem("@Expo_token")
            .then((res) => { this.setState({ expo_token: res }) });
    }
    moveToHomeScreen(){
        this.setState({isShowSuccessDialog:false});
        this.props.navigation.navigate("BottomNav");
    }
    onSignUp() {

        var randomKey = randomID(10)


        var { name, password, re_password, phoneNo, email, expo_token } = this.state;
        this.setState({ isshowError: false, isSpinnerVisible: true });
        if ((name && password && re_password && phoneNo && email && expo_token) && (password == re_password)) {
            this.setState({ errorMsg: "" });
            API.signUpAPI(name, password, email, expo_token, phoneNo, randomKey)
                .then(res => res.json())
                .then((responseJson) => {

                    if (responseJson.error) {
                        this.setState({ isshowError: true, errorMsg: responseJson.error });
                    } else {
                        
                        console.log("respose in sign up", responseJson);
                        AsyncStorage.setItem("@userId", randomKey)
                            .then((val) => {
                                console.log("val dfasfa asdfasf", val)
                                this.setState({ isShowSuccessDialog: true });

                            });
                       
                    }
                    this.setState({ isSpinnerVisible: false })
                }).catch((error)=>{
                    console.log("error",error);
                    this.setState({isSpinnerVisible:false});
                })



        } else if (password != re_password) {
            this.setState({ errorMsg: "Password is not match ! ", isSpinnerVisible: false });
        }
        else {
            this.setState({ isshowError: true, errorMsg: "Empty field !", isSpinnerVisible: false })
        }
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                extraScrollHeight={300}
                enableOnAndroid={true}

            >
                <ImageBackground
                    source={data.wallpaper}
                    resizeMode={'stretch'}
                    // blurRadius={0.5}
                    style={{ justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: data.themeColor }}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>

                        <Image
                            source={data.icon}
                            style={{ width: 80, height: 80, marginTop: -20 }}
                        />
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: -20, fontStyle: "italic" }}>{data.appName}</Text>
                        <Text style={{ fontSize: 10 }}>( Learn and get new feature)</Text>
                    </View>
                    <Card
                        containerStyle={{ elevation: 1, width: "90%", }}

                    >
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Registration</Text>
                        </View>
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <TextInput
                                label="Name"
                                leftIcon="person"
                                leftIconType="oct"
                                rippleColor="blue"
                                value={this.state.name}
                                onChangeText={name => this.setState({ name: name })}
                            />
                        </View>
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <TextInput
                                label="Email"
                                leftIcon="mail"
                                leftIconType="oct"
                                rippleColor="blue"
                                value={this.state.email}
                                keyboardType="email-address"

                                onChangeText={name => this.setState({ email: name })}
                            />
                        </View>
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <TextInput
                                label="Phone Number"
                                leftIcon={"phone"}
                                leftIconType="material"
                                rippleColor="blue"
                                value={this.state.phoneNo}
                                keyboardType="number-pad"
                                onChangeText={name => this.setState({ phoneNo: name })}
                            />
                        </View>


                        <View style={{ width: "100%", marginTop: 10 }}>
                            <TextInput
                                label="Password"
                                secureTextEntry
                                leftIcon="lock"
                                leftIconType="oct"
                                rippleColor="blue"

                                value={this.state.password}
                                onPressRightIcon={() => { this.setState({ isScurityText: !this.state.isScurityText }) }}
                                onChangeText={password => this.setState({ password: password })}
                            />
                        </View>
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <TextInput
                                label="Re-password"
                                secureTextEntry
                                leftIcon="lock"
                                leftIconType="oct"
                                rippleColor="blue"


                                value={this.state.re_password}

                                onChangeText={password => this.setState({ re_password: password })}
                            />
                        </View>
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>{this.state.errorMsg}</Text>
                        </View>
                        <View style={{ width: "100%", marginTop: 15 }}>
                            <Button
                                onPress={() => { this.onSignUp() }}
                                title="Sign Up"
                            />
                        </View>
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                            <Text style={{ padding: 10 }}
                                onPress={() => { this.props.navigation.goBack() }}
                            >Already have account ? SignIn</Text>
                        </View>
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 12, }}>Version {data.version}</Text>
                        </View>

                    </Card>
                    <Spinner
                        visible={this.state.isSpinnerVisible}
                        color={data.spinnerColor}
                    />


                </ImageBackground>
               
               <DialogBoxes
               isShowSuccessDialog={this.state.isShowSuccessDialog}
               moveToHomeScreen={this.moveToHomeScreen.bind(this)}

               />

            </KeyboardAvoidingView>
        )
    }
}
