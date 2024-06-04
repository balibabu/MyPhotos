import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Login from './components/Authentication/Login'
import Testing from './R&D/Testing'
import FolderSelector from './components/Photos/FolderSelector'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { MenuProvider } from 'react-native-popup-menu'
import PopUpMenu from './components/Utility/PopUpMenu'
import DBManagement from './R&D/DBManagement'
import FirstScreen from './components/Photos/FirstScreen'
import { VariableProvider } from './components/context/VariableContext'
import ViewFullImage from './components/Photos/ViewFullImage'

const Stack = createStackNavigator();
export default function Home() {
    return (
        <VariableProvider>
            <MenuProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={navStyle} initialRouteName='Home'>
                        <Stack.Screen name="Home" component={FirstScreen}
                            options={{
                                headerTitle: () => <Text className='text-sky-100 font-bold text-xl'>Home</Text>,
                                headerRight: () => <RightSideHeader />
                            }}
                        />
                        <Stack.Screen name="Image" component={ViewFullImage} />
                        <Stack.Screen name="Testing" component={Testing} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Select Folder" component={FolderSelector} />
                        <Stack.Screen name="DBManagement" component={DBManagement} />
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

function RightSideHeader() {
    const navigation = useNavigation();
    const menus = [
        { title: 'Select Folder', click: () => navigation.navigate('Select Folder') },
        { title: 'Force Sync', click: () => { } },
        { title: 'Login', click: () => navigation.navigate('Login') },
    ];
    return (
        <TouchableOpacity>
            <PopUpMenu {...{ triggerText: '::', menus }} />
        </TouchableOpacity>
    );
}