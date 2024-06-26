import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type AbstractComponentProps = {
    title: string;
    textBTN?: string | null;
    onAddPress?: () => void;
}

const AbstractComponent = ({ title, textBTN, onAddPress }: AbstractComponentProps) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', fontSize: 25, fontWeight: 500 }}>{title}</Text>
            {textBTN === null ?
                null :
                <TouchableOpacity onPress={onAddPress}>
                    <Text style={{ color: 'red', fontSize: 20 }}>{textBTN}</Text>
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AbstractComponent;
