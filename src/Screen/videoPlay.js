import React, { Component } from 'react';
import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import data from '../Components/GlobalComponents';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../Components/Api';
import { Dialog } from 'react-native-simple-dialogs';

export default class videoPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseDetails: props.navigation.state.params.courseDetails,
            sid: "",
            isSpinnerVisible: false,
            addFacResponse: "",
            isShowResponseDialog: false
        }
        AsyncStorage.getItem("@userId").then((val) => {
            this.setState({ sid: val })

        })

    }
    addTheCourseIntoFav() {
        var { courseDetails, sid } = this.state;
        this.setState({ isSpinnerVisible: true });
        API.addFav(sid, courseDetails.id)
            .then(res => res.json())
            .then(response => {
                console.log("response", response);
                this.setState({ isSpinnerVisible: false,isShowResponseDialog:true,addFacResponse:response.res});

            })
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                <TouchableOpacity style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => { this.props.navigation.navigate("Play", { "couserId": this.state.courseDetails.id }) }}
                >
                    <Image
                        source={{ uri: this.state.courseDetails.thumbnail }}
                        style={{ width: Dimensions.get('window').width - 80, height: 200, borderRadius: 10, shadowRadius: 2, marginTop: 20, }}
                    />
                    <Button
                        buttonStyle={{ width: 50, height: 50, borderRadius: 150 / 2, backgroundColor: "#8E24AA", marginRight: 35 }}
                        containerStyle={{ marginTop: -130, marginLeft: 20 }}
                        onPress={() => { this.props.navigation.navigate("Play", { "couserId": this.state.courseDetails.id }) }}

                        icon={<Icon name="play-arrow" size={30} color="white" />}
                    />
                </TouchableOpacity>
                <Button
                    buttonStyle={{ width: 140, height: 50, borderRadius: 150 / 2, backgroundColor: "red", marginRight: 35 }}
                    containerStyle={{ marginTop: 90, marginLeft: "60%" }}
                    onPress={() => { this.addTheCourseIntoFav() }}
                    title={"Add favorite"}
                    titleStyle={{ marginLeft: 10 }}

                    icon={<Icon name="playlist-add" size={30} color="white" />}
                />
                <View style={{ width: "100%", alignItems: "flex-end", marginTop: 10 }}>


                </View>
                <View style={{ marginLeft: 18, marginTop: 10 }}>

                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{this.state.courseDetails.name}</Text>
                </View>
                <View style={{ marginLeft: 18, marginTop: 10 }}>
                    <Text style={{ color: "gray", fontSize: 12 }}>Publisher :</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 15 }}>{this.state.courseDetails.publisherName}</Text>
                </View>
                <View style={{ marginLeft: 18, marginTop: 10 }}>
                    <Text style={{ color: "gray", fontSize: 12 }}>Published date :</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 15 }}>{this.state.courseDetails.publishAt}</Text>
                </View>
                <View style={{ marginLeft: 18, marginTop: 10 }}>
                    <Text style={{ color: "gray", fontSize: 12 }}>Description :</Text>
                    <Text style={{ fontSize: 15, color: "gray", marginLeft: 10, lineHeight: 30 }}>           {this.state.courseDetails.description}</Text>
                </View>
                <Spinner
                    visible={this.state.isSpinnerVisible}
                    color={data.spinnerColor}
                />
                <Dialog

                    visible={this.state.isShowResponseDialog}
                    title={this.state.addFacResponse}
                >
                    <View>
                        <View style={{ width: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Text style={{ padding: 10,fontSize:18,fontWeight:"bold" }} onPress={() => { this.setState({isShowResponseDialog:false}) }}>ok</Text>
                        </View>
                    </View>
                </Dialog>
            </ScrollView>
        )
    }
}
