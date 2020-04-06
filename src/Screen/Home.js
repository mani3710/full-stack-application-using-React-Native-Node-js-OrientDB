import React, { Component } from 'react';
import { Text, View, AsyncStorage, ScrollView, Image, FlatList,Dimensions,TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import Spinner from 'react-native-loading-spinner-overlay';
import data from '../Components/GlobalComponents';

import styled from "styled-components/native";
import API from '../Components/Api';


export default class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            errors: [],
            data: [],
            isShowSpinner: true,
            id: "",
            homePageData: {}
        }
        this.props = props;
        this._carousel = {};
        AsyncStorage.getItem("@userId").then((val) => {
            this.setState({ id: val })
            this.getHomePageDataFunc();
        })






    }
logOutFunc(){
    AsyncStorage.removeItem("@userId").then(()=>{
      this.props.navigation.navigate("Splash");
    })
}




    componentDidMount() {
        this._carousel.snapToItem(2);
    }
    getHomePageDataFunc() {
        API.getHomePageData(this.state.id)
            .then(res => res.json())
            .then((resposeJson) => {
                this.setState({ homePageData: resposeJson });
            })
    }


    handleSnapToItem(index) {
        console.log("snapped to ", index)
    }  
    showBtns(item) {
        if (item.isAvailable) {
            return (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Button title="Buy" buttonStyle={{ backgroundColor: "green", borderColor: "green", width: "90%" }}>Buy</Button>
                    <Button title="Add cart" buttonStyle={{ backgroundColor: "orange", borderColor: "orange", width: "80%" }}>Buy</Button>
                </View>
            );
        } else {
            return (
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "gray" }}>
                    <Text style={{ color: "white", padding: 10 }}>Not available</Text>
                </View>
            );
        }
    }
    _renderItem = ({ item, index }) => {

        return (
            <ThumbnailBackgroundView >
                <CurrentVideoTO
          onPress={()=>{this.props.navigation.navigate("VideoPlay",{courseDetails:item})}}
                >
                    <CurrentVideoImage source={{ uri: item.thumbnail }} />
                </CurrentVideoTO>
                {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
                <VideoTitleText style={{ color: "black", fontWeight: "bold" }}>{item.name}</VideoTitleText>
                {/* <View style={{marginTop:30,marginLeft:-20}}>
                    <View style={{ flexDirection: "row", color: "gray" }}>
                        <Text style={{fontSize:12}}>Auther :</Text>
                        <Text style={{fontSize:12}}>{item.publisherName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", color: "gray" }}>
                        
                        <Text style={{fontSize:12}}>{item.publishAt}</Text>
                    </View>

                </View> */}

            </ThumbnailBackgroundView>
        );
    }
   

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>

                <CarouselBackgroundView>
                    <Carousel
                    
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.homePageData.carosel ? this.state.homePageData.carosel : []}
                        renderItem={this._renderItem.bind(this)}
                        onSnapToItem={this.handleSnapToItem.bind(this)}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={280}
                        layout={'default'}
                        firstItem={0}   
                        containerCustomStyle={{width:150}}
                    />
                </CarouselBackgroundView>
                

                <View style={{width:"100%",marginTop:-80}}>
                    <Text style={{fontSize:18,fontWeight:"bold",marginLeft:15,marginBottom:-25}}>Web development</Text>
                <FlatList
                    data={this.state.homePageData.html ? this.state.homePageData.html:[]}
                  showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity 
                            onPress={()=>{this.props.navigation.navigate("VideoPlay",{courseDetails:item})}}
                            style={{padding:10,justifyContent:"center",alignItems:"center"}}>
                                <CurrentVideoTO
                                
    
                                >
                                    <FlatViewVideoImage source={{ uri: item.thumbnail }} />
                                </CurrentVideoTO>
                        <Text style={{marginTop:30,padding:5,width:150,fontSize:12}}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                </View>
                <View style={{width:"100%",marginTop:10}}>
                    <Text style={{fontSize:18,fontWeight:"bold",marginLeft:15,marginBottom:-25}}>React native</Text>
                <FlatList
                    data={this.state.homePageData.ReactNative ? this.state.homePageData.ReactNative:[]}
                  showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity 
                            onPress={()=>{this.props.navigation.navigate("VideoPlay",{courseDetails:item})}}
                            style={{padding:10,justifyContent:"center",alignItems:"center"}}>
                                <CurrentVideoTO 
                                onPress={()=>{this.props.navigation.navigate("VideoPlay",{courseDetails:item})}}

                                >
                                    <FlatViewVideoImage source={{ uri: item.thumbnail }} />
                                </CurrentVideoTO>
                        <Text style={{marginTop:30,padding:5,width:150,fontSize:12}}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                </View>
                <View style={{width:"100%",marginTop:10}}>
                    <Text style={{fontSize:18,fontWeight:"bold",marginLeft:15,marginBottom:-25}}>React js</Text>
                <FlatList
                    data={this.state.homePageData.Reactjs ? this.state.homePageData.Reactjs:[]}
                  showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item }) => {  
                        return (
                            <TouchableOpacity 
                            onPress={()=>{this.props.navigation.navigate("VideoPlay",{courseDetails:item})}}
                            style={{padding:10,justifyContent:"center",alignItems:"center"}}>
                                <CurrentVideoTO 
                                onPress={()=>{this.props.navigation.navigate("VideoPlay",{courseDetails:item})}}

                                >
                                    <FlatViewVideoImage source={{ uri: item.thumbnail }} />
                                </CurrentVideoTO>
                        <Text style={{marginTop:30,padding:5,width:150,fontSize:12}}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                </View>
                <View style={{width:"100%",marginTop:10}}>
                    <Text style={{fontSize:18,fontWeight:"bold",marginLeft:15,marginBottom:-25}}>Node js</Text>
                <FlatList
                    data={this.state.homePageData.Nodejs ? this.state.homePageData.Nodejs:[]}
                  showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item }) => {
                        return (  
                            <TouchableOpacity
                            onPress={()=>{this.props.navigation.navigate("VideoPlay",{courseDetails:item})}}
                            style={{padding:10,justifyContent:"center",alignItems:"center"}}>  
                                <CurrentVideoTO 
                                onPress={()=>{this.props.navigation.navigate("VideoPlay",{courseDetails:item})}}

                                >
                                    <FlatViewVideoImage source={{ uri: item.thumbnail }} />
                                </CurrentVideoTO>
                        <Text style={{marginTop:30,padding:5,width:150,fontSize:12}}>{item.name}</Text>
                            </TouchableOpacity>
                        ); 
                    }}
                />
                </View>
                <Spinner
                    visible={this.state.isSpinnerVisible}
                    color={data.spinnerColor}
                />

            </ScrollView>
        )
    }
}
const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`
const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 10;
`;
const FlatViewVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 150;
  height: 80;
  border-radius: 10;
  resizeMode="contain";
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256; 
 
  
`;

const CurrentVideoTO = styled.TouchableOpacity`
`
const CarouselBackgroundView = styled.View`
  background-color: white;
  height: 300px;
  width: 100%; 
`
