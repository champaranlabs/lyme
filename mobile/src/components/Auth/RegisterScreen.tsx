import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@src/constants/Colors'
import Typography from '@src/atoms/Typography'
import RegistrationForm from './RegistrationForm'

export default function RegisterScreen() {
    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 32 }}>
                <Typography variant='H3' text="Sign up" />
                <View style={{ marginVertical: 4 }} />
                <Typography variant='BS' text="Create an account to get started " color={Colors.neutral.dark.light} />
            </View>
            <RegistrationForm />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.light.lightest,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10
    }
})