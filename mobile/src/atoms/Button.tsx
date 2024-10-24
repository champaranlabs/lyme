import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@src/constants/Colors';
import Typography from './Typography';

type ButtonVariant = {
  backgroundColor?: string;
  textColor: string;
  borderColor?: string;
  borderWidth?: number;
};

type ButtonVariants = {
  primary: ButtonVariant;
  secondary: ButtonVariant;
  terciary: ButtonVariant;
};

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'terciary';
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function Button({ onPress, title, variant, disabled = false }: ButtonProps) {
  const variants: ButtonVariants = {
    primary: {
      backgroundColor: Colors.heighLight.darkest,
      textColor: Colors.neutral.light.lightest,
    },
    secondary: {
      backgroundColor: Colors.neutral.light.lightest,
      textColor: Colors.heighLight.darkest,
      borderColor: Colors.heighLight.darkest,
      borderWidth: 2
    },
    terciary: {
      textColor: Colors.heighLight.darkest
    },
  };

  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : undefined}
      style={[
        styles.buttonContainer,
        {
          ...(disabled ? { backgroundColor: Colors.neutral.light.darkest, opacity: 0.5 } : { ...variants[variant] })
        },
      ]}
      disabled={disabled}
    >
      <View >
        <Typography color={variants[variant].textColor} variant="AM" text={title} />
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
});
