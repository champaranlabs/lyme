import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ICONS, LOGO } from '@src/constants/Images';
import { Colors } from '@src/constants/Colors';
import Typography from '@src/atoms/Typography';
import { Input } from '@src/atoms/Input';
import Button from '@src/atoms/Button';
import LoginForm from './LoginForm';
import { LOGIN_OPTIONS } from '@src/constants/common';
import { Link } from 'expo-router';

const LoginScreen = () => {
    return (
        <View style={styles.container}>

            <View style={{ marginBottom: 16 }}>
                <Image source={LOGO} style={{ width: 120, height: 120 }} />
                <Typography variant='H5' text="Crushing Lyme Disease, one tick at a time" style={{ textAlign: 'center', width: 142 }} />

            </View>

            <View style={{ width: '80%' }}>
                <LoginForm />
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant='BS' text="Not a member?" />
                <Link href="/register"><Typography variant='AM' text="Register now" /></Link>

            </View>
            <View style={{ width: '80%', height: 2, backgroundColor: Colors.neutral.light.darkest, marginVertical: 16 }}></View>
            {/* <View style={{ width: '100%' }}> */}
            <Typography variant='BS' text="Or continue with" />
            <View style={{ width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
                {
                    LOGIN_OPTIONS.map(option => (
                        <View key={option.id} style={{ width: 40, height: 40, borderRadius: 63, paddingHorizontal: 8, gap: 8, paddingVertical: 16, backgroundColor: option.backgroundColor }}>
                            {/* <Image source={ICONS.google} style={{ backgroundColor: Colors.neutral.light.lightest }} /> */}
                        </View>
                    ))
                }

            </View>
            {/* </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.heighLight.lightest,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen;
