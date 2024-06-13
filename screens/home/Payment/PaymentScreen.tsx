import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../components/Header.tsx";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import Icons from "react-native-vector-icons/Ionicons";
import CONFIG from "../../../config/config.ts";
import {useFocusEffect} from "@react-navigation/native";

type Dishs = {
    dishId: number,
    quantity: number,
    price: number,
    amount: number,
    dishName: string
}

type Payment = {
    paymentId: number,
    orderId: number,
    userId: number
    tableId: number,
    tableName: string,
    totalAmount: number,
    dishs: Dishs[],
    userFullName: string
}

export const PaymentScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(true);
    const [payment, setPayment] = useState<Payment[]>([]);

    const getAPITableUnpaid = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/payments`);
            const data = await response.json();
            const resData = data.data;
            setPayment(resData);
            //console.log(JSON.stringify(resData, null, 2)); // Better logging for nested objects
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAPITableUnpaid();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);  // Show loading indicator while fetching data
            getAPITableUnpaid();
        }, [])
    );

    const paymentDetail = (item: any) => {
        navigation.navigate('PaymentDetail', {item})
        //console.log(item);
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
                        data={payment}
                        renderItem={({item}: any) => (
                            <View style={styles.item}>
                                <Icons name={"tablet-landscape"} style={styles.ItemImage}/>
                                <View style={styles.details}>
                                    <Text style={styles.title}>{item.tableName}</Text>
                                    <Text style={styles.amount}>Total: {item.totalAmount} VNĐ</Text>
                                </View>
                                <View style={styles.groupBTN}>
                                    <TouchableOpacity onPress={() => paymentDetail(item)} style={styles.button}>
                                        <Text style={styles.buttonText}>Thanh toán</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.paymentId.toString()}
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
        fontSize: 50
    },
    container: {
        flex: 1,
        marginHorizontal: 5
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2
    },
    details: {
        flex: 1,
        marginLeft: 10
    },
    dishList: {
        marginTop: 10
    },
    dishItem: {
        marginBottom: 5
    },
    dishText: {
        fontSize: 16,
        color: 'black'
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
    amount: {
        fontSize: 20,
        color: 'green'
    },
    button: {
        backgroundColor: '#1bcdff',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    }
});
