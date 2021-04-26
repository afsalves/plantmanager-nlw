import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
} from 'react-native';

import { useNavigation } from "@react-navigation/core";


import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const [isFocused, setIsfocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>(); //estou forçando a tipagem dele como string

    const navigation = useNavigation();
 
    function handleInputBlur(){
        setIsfocused(false);
        setIsFilled(!!name)
    }

    function handleInputFocus(){
        setIsfocused(true)
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    function handleSubmmit(){
        navigation.navigate('Confirmation');
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'heigth'} //para não deixar o teclado esconder elementos na tela
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}> 
                                <Text style={styles.emoji}>
                                { isFilled ? '😄' : '😀' }
                                </Text>

                                <Text style={styles.title}>
                                Como podemos {'\n'}
                                chamar você?
                                </Text>
                            </View>
                                <TextInput 
                                    style={[
                                        styles.input,
                                        (isFocused || isFilled) && 
                                        { borderColor: colors.green } //alterando a cor quando o elemento está clicado
                                    ]}
                                    placeholder='Digite um nome'
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />
                            
                            <View style={styles.footer}>
                                <Button 
                                    title ='Confirmar'
                                    onPress={handleSubmmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
        width: '100%',
    },
    header: {
       alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10, 
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,

    }
})