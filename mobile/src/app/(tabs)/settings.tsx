import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@src/constants/Colors';
import Avatar from '@src/atoms/Avatar';

export default function Settings() {

  return (
    <View style={styles.container}>
      {/* <View style={{ height: 50, width: 50, borderRadius: 60, backgroundColor: Colors.heighLight.darkest }}></View> */}
      <Avatar size={120} backgroundColor="#E3F2E1" innerCircleColor="#C4E538" bottomHalfColor="#C4E538" />
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