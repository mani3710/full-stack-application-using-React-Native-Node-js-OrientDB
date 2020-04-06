import React, { Component } from 'react'
import { View, Text, AsyncStorage, ScrollView, TouchableOpacity, Image } from 'react-native'
import API from '../../Components/Api';
import { Divider, Icon } from 'react-native-elements';
import data from '../../Components/GlobalComponents';
import Dialog from './DialogBoxes';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentData: {},
            studentID: "",
            isShowOldPasswordDailog:false,
            isScurityTextCurrentPassword:true,
            currentPassword:"",
            errorIncorrectPassowordForcur:"",
            isSpinnerVisible:false,
            isShowNewPasswordDialog:false,
            newPassword:"",
            confirmNewPassword:"",
            missMatchError:"",
            isShowSuccessDialog:false

        }
        AsyncStorage.getItem("@userId")
            .then((val) => {
                this.setState({ studentID: val })
                this.getStudentMetaData(val);
            })


    }
    hindOldPasswordDailog(){
        this.setState({isShowOldPasswordDailog:false})
    }
    hindNewPasswordDialog(){
        this.setState({isShowNewPasswordDialog:false})
    }
    hindSuccessDialog(){
        this.setState({isShowSuccessDialog:false})
    }
    onclickOnCurrentPassowordDialog(){
        this.setState({isScurityTextCurrentPassword:!this.state.isScurityTextCurrentPassword})
    }
    onChangeConfirmNewPassword(text){
        this.setState({confirmNewPassword:text})
    }

    onchangeInCurrentPasswordDialog(text){
         this.setState({currentPassword:text})
    }
    onChangeNewPassword(text){
        this.setState({newPassword:text})
    }
    checkForCurrentPassword(){
        
        var {currentPassword,studentID}=this.state;
        if(currentPassword){
            this.setState({errorIncorrectPassowordForcur:"",isSpinnerVisible:true});
            API.checkForCurrentPassword(currentPassword,studentID)
            .then((res)=>res.json())
            .then((response)=>{
                console.log("respose",response);
                if(response.error){
               this.setState({errorIncorrectPassowordForcur:response.error})
                }else{
                    this.setState({isShowNewPasswordDialog:true,isShowOldPasswordDailog:false,newPassword:"",confirmNewPassword:""});
                }
                this.setState({isSpinnerVisible:false});
            })

        }else{
            this.setState({errorIncorrectPassowordForcur:"Empty filed !"})
        }
    }
    upDateNewPassword(){
        this.setState({missMatchError:""});
        var {newPassword,confirmNewPassword,studentID}=this.state;
        if(newPassword && confirmNewPassword){
           if(newPassword == confirmNewPassword){
            this.setState({isSpinnerVisible:true});
            API.updatePassword(newPassword,studentID)
            .then((res)=>res.json())
            .then((response)=>{
                console.log("resposes",response);
                if(response.error){
                    this.setState({missMatchError:"Unable to process!"})
                }else{
                    this.setState({
                        isShowNewPasswordDialog:false,
                        confirmNewPassword:"",
                        newPassword:"",
                        missMatchError:"",
                        isShowSuccessDialog:true
                    })
                }
                this.setState({isSpinnerVisible:false});
            })

           }else{
            this.setState({missMatchError:"Password Missmatch error"})
           }
        }else{
            this.setState({missMatchError:"Empty filed !"})
        }
    }
    getStudentMetaData(sid) {
        API.getStudentMeta(sid)
            .then((res) => res.json())
            .then((response) => {
                console.log("response", response);
                this.setState({ StudentData: response.Student })
            })
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image
                    source={data.circelLogo}
                    style={{ width: 80, height: 80, borderWidth: 1, borderColor: "#FF9800", borderRadius: 150 / 2, marginTop: 10 }}
                />
                <View style={{ width: "100%" }}>
                    <Text style={{ alignSelf: "center", fontSize: 20, color: "#d61818", fontWeight: 'bold', }}>{this.state.StudentData.name}</Text>
                </View>
                <ScrollView style={{ flex: 1, marginTop: 10, paddingRight: 15, paddingLeft: 15 }}>
                    <View style={{ width: "100%", flexDirection: "column", marginTop: 20, }}>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <Text style={{ width: "50%", fontSize: 15, color: "rgb(26, 172, 195)" }}>Email</Text>
                            <Text style={{ width: "50%", fontSize: 18, fontWeight: "bold", color: "#d61818" }}>: {this.state.StudentData.email}</Text>
                        </View>
                        <Divider style={{ backgroundColor: "#D6D4D4", height: 1, marginTop: 10 }}></Divider>
                    </View>
                    <View style={{ width: "100%", flexDirection: "column", marginTop: 20, }}>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <Text style={{ width: "50%", fontSize: 15, color: "rgb(26, 172, 195)" }}>Phone Number</Text>
                            <Text style={{ width: "50%", fontSize: 18, fontWeight: "bold", color: "#d61818" }}>: {this.state.StudentData.phoneNumber}</Text>
                        </View>
                        <Divider style={{ backgroundColor: "#D6D4D4", height: 1, marginTop: 10 }}></Divider>
                    </View>
                    <View style={{ width: "100%", flexDirection: "column", marginTop: 20, marginBottom: 20, }}>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <Text style={{ width: "50%", fontSize: 15, color: "rgb(26, 172, 195)" }}>Password</Text>
                            <View style={{ width: "50%", flexDirection: "row" }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#d61818" }}>: ******</Text>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ isShowOldPasswordDailog: true,isScurityTextCurrentPassword:true,currentPassword:"" }) }}
                                    style={{ flexDirection: "row", marginLeft: 10, flex: 1, justifyContent: "flex-end" }}>
                                    <Icon name="create" color="blue" size={18}></Icon>
                                    <Text style={{ color: "blue", fontSize: 15 }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Divider style={{ backgroundColor: "#D6D4D4", height: 1, marginTop: 10 }}></Divider>
                    </View>


                </ScrollView>
                <Spinner
                    visible={this.state.isSpinnerVisible}
                    color={data.spinnerColor}
                    />
                <Dialog
                isShowOldPasswordDailog={this.state.isShowOldPasswordDailog}
                hindOldPasswordDailog={this.hindOldPasswordDailog.bind(this)}
                isScurityTextCurrentPassword={this.state.isScurityTextCurrentPassword}
                currentPassword={this.state.currentPassword}
                onclickOnCurrentPassowordDialog={this.onclickOnCurrentPassowordDialog.bind(this)}
                onchangeInCurrentPasswordDialog={this.onchangeInCurrentPasswordDialog.bind(this)}
                errorIncorrectPassowordForcur={this.state.errorIncorrectPassowordForcur}
                checkForCurrentPassword={this.checkForCurrentPassword.bind(this)}
                isShowNewPasswordDialog={this.state.isShowNewPasswordDialog}
                hindNewPasswordDialog={this.hindNewPasswordDialog.bind(this)}
                newPassword={this.state.newPassword}
                confirmNewPassword={this.state.confirmNewPassword}
                onChangeConfirmNewPassword={this.onChangeConfirmNewPassword.bind(this)}
                onChangeNewPassword={this.onChangeNewPassword.bind(this)}
                missMatchError={this.state.missMatchError}
                upDateNewPassword={this.upDateNewPassword.bind(this)}
                isShowSuccessDialog={this.state.isShowSuccessDialog}
                hindSuccessDialog={this.hindSuccessDialog.bind(this)}
                />
            </View>
        )
    }
}
