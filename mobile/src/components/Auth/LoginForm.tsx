import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from '@src/components/Auth/loginFormSchema';
import { Input } from '@src/atoms/Input';
import Button from '@src/atoms/Button';
import Typography from '@src/atoms/Typography';
import { useMutation } from '@tanstack/react-query';
import { createUserSession } from '@src/services/session/session-service';
import { SessionApiResponse } from '@src/types/api/session';
import { setAuth } from '@src/services/identity-service';
import { router } from 'expo-router';
import { ICONS } from '@src/constants/Images';

export default function LoginForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const [showPassword, setShowPassword] = useState(false)
  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) =>
      (await createUserSession(data)) as SessionApiResponse,
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
  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };
  return (
    <View style={{ width: '100%' }}>
      <Typography variant='H1' text="Welcome!" />
      <View style={{ width: '99%' }}>
        <View style={{ marginVertical: 4 }}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Email"
              />
            )}
          />
          {errors.email && <Text>{errors.email.message}</Text>}
        </View>
        <View style={{ marginVertical: 4 }}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? ICONS.eyeOn : ICONS.eyeOff}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />
            )}
          />
          {errors.password && <Text>{errors.password.message}</Text>}
        </View>
        <Typography variant='AM' text='Forgot password?' />
        <View style={{ marginVertical: 8 }}>
          <Button variant='primary' title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  )
}