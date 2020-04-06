import React from 'react';
import { Text, View, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import TextInput from 'react-native-textinput-with-icons';
export default class DialogBoxes extends React.Component {
    render() {
        return (
            <View>
                <Dialog

                    visible={this.props.isShowSuccessDialog}
                    title="Thank you for registeration"
                >
                    <View>
                        <View style={{ width: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Text style={{ padding: 20 }} onPress={() => { this.props.moveToHomeScreen() }}>Go Home</Text>
                        </View>
                    </View>
                </Dialog>
            </View>
        );
    }
}