import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView, ImageBackground,AsyncStorage } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import data from '../Components/GlobalComponents';
import TextInput from 'react-native-textinput-with-icons';
import Api from '../Components/Api';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            isScurityText: true,
            isshowError: false,
            errorMsg: "",
            isSpinnerVisible:false
        }
    }
    onSignIn() {
        var { user, password } = this.state;
        this.setState({ isshowError: false,isSpinnerVisible:true });
        if (user && password) {
            this.setState({ errorMsg: "" });
            Api.logInAPI(user, password)
                .then(res => res.json())
                .then((responsejson) => {
                    console.log("response", responsejson);
                    this.setState({isSpinnerVisible:false})
                    if (responsejson.error) {
                        this.setState({ isshowError: true, errorMsg: responsejson.error })
                    }else{
                        AsyncStorage.setItem("@userId",responsejson.id)
                        .then(res=>{
                            this.props.navigation.navigate("BottomNav");
                        })
                    }
                }).catch(Error => {
                    this.setState({isSpinnerVisible:false})
                    console.log("error in login", Error);
                })
        } else {
            this.setState({ isshowError: true, errorMsg: "Empty field !",isSpinnerVisible:false });
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
                    <Card
                        containerStyle={{ elevation: 1, width: "90%", }}

                    >
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>LOG IN</Text>
                            <Image
                                source={data.icon}
                                style={{ width: 80, height: 80, marginTop: -20 }}
                            />
                            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: -20, fontStyle: "italic" }}>{data.appName}</Text>
                            <Text style={{ fontSize: 10 }}>( Learn and get new feature)</Text>
                        </View>
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <TextInput
                                label="Email or Phone"

                                leftIcon="person"
                                leftIconType="oct"
                                value={this.state.user}
                                onChangeText={name => this.setState({ user: name })}
                            />
                        </View>
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <TextInput
                                label="Password"
                                secureTextEntry={this.state.isScurityText}
                                leftIcon="lock"
                                leftIconType="oct"
                                rippleColor="blue"
                                rightIcon="eye"
                                rightIconType="material"
                                rightIconColor={this.state.isScurityText ? "gray" : "red"}
                                value={this.state.password}
                                onPressRightIcon={() => { this.setState({ isScurityText: !this.state.isScurityText }) }}
                                onChangeText={password => this.setState({ password: password })}
                            />
                        </View>
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>{this.state.errorMsg}</Text>
                        </View>
                        <View style={{ width: "100%", marginTop: 15 }}>
                            <Button
                                onPress={() => { this.onSignIn() }}
                                title="Sign In"
                            />
                        </View>
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                            <Text style={{ padding: 10 }}
                                onPress={() => { this.props.navigation.navigate("SignUp") }}
                            >New user ? Please register !</Text>
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


            </KeyboardAvoidingView>
        )
    }
}
