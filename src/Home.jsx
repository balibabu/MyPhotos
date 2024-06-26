import React, { useContext } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Login from './components/Authentication/Login'
import FolderSelector from './components/Photos/FolderSelector'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { MenuProvider } from 'react-native-popup-menu'
import PopUpMenu from './components/Utility/PopUpMenu'
import FirstScreen from './components/Photos/FirstScreen'
import VariableContext, { VariableProvider } from './components/context/VariableContext'
import FullScreenImgViewer from './components/ZoomFeature/FullScreenImgViewer'
import RenderSyncingImgs from './components/Photos/SyncingImages/RenderSyncingImgs';
import Testing from './R&D/Testing';
import Verticaldots from './images/Verticaldots';

const Stack = createStackNavigator();
export default function Home() {
    return (
        <VariableProvider>
            <MenuProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={navStyle} initialRouteName='Home'>
                        <Stack.Screen name="Home" component={FirstScreen} options={firstScreenHeader} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Select Folder" component={FolderSelector} />
                        <Stack.Screen name="FullImage" component={FullScreenImgViewer} options={{ headerShown: false }} />
                        <Stack.Screen name="Backup" component={RenderSyncingImgs} />
                        <Stack.Screen name="Test" component={Testing} />
                    </Stack.Navigator>
                </NavigationContainer>
            </MenuProvider>
        </VariableProvider>
    )
}

const navStyle = {
    headerStyle: { backgroundColor: 'rgb(8 47 73)', height: 50 },
    headerTintColor: 'rgb(186 230 253)',
    ...TransitionPresets.SlideFromRightIOS,
}

const firstScreenHeader = {
    headerTitle: () => <Text className='text-teal-300 font-bold text-xl'>Memories</Text>,
    headerRight: () => <RightSideHeader />
}

function RightSideHeader() {
    const navigation = useNavigation();
    const { performOfflineActions } = useContext(VariableContext);

    const menus = [
        { title: 'Select Folder', click: () => navigation.navigate('Select Folder') },
        { title: 'Force Sync', click: () => { performOfflineActions() } },
        { title: 'Backup', click: () => navigation.navigate('Backup') },
        { title: 'Login', click: () => navigation.navigate('Login') },
    ];
    return (
        <TouchableOpacity>
            <PopUpMenu {...{ triggerer: <Verticaldots />, menus }} />
        </TouchableOpacity>
    );
}