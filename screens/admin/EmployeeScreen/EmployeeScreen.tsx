import React, {useState} from "react";
import {ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../components/Header.tsx";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome";

const EmployeeScreen = ({navigation}: any) => {
    const [isLoading, setLoading] = useState(false);

    const data = [
        {id: 1, "username": "nguyenvana", "password": "123456", "fullname": "Nguyễn Văn A", "address": "Tp.Hồ Chí Minh"},
        {id: 2, "username": "nguyenvanb", "password": "123456", "fullname": "Nguyễn Văn B", "address": "Tp.Hồ Chí Minh"},
        {id: 3, "username": "nguyenvanc", "password": "123456", "fullname": "Nguyễn Văn C", "address": "Tp.Hồ Chí Minh"},
    ]

    const AddEmployee = () => {
        navigation.navigate('AddEmployee');
    };

    const EmployeeUpdate = (item: any) => {
        navigation.navigate('UpdateEmployee', {item})
    }

    const EmployeeDelete = ({id}: any) => {

    }

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
                        data={data}
                        renderItem={({item}: any) => (
                            <View style={styles.item}>
                                {/*<Image source={{uri: item.imageUrl}} style={styles.image}/>*/}
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
