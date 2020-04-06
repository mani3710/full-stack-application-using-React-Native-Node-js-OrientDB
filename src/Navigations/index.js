import React,{Component} from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignUp from '../Screen/SignUp';
import SignIn from '../Screen/SignIn';
import Home from '../Screen/Home';
import Splash from '../Screen/Splash';
import VideoPlay from '../Screen/videoPlay';
import Play from '../Screen/Play';
import Search from '../Screen/Search';
import Other from '../Screen/Others';
import Profile from '../Screen/Others/Profile';
import Favorite from '../Screen/Others/Favorite';
import data from '../Components/GlobalComponents';
import {Icon} from 'react-native-elements';

const HomeStackNav=createStackNavigator({
    Home:{screen:Home,
        navigationOptions: {
            title: 'Home',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
    VideoPlay:{screen:VideoPlay,
        navigationOptions: {
            title: 'Details',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
    Play:{screen:Play,
        navigationOptions: {
            title: 'Video',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
});
const SearchStackNav=createStackNavigator({
    Search:{screen:Search,
        navigationOptions: {
            title: 'Search',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
    VideoPlay:{screen:VideoPlay,
        navigationOptions: {
            title: 'Details',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
    Play:{screen:Play,
        navigationOptions: {
            title: 'Video',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
});
const OthersStackNav=createStackNavigator({
    Other:{screen:Other,
        navigationOptions: {
            title: 'Others',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
    Profile:{screen:Profile,
        navigationOptions: {
            title: 'Profile',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
    Favorite:{screen:Favorite,
        navigationOptions: {
            title: 'Favorite',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
    VideoPlay:{screen:VideoPlay,
        navigationOptions: {
            title: 'Details',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
    Play:{screen:Play,
        navigationOptions: {
            title: 'Video',
            headerMode: 'screen',
            navigationOptions: {
                headerVisible: true,
            },
            headerStyle: {
                backgroundColor: data.themeColor,
              },
              headerTintColor: '#fff',
            
              }
    },
  
});
const BottomNav=createBottomTabNavigator({
    HomeStackNav:{screen:HomeStackNav,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" size={20} color={tintColor}></Icon>
            )
        }
    },
    SearchStackNav:{screen:SearchStackNav,
        navigationOptions: {
            tabBarLabel: "Search",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="search" size={20} color={tintColor}></Icon>
            )
        }
    },
    OthersStackNav:{screen:OthersStackNav,
        navigationOptions: {
            tabBarLabel: "Others",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="view-headline" size={20} color={tintColor}></Icon>
            )
        }
    }
},

{
    tabBarOptions: {
        activeTintColor: "#fff",
        inactiveTintColor: "grey",
        activeBackgroundColor:"black"
    }
}

);
const AuthStack=createStackNavigator({
    SignIn:{screen:SignIn},
    SignUp:{screen:SignUp}
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}

)
const AuthNav=createSwitchNavigator({
    Splash:{screen:Splash},
   AuthStack:{screen:AuthStack},
    BottomNav:{screen:BottomNav},
    


});

export default createAppContainer(AuthNav);

