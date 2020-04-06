import React from 'react';
import { Text, View, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import TextInput from 'react-native-textinput-with-icons';
export default class DialogBoxes extends React.Component {
    render() {
        return (
            <View>
                <Dialog

                    visible={this.props.isShowOldPasswordDailog}
                    title="Change password !"
                    onTouchOutside={() => { this.props.hindOldPasswordDailog() }} >
                    <View>
                        <TextInput
                            label="Enter current Password"
                            secureTextEntry={this.props.isScurityTextCurrentPassword}
                            leftIcon="lock"
                            leftIconType="oct"
                            rippleColor="blue"
                            rightIcon="eye"
                            rightIconType="material"
                            rightIconColor={this.props.isScurityTextCurrentPassword ? "gray" : "red"}
                            value={this.props.currentPassword}

                            onPressRightIcon={() => { this.props.onclickOnCurrentPassowordDialog() }}
                            onChangeText={password => this.props.onchangeInCurrentPasswordDialog(password)}
                        />

                        <Text style={{ marginTop: 10, marginBottom: 5, color: "red", fontWeight: "bold", alignSelf: "center" }}>{this.props.errorIncorrectPassowordForcur}</Text>

                        <View style={{ flexDirection: "row", alignItems: "flex-end", marginLeft: "70%" }}>

                            <Text
                                onPress={() => { this.props.hindOldPasswordDailog() }}
                                style={{ marginRight: 10, marginLeft: 10, color: "red", padding: 5 }}>cancel</Text>
                            <Text
                                onPress={() => { this.props.checkForCurrentPassword() }}
                                style={{ marginRight: 10, marginLeft: 10, color: "green", padding: 5 }}>ok </Text>
                        </View>

                    </View>
                </Dialog>

                <Dialog

                    visible={this.props.isShowNewPasswordDialog}
                    title="New Password !"
                    onTouchOutside={() => { this.props.hindNewPasswordDialog() }} >
                    <View>
                        <TextInput
                            label="Enter New Password"
                            secureTextEntry
                            leftIcon="lock"
                            leftIconType="oct"
                            rippleColor="blue"
                            
                            value={this.props.newPassword}

                          
                            onChangeText={password => this.props.onChangeNewPassword(password)}
                        />
                         <TextInput
                            label="Re-type New Password"
                            secureTextEntry
                            leftIcon="lock"
                            leftIconType="oct"
                            rippleColor="blue"
                           
                            value={this.props.confirmNewPassword}

                           
                            onChangeText={password => this.props.onChangeConfirmNewPassword(password)}
                        />

                        <Text style={{ marginTop: 10, marginBottom: 5, color: "red", fontWeight: "bold", alignSelf: "center" }}>{this.props.missMatchError}</Text>

                        <View style={{ flexDirection: "row", alignItems: "flex-end", marginLeft: "70%" }}>

                            <Text
                                onPress={() => { this.props.hindNewPasswordDialog() }}
                                style={{ marginRight: 10, marginLeft: 10, color: "red", padding: 5 }}>cancel</Text>
                            <Text
                                onPress={() => { this.props.upDateNewPassword() }}
                                style={{ marginRight: 10, marginLeft: 10, color: "green", padding: 5 }}>ok </Text>
                        </View>

                    </View>
                </Dialog>
                <Dialog

                    visible={this.props.isShowSuccessDialog}
                    title="Password updated"
                >
                    <View>
                        <View style={{ width: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Text style={{ padding: 10 }} onPress={() => { this.props.hindSuccessDialog() }}>Done</Text>
                        </View>
                    </View>
                </Dialog>
            </View>
        );
    }
}