import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../components/Header.tsx";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome";
import CONFIG from "../../../config/config.ts";
import {useFocusEffect} from "@react-navigation/native";

type Employee = {
    id: number,
    username: string,
    password: string,
    fullname: string,
    address: string,
    roleId: number
}

const EmployeeScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(false);
    const [employee, setEmployee] = useState<Employee[]>([]);

    const getAPI = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/user/employee`);
            const data = await response.json();
            setEmployee(data.data);
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

    const AddEmployee = () => {
        navigation.navigate('AddEmployee');
    };

    const EmployeeUpdate = (item: any) => {
        navigation.navigate('UpdateEmployee', {item})
    }

    const EmployeeDelete = async (id: number) => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa nhân viên này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const response = await fetch(`${CONFIG.API_BASE_URL}/user/${id}`, {
                                method: 'DELETE',
                            });
                            const data = await response.json();
                            if (response.ok) { // Check if response status is 200
                                Alert.alert("Thông báo", "Xóa nhân viên thành công");
                                // Cập nhật danh sách nhân viên sau khi xóa thành công
                                const updatedEmployee = employee.filter(employee => employee.id !== id);
                                setEmployee(updatedEmployee);
                            } else {
                                Alert.alert("Thông báo", "Xóa nhân viên thất bại");
                            }
                        } catch (error) {
                            console.log(error);
                            Alert.alert("Thông báo", "Có lỗi xảy ra khi xóa nhân viên!");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header/>
            <AbstractComponent title={"Danh sách"} textBTN={"Thêm"} onAddPress={AddEmployee}/>
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        scrollEnabled={false}
                        data={employee}
                        renderItem={({item}: any) => (
                            <View style={styles.item}>
                                <Icons name={'user'} style={styles.icon}/>
                                <Text style={styles.title}>{item.fullname}</Text>
                                <View style={styles.groupBTN}>
                                    <TouchableOpacity onPress={() => EmployeeUpdate(item)}>
                                        <Icon name={'update'} style={styles.icon}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => EmployeeDelete(item.id)}>
                                        <Icon name={'delete'} style={styles.icon}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
    image: {
        width: 80,
        height: 80
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
    }

})

export default EmployeeScreen;
