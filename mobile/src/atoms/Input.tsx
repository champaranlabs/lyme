import { Colors } from '@src/constants/Colors';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Typography from '@src/atoms/Typography'

type InputProps = {
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  value: string;
  onChangeText: (text: string) => void;
  rightIcon?: ImageSourcePropType;
  onRightIconPress?: () => void;
  leftIcon?: ImageSourcePropType;
  secureTextEntry?: boolean
};

export const Input = ({
  label = '',
  placeholder,
  placeholderTextColor = Colors.neutral.dark.lightest,
  onChangeText,
  value,
  rightIcon,
  onRightIconPress,
  leftIcon,
  secureTextEntry
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {label && <Typography variant='H5' text={label} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isFocused ? Colors.heighLight.darkest : Colors.neutral.light.darkest,
              paddingRight: rightIcon ? 40 : 16,
              paddingLeft: leftIcon ? 40 : 16
            }
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
            <Image source={rightIcon} style={styles.rightIcon} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    marginVertical: 6,
    borderWidth: 1,
    gap: 8
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 21,
  },
  rightIcon: {
    width: 20,
    height: 20
  }
});
