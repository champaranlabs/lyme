import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@src/constants/Colors';
import Typography from './Typography';

type CheckboxVariant = {
    width: number,
    height: number,
    borderRadius: number,
    borderWidth: number,
}

type CheckboxProps = {
    label?: string;
    checkedColor?: string;
    tickColor?: string;
    variant: 'small' | 'medium' | 'large';
    fontVariant?: 'AM';
    fontSize?: number;
    value: boolean;
    onChange: (checked: boolean) => void;
};

type CheckBoxVariants = {
    small: CheckboxVariant,
    medium: CheckboxVariant,
    large: CheckboxVariant,
}
const variants: CheckBoxVariants = {
    small: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1.5,
    },
    medium: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1.5,
    },
    large: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 1.5,
    }
}
const Checkbox = ({
    label,
    checkedColor = Colors.heighLight.darkest,
    tickColor = Colors.neutral.light.lightest,
    fontSize = 12,
    fontVariant = 'AM',
    value,
    variant,
    onChange,
}: CheckboxProps) => {
    return (
        <TouchableOpacity onPress={() => onChange(!value)} style={styles.container}>
            <View
                style={[
                    variants[variant],
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 8
                    },
                    { backgroundColor: value ? checkedColor : '#fff', borderColor: value ? checkedColor : Colors.neutral.light.darkest },
                ]}
            >
                {value && <FontAwesome name="check" size={18} color={tickColor} />}
            </View>
            {label && <Typography variant={fontVariant} text={label} style={{ fontSize: fontSize }} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Checkbox;
