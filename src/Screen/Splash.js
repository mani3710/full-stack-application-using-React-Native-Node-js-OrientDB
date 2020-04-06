import React from 'react';
import {Text,View,AsyncStorage,Image,ActivityIndicator} from 'react-native';
import * as Permissions from 'expo-permissions';
import {  Notifications } from 'expo';
import data from '../Components/GlobalComponents';

async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS

    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // console.log("totan",token);
    if (token) {
        AsyncStorage.setItem('@Expo_token', token).then(() => { console.log("token suceessfully In"); }
        );
        // const scheme="";
        // AsyncStorage.setItem('@scheme', scheme).then(()=>
        //  {console.log("token suceessfully In");}
        // );
        AsyncStorage.getItem('@scheme').then((schemes) =>


            console.log("changed1", schemes)
        );
    }
  //  Notifications.addListener(this._handleNotification);
    // Notifications.addListener(this.props.navigation.navigate("Notification"));
}
export default class Splash extends React.Component{
    componentWillMount(){
        registerForPushNotificationsAsync();
        setTimeout(()=>{
            AsyncStorage.getItem("@userId")
        .then((val)=>{
            console.log("id",val);
            if(val){
          this.props.navigation.navigate("BottomNav");
            }else{
                this.props.navigation.navigate("AuthStack");
            }
        })
        },500)
        
    }
    render(){
        return(
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Image
                source={data.logo}
                />
               
                <ActivityIndicator
                color={data.spinnerColor}
                size={50}
                />

            </View>
        );
    }
}