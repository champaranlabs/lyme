import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Colors } from '@src/constants/Colors';
import Typography from '@src/atoms/Typography';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyFormValues, verifyFormSchema } from './verifyFormSchema';
import OtpInput from '@src/atoms/OtpInput';
import Button from '@src/atoms/Button';
import { useMutation } from '@tanstack/react-query';
import { validateOtpUserSignUp } from '@src/services/otp/otp-service';
import { SessionApiResponse } from '@src/types/api/session';
import { setAuth } from '@src/services/identity-service';
import { router } from 'expo-router';

export default function VerifyOtpScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifyFormSchema),
  });
  const mutation = useMutation({
    mutationFn: async (data: VerifyFormValues) =>
      (await validateOtpUserSignUp(data)) as SessionApiResponse,
    onError: (error) => {
      Alert.alert(
        'Error',
        'Something Went Wrong',
        [
          { text: 'Try Again', onPress: () => console.log('OK Pressed') },
        ]
      );
    },
    onSuccess: (data) => {
      if (!data.status) {
        Alert.alert(
          'Error',
          'Something Went Wrong',
          [
            { text: 'Try Again', onPress: () => console.log('OK Pressed') },
          ]
        );
      } else {
        setAuth(data.entity);
        router.replace('/(tabs)');
      }
    },
  });
  const onSubmit = (data: VerifyFormValues) => {
    mutation.mutate(data)
  };


  return (
    <View style={styles.container}>
      <Typography variant='H3' text="Enter confirmation code" style={{ marginVertical: 4 }} />
      <Typography variant='BS' text="A 4-digit code was sent to kimtrainor@email.com" />
      <View style={{ marginVertical: 8 }}>
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <OtpInput
              length={4}
              onOtpChange={onChange}
            />
          )}
        />
        {errors.otp && <Text>{errors.otp.message}</Text>}
      </View>
      <View style={{ marginVertical: 8, width: '80%' }}>
        <Button variant='terciary' title="Resend Code" onPress={handleSubmit(onSubmit)} />
      </View>
      <View style={{ marginVertical: 8, width: '80%' }}>
        <Button variant='primary' title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
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