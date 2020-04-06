import React, { Component } from 'react'
import { View, Text, TouchableOpacity ,AsyncStorage} from 'react-native'
import { Divider } from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';
import data from '../../Components/GlobalComponents';


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowLogOutDialog: false
        }
    }
    logOutFunc(){
        AsyncStorage.removeItem("@userId")
        .then(()=>{
            this.setState({isShowLogOutDialog:false})
            this.props.navigation.navigate("Splash");
            
        })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity style={{ marginTop: 10, width: "95%" }}
                    onPress={() => { this.props.navigation.navigate("Profile") }}
                >
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>Profile</Text>
                    <Divider style={{ backgroundColor: "gray", height: 1, marginTop: 10, marginBottom: 10, paddingLeft: 10, paddingRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{this.props.navigation.navigate("Favorite")}}
                style={{ marginTop: 10, width: "95%" }} >
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>Favorite</Text>
                    <Divider style={{ backgroundColor: "gray", height: 1, marginTop: 10, marginBottom: 10, paddingLeft: 10, paddingRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{this.setState({isShowLogOutDialog:true})}}
                style={{ marginTop: 10, width: "95%" }} >
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>Log Out</Text>
                    <Divider style={{ backgroundColor: "gray", height: 1, marginTop: 10, marginBottom: 10, paddingLeft: 10, paddingRight: 10 }} />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <Text style={{ color: "gray", marginBottom: 10 }}>Version {data.version}</Text>
                </View>
                <Dialog

                    visible={this.state.isShowLogOutDialog}
                    title="Do you want Log out?"
                >
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "flex-end", marginLeft: "70%" }}>

                            <Text
                                onPress={() => { this.setState({isShowLogOutDialog:false}) }}
                                style={{ marginRight: 10, marginLeft: 10, color: "red", padding: 5 }}>cancel</Text>
                            <Text
                                onPress={() => { this.logOutFunc() }}
                                style={{ marginRight: 10, marginLeft: 10, color: "green", padding: 5 }}>ok </Text>
                        </View>
                    </View>
                </Dialog>    
            </View>
        )
    }   
}
