import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@src/constants/Colors';

export default function Test() {
  return (
    <View style={styles.container}>
      <Text>Index</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.light.lightest,
        alignItems: 'center',
        justifyContent: 'center',
    },
});