import React from 'react'
import { Text, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Verticaldots from '../../images/Verticaldots';


export default function PopUpMenu(props) {

    return (
        <View>
            <Menu>
                <MenuTrigger>{props.triggerer}</MenuTrigger>
                <MenuOptions>
                    {props.menus && props.menus.map((menu, index) =>
                        <MenuOption key={index} onSelect={menu.click} className='bg-gray-800 border-t border-gray-700 px-4'>
                            <Text className='text-gray-100 text-right text-xl'>{menu.title}</Text>
                        </MenuOption>
                    )}
                </MenuOptions>
            </Menu>
        </View>
    );
}
