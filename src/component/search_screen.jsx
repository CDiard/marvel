import React from 'react';
import {Text, View, TextInput} from "react-native";

export function SearchScreen() {
    const [text, onChangeText] = React.useState('Votre recherche...');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Rechercher</Text>
            <TextInput
                onChangeText={onChangeText}
                placeholder={text}
            />
        </View>
    );
}