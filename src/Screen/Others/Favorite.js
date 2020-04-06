import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, AsyncStorage } from 'react-native';
import { Card, SearchBar, Button } from "react-native-elements";
import API from '../../Components/Api';
import Spinner from 'react-native-loading-spinner-overlay';
import data from '../../Components/GlobalComponents';
import { Dialog } from 'react-native-simple-dialogs';

export default class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            resultDataList: [],
            isSpinnerVisible: false,
            searchText: "",
            sid: "",
            isShowRemoveWarningDialog: false,
            removeCourseId: ""
        }
        AsyncStorage.getItem("@userId").then((val) => {
            this.setState({ sid: val })
            this.getData()

        })
    }
    componentDidMount() {
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            // The screen is focused
            // Call any action

            this.getData();

        });
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }


    getData() {
        this.setState({ isSpinnerVisible: true });
        var { sid } = this.state;
        API.getFavcourse(sid)
            .then((res) => res.json())
            .then((response) => {
                console.log("response", response);
                //this.setState({ isSpinnerVisible: false });

                this.setState({ 
                    isSpinnerVisible: false,
                     resultDataList: response.courses ? response.courses:[], 
                     dataList: response.courses?response.courses:[] });    
            })
    }
    searchForTheText(text) {
        var textLow = text.toLowerCase();
        console.log("search  ", textLow);
        this.setState({ resultDataList: [] });
        var result = [];
        for (var data of this.state.dataList) {
            var name = data.name.toLowerCase();
            var n = name.search(textLow);
            if (n >= 0) {
                result.push(data);
            }
        }
        this.setState({ resultDataList: result });

    }
    removeFunc() {
        var { removeCourseId, sid } = this.state;
        this.setState({isSpinnerVisible:true,isShowRemoveWarningDialog:false});
        API.removeFavcourse(sid,removeCourseId)
        .then((res)=>res.json())
        .then((response)=>{
            console.log("respose",response);
            this.getData();
        })

    }
    renderData() {
        if (this.state.resultDataList.length) {
            return (
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.resultDataList}
                    renderItem={({ item }) => {
                        return (

                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate("VideoPlay", { courseDetails: item }) }}
                                style={{ width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10 }}
                            >
                                <Card containerStyle={{ elevation: 2, width: "90%", justifyContent: "center", alignItems: "stretch" }}>
                                    <Image

                                        source={{ uri: item.thumbnail }}

                                        style={{ width: Dimensions.get('window').width - 80, height: 200, flexWrap: "wrap", flexDirection: "row", alignItems: "stretch" }}
                                    />
                                    <Text style={{ marginTop: 10, fontWeight: "bold" }}>{item.name}</Text>
                                    <View style={{ width: "100%", alignItems: "center" }}>

                                        <Button
                                            containerStyle={{ width: 90 }}
                                            titleStyle={{ color: "red", fontWeight: "bold" }}
                                            buttonStyle={{ backgroundColor: "transparent" }}
                                            title={"remove"}
                                            onPress={() => { this.setState({ removeCourseId: item.id, isShowRemoveWarningDialog: true }) }}
                                        />
                                    </View>

                                </Card>



                            </TouchableOpacity>

                        );
                    }}
                />
            );
        } else {
            return (
                <View style={{ alignItems: "center", marginTop: 10, flex: 1 }}>
                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}>Not found !</Text>
                </View>
            );

        }
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <SearchBar
                    value={this.state.searchText}
                    onChangeText={(text) => {
                        this.setState({ searchText: text });
                        this.searchForTheText(text);
                    }}
                    style={{ width: "95%" }}
                    containerStyle={{ width: "95%", borderRadius: 10, marginTop: 10 }}
                    placeholder={"Enter the course name"}
                />



                {this.renderData()}

                <Spinner
                    visible={this.state.isSpinnerVisible}
                    color={data.spinnerColor}
                />
                <Dialog

                    visible={this.state.isShowRemoveWarningDialog}
                    title="Do you want remove?"
                >
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "flex-end", marginLeft: "70%" }}>

                            <Text
                                onPress={() => { this.setState({ isShowRemoveWarningDialog: false }) }}
                                style={{ marginRight: 10, marginLeft: 10, color: "red", padding: 5 }}>cancel</Text>
                            <Text
                                onPress={() => { this.removeFunc() }}
                                style={{ marginRight: 10, marginLeft: 10, color: "green", padding: 5 }}>ok </Text>
                        </View>
                    </View>
                </Dialog>
            </View>
        )
    }
}
