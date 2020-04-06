import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Card, SearchBar } from "react-native-elements";
import API from '../Components/Api';
import Spinner from 'react-native-loading-spinner-overlay';
import data from '../Components/GlobalComponents';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            resultDataList: [],
            isSpinnerVisible: false,
            searchText: ""
        }
        this.getData()
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
        API.getCourseForSearch()
            .then((res) => res.json())
            .then((response) => {
                console.log("response", response.courses);
                this.setState({ isSpinnerVisible: false, resultDataList: response.courses, dataList: response.courses });
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
                                </Card>


                            </TouchableOpacity>
                        );
                    }}
                />
            );
        } else {
            return (
                <View style={{  alignItems: "center", marginTop: 10,flex: 1}}>
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
            </View>
        )
    }
}
