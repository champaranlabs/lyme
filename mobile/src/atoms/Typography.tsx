import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { Colors } from '@src/constants/Colors'

type TypographyVariant = {
    fontSize: number;
    fontWeight: 400 | 700 | 900;
    lineHeight?: number;
    color?: string;
};
type TypographyVariants = {
    H1: TypographyVariant,
    H3: TypographyVariant,
    H5: TypographyVariant,
    AM: TypographyVariant,
    BS: TypographyVariant
}
type TypographyProps = {
    variant: 'H1' | 'H3' | 'H5' | 'AM' | 'BS',
    text: string
    color?: string;
    style?: StyleProp<TextStyle>
}
export default function Typography({ variant, text, style, color = Colors.neutral.dark.dark }: TypographyProps) {
    const variants: TypographyVariants = {
        H1: {
            fontSize: 24,
            fontWeight: 900
        },
        H3: {
            fontSize: 16,
            fontWeight: 900,
            lineHeight: 19,
            color
        },
        H5: {
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 15,
            color
        },
        AM: {
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 15,
            color
        },
        BS: {
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 16,
            color
        }
    }
    return (
        <Text style={[variants[variant], style]}>{text}</Text>
    )
}