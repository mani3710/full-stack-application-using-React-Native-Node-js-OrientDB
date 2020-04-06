import React, { Component } from 'react';
import { View, Text,ScrollView,Dimensions,FlatList,TouchableOpacity} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Spinner from 'react-native-loading-spinner-overlay';
import data from '../Components/GlobalComponents';
import API from '../Components/Api';
import {Card} from 'react-native-elements';
import WebView from 'react-native-webview';

export default class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: props.navigation.state.params.couserId,
            videoList:[],
            isSpinnerVisible:false,
            currentVideoId:"",
            currentVideoName:""
        }
        console.log("id",props.navigation.state.params.couserId);
           this.getVideoIds();
    }
    componentDidMount() {
        const { navigation } = this.props;
        
        this.focusListener = navigation.addListener('didFocus', () => {
          // The screen is focused
          // Call any action
          
          this.getVideoIds();
                        
        });
      }
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }
    getVideoIds(){
        this.setState({isSpinnerVisible:true});
        API.getVideos(this.state.courseId)
        .then(res=>res.json())
        .then((responseJson)=>{
             console.log("res",responseJson.videoId[0].title); 
            var arrRow=[];
            for(var i of responseJson.videoId){
                arrRow.push(i.rowNo);
            }
            var sortRowArray=arrRow.sort(function(a, b){return a-b});
            var sortArray=[];
            for(var j of sortRowArray){
                for(var k of responseJson.videoId ){
                    if(k.rowNo == j){
                        sortArray.push(k);
                        break;
                    }
                }
            }
            
            this.setState({
                isSpinnerVisible:false,
                videoList:sortArray,
                currentVideoId:sortArray[0].id,
                currentVideoName:sortArray[0].title
            });    

        }).catch((error)=>{
            console.log("Error",error)
        })
    }
    
    render() {
        return (
            <View style={{flex:1}} >
             <View style={{width:"100%",alignItems:"center",justifyContent:"center"}}>   
                <YoutubePlayer

                    height={360}
                    width={Dimensions.get('window').width }
                    videoId={this.state.currentVideoId}
                    play={true}
                    
                    onChangeState={event => console.log(event)}
                   
                    volume={100}
                    playbackRate={1}
                    playerParams={{
                        preventFullScreen: true,
                        cc_lang_pref: "us",
                        showClosedCaptions: false,

                    }}
                />
     
                </View>
                <View style={{marginTop:-120,marginLeft:15,width:"100%",marginRight:15}}>
    <Text style={{fontSize:18,fontWeight:"bold"}}>{this.state.currentVideoName}</Text>
                

                </View>
                <View style={{marginTop:10,marginLeft:15,width:"100%"}}>
    <Text style={{fontSize:15,color:"gray"}}>Video List :</Text>
                

                </View>
                
                <FlatList
                style={{flex:1,marginBottom:10}}
                scrollEnabled
                    data={this.state.videoList ? this.state.videoList:[]}
                  
                    
                    renderItem={({ item }) => {
                        return (  
                          <TouchableOpacity 
                          onPress={()=>{this.setState({currentVideoId:item.id,currentVideoName:item.title})}}
                          style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
                              <Card containerStyle={{elevation:2,width:"90%"}}>
                    <Text style={{fontSize:15}}>{item.title}</Text>
                              </Card>
                          </TouchableOpacity>
                            
                        ); 
                    }}
                />
                <Spinner
                    visible={this.state.isSpinnerVisible}
                    color={data.spinnerColor}
                    />
            </View>
        )
    }
}
