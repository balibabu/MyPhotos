import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import CButton from '../Utility/CButton'
import { deleteRow, insertRow } from '../Utility/CDatabase';
import { Confirmation } from '../Utility/Confirmation';
import { login } from './authentication';
import VariableContext from '../context/VariableContext';
import WaitFor from '../Utility/Waiter';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { variables, getVariables, performOfflineActions } = useContext(VariableContext);

    async function loginHandler() {
        const token = await login(username, password);
        await deleteRow('Variables', "name='Token'");
        await insertRow('Variables', { name: 'Token', value: token });
        await getVariables()
        setPassword('');
        performOfflineActions();
    }

    async function logoutHandler() {
        const status = await Confirmation('Logout', 'are you sure?', { proceed: 'yes', abort: 'no' });
        if (status) {
            await deleteRow('Variables', "name='Token'");
            getVariables();
        }
    }

    if (variables.Token) {
        return (
            <View style={styles.container} className='bg-gray-800 p-2'>
                <Text className='text-sky-100 text-xl text-center font-bold'>You are already logged in</Text>
                <Text className='text-sky-100 text-sm text-center'>clear the app data for logout</Text>
                {/* <CButton {...{ title: 'logout', onClick: logoutHandler, style: { text: 'bg-sky-900 p-2 m-2 rounded-md text-sky-100 text-xl text-center font-bold' } }} /> */}
            </View>
        );
    }

    return (
        <View style={styles.container} className='bg-gray-800 p-2'>
            <View className='bg-sky-100 border-2 border-sky-900 m-1 rounded-md flex-row  justify-between overflow-hidden'>
                <View className='bg-sky-200 h-fit px-2 border-r-2 border-sky-900 py-2'>
                    <Text className='text-xl font-bold text-sky-900'>Username</Text>
                </View>
                <TextInput className='grow text-xl text-sky-900' placeholder='username' value={username} onChangeText={(text) => setUsername(text)} />
            </View>
            <View className='bg-sky-100 border-2 border-sky-900 m-1 rounded-md flex-row  justify-between overflow-hidden'>
                <View className='bg-sky-200 h-fit px-2 border-r-2 border-sky-900 py-2'>
                    <Text className='text-xl font-bold text-sky-900'>Password</Text>
                </View>
                <TextInput className='grow text-xl text-sky-900' placeholder='password' secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <CButton {...{ title: 'Login', onClick: loginHandler, style: { text: 'text-xl text-sky-100 p-1 text-center font-bold bg-sky-900 m-1 rounded-md p-2' } }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        // alignItems: 'center', // Center content horizontally
    },
});