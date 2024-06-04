import React from 'react'
import { Text, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";


export default function PopUpMenu(props) {

    return (
        <View>
            <Menu>
                <MenuTrigger><Text className='text-sky-100 font-bold text-xl px-4 py-2' style={{ height: "100%" }}>{props.triggerText}</Text></MenuTrigger>
                <MenuOptions>
                    {props.menus && props.menus.map((menu, index) => <MenuOption key={index} onSelect={menu.click} className='bg-gray-800 border-t border-gray-700 px-4'><Text className='text-gray-100 text-right'>{menu.title}</Text></MenuOption>)}
                </MenuOptions>
            </Menu>
        </View>
    );
}
