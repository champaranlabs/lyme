import { Colors } from '@src/constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface AvatarProps {
    size?: number;
    backgroundColor?: string;
    iconSize?: number;
    iconColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    size = 100,
    backgroundColor = '#C4E538',
    iconSize = 24,
    iconColor = '#4B5320'
}) => {
    const iconContainerSize = iconSize + 8; // Adjust size to include padding around the icon
    return (
        <View style={{ height: 80, width: 80, borderRadius: 32, backgroundColor: Colors.heighLight.lightest }}>
            <View style={{ position: 'relative', top: 12, left: 24, height: 32, width: 32, borderRadius: 50, backgroundColor: Colors.heighLight.darkest }}>

            </View>
            <View style={{ position: 'absolute', bottom: 0, top: 49, left: 10, height: 25, width: 60, borderRadius: 10, backgroundColor: Colors.heighLight.darkest }}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    pencilTip: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        position: 'absolute',
        top: 6,
    },
    pencilBody: {
        width: 4,
        height: 12,
        position: 'absolute',
        top: 12,
    },
});

export default Avatar;
