import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormValues, registrationSchema } from '@src/components/Auth/registrationFormSchema';
import { Input } from '@src/atoms/Input';
import Button from '@src/atoms/Button';
import Typography from '@src/atoms/Typography';
import { ICONS } from '@src/constants/Images';
import Checkbox from '@src/atoms/Checkbox';
import { useMutation } from '@tanstack/react-query';
import { createOtpUserSignUp } from '@src/services/otp/otp-service';
import { SessionApiResponse } from '@src/types/api/session';
import { setAuth } from '@src/services/identity-service';
import { router } from 'expo-router';

export default function RegistrationForm() {
    const { control, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false
        }
    });
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const mutation = useMutation({
        mutationFn: async (data: RegistrationFormValues) =>
            (await createOtpUserSignUp(data)) as SessionApiResponse,
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
                router.replace('/verify-otp');
            }
        },
    });
    const onSubmit = (data: RegistrationFormValues) => {
        mutation.mutate(data)
    };
    return (
        <View style={{ width: '100%' }}>
            <View style={{ marginVertical: 4 }}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
                            placeholder="Name"
                        />
                    )}
                />
                {errors.email && <Text>{errors.email.message}</Text>}
            </View>
            <View style={{ marginVertical: 4 }}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
                            placeholder="name@email.com"
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
                            placeholder="Create a Password"
                            secureTextEntry={!showPassword}
                            rightIcon={showPassword ? ICONS.eyeOn : ICONS.eyeOff}
                            onRightIconPress={() => setShowPassword(!showPassword)}
                        />
                    )}
                />
                {errors.password && <Text>{errors.password.message}</Text>}
            </View>
            <View style={{ marginVertical: 4 }}>
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
                            placeholder="Confirm Password"
                            secureTextEntry={!showConfirmPassword}
                            rightIcon={showConfirmPassword ? ICONS.eyeOn : ICONS.eyeOff}
                            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    )}
                />
                {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}
            </View>
            <View style={{ marginVertical: 4 }}>
                <Controller
                    control={control}
                    name="acceptTerms"
                    render={({ field: { onChange, value } }) => (
                        <Checkbox
                            label='I have read through and I agree with the Terms and Conditions and the Privacy Policy.'
                            variant="medium"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.acceptTerms && <Text>{errors.acceptTerms.message}</Text>}
            </View>
            <View style={{ marginVertical: 8 }}>
                <Button variant='primary' title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}