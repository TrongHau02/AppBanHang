import React, {useCallback, useEffect, useState} from "react";
import CONFIG from "../../../config/config.ts";
import {useFocusEffect} from "@react-navigation/native";
import {ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../components/Header.tsx";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import Icons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DeleteTable from "../../admin/Table/DeleteTable.tsx";

type TableItem = {
    id: number;
    name: string;
};

export const TableScreen = ({navigation}: any) => {
    const [table, setTable] = useState<TableItem[]>([]);
    const [isLoading, setLoading] = useState(true);

    const getAPI = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/tables`);
            const data = await response.json();
            setTable(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAPI();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);  // Show loading indicator while fetching data
            getAPI();
        }, [])
    );

    const ItemClick = (id: number) => {
        //Alert.alert(id.toString());
        navigation.navigate('OrderDish', {id});
    };

    return (
        <View style={styles.container}>
            <Header/>
            <AbstractComponent title={"Danh sách"}/>
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        scrollEnabled={false}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        data={table}
                        renderItem={({item}: any) => (
                            <TouchableOpacity style={styles.item} onPress={() => ItemClick(item.id)}>
                                <Icons name={"tablet-landscape"} style={styles.ItemImage}/>
                                <Text style={styles.title}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    border: {
        justifyContent: 'center'
    },
    ItemImage: {
        fontSize: 100
    },
    container: {
        flex: 1,
        marginHorizontal: 5
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2
    },
    groupBTN: {
        flexDirection: 'row',

    },
    icon: {
        fontSize: 40
    },
    title: {
        fontSize: 25,
        color: 'black'
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    }

})

