// DeleteTable.jsx
import React from 'react';
import {Alert, StyleSheet, ToastAndroid, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CONFIG from "../../../config/config.ts";

const deleteTable = async (id: number) => {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/tables/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error deleting table');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const DeleteTable = ({ tableId, onDeleteSuccess }: any) => {
    const handleDelete = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this table?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteTable(tableId);
                            ToastAndroid.showWithGravity(
                                'Table deleted successfully',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                            );
                            onDeleteSuccess(); // Refresh the table list after deletion
                        } catch (error) {
                            ToastAndroid.showWithGravity(
                                'Error deleting table',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                            );
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View>
            <TouchableOpacity onPress={handleDelete}>
                <Icon name={'delete'} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'red',
    },
    deleteButtonText: {
        fontSize: 16,
        color: 'white',
    },
    icon: {
        fontSize: 40
    },
});

export default DeleteTable;
