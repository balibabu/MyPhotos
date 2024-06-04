import React, { useContext } from 'react'
import VariableContext from '../context/VariableContext';
import ImageCard from './ImageCard';
import Swiper from 'react-native-swiper';

export default function ViewFullImage(props) {
    const { syncedImgs } = useContext(VariableContext);
    return (
        <Swiper loop={false} index={props.route.params.index} showsPagination={false}>
            {syncedImgs.map((image) => (<ImageCard item={image} key={image.id} fullScreen={true} />))}
        </Swiper>
    )
}
