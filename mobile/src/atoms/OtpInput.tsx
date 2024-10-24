import { Colors } from '@src/constants/Colors';
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface OtpInputProps {
    length?: number;
    onOtpChange?: (otp: string) => void;
}

const OtpInput = ({ length = 4, onOtpChange }: OtpInputProps) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputs = useRef<TextInput[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(0)

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (onOtpChange) {
            onOtpChange(newOtp.join(''));
        }

        // Move focus to the next box if the current one has a value
        if (value && index < length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    style={[
                        styles.box,
                        {
                            borderColor: focusedIndex === index ? Colors.heighLight.darkest : Colors.neutral.light.darkest,
                        }
                    ]}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(value) => handleOtpChange(value, index)}
                    value={digit}
                    ref={(input) => {
                        if (input) inputs.current[index] = input;
                    }}
                    onFocus={() => setFocusedIndex(index)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        borderWidth: 1.5,
        width: 48,
        height: 48,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 8,
        margin: 10,
        textAlign: 'center',
        fontSize: 20,
    },
});

export default OtpInput;
