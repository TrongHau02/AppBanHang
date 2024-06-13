import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5.js";
import Header from "../../components/Header.tsx";
import {useFocusEffect} from "@react-navigation/native";
import CONFIG from "../../../config/config.ts";

type Inf = {
    id: number,
    username: string,
    password: string,
    fullname: string;
    address: string,
    roleId: number
}

const InformationScreen = ({userData, navigation}: any) => {
    const [information, setInformation] = useState<Inf[]>([userData]);
    const [fullname, setFullName] = useState(userData.fullname);
    const [username, setUsername] = useState(userData.username);
    const [address, setAddress] = useState(userData.address);
    const [password, setPassword] = useState(userData.password);

    const UpdateInfor = (information: any) => {
        navigation.navigate("UpdateInformation", {information})
    }
    useEffect(() => {
        getAPI();
    }, []);

    const getAPI = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/user/${userData.id}`);
            const data = await response.json();
            console.log(data.data);
            setInformation(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAPI();
        }, [])
    );


    return (
        <View style={{margin: 5}}>
            <Header/>
            <View style={{paddingTop: 25}}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => UpdateInfor(information)}>
                        <Text style={styles.textBTN}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.viewIcon}>
                        <Icon name="user-alt" style={styles.icon}/>
                    </View>
                    <View style={styles.inf}>
                        <Text style={styles.textLabel}>Họ và tên:</Text>
                        <Text style={styles.textInf}>{information.fullname}</Text>
                    </View>
                    <View style={styles.inf}>
                        <Text style={styles.textLabel}>Tài khoản:</Text>
                        <Text style={styles.textInf}>{information.username}</Text>
                    </View>
                    <View style={styles.inf}>
                        <Text style={styles.textLabel}>Địa chỉ:</Text>
                        <Text style={styles.textInf}>{information.address}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black",
        padding: 10,
    },
    inf: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    icon: {
        fontSize: 40,
        color: "black",
    },
    viewIcon: {
        alignItems: "center",
        marginBottom: 15,
    },
    textLabel: {
        color: "black",
        fontSize: 20,
        flex: 1, // To make the labels take up equal space
    },
    textInf: {
        color: "black",
        fontSize: 20,
        flex: 2, // To make the information take up more space
    }, btn: {
        marginBottom: 3,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#1bcdff',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    textBTN: {
        fontSize: 20,
        color: "black"
    }

});

export default InformationScreen;
