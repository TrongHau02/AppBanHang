import React, {useCallback, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Header from "../../components/Header.tsx";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useFocusEffect} from "@react-navigation/native";
import CONFIG from "../../../config/config.ts";

type DishItem = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    categoryId: number;
};

const ProductScreen = ({navigation}: any) => {
    const [dish, setDish] = useState<DishItem[]>([]);
    const [isLoading, setLoading] = useState(true);

    const data = [
        {"id": 1, "name": "Gà hấp", "price": 175000.0, "imageUrl": "http://192.168.0.104:8888/uploads/dishs/1716959172443_hngtrchanh.png", "categoryId": 1},
        {"id": 2, "name": "Gà chiên", "price": 175000.0, "imageUrl": "http://192.168.0.104:8888/uploads/dishs/1716959172443_hngtrchanh.png", "categoryId": 2},
        {"id": 3, "name": "Gà xào", "price": 175000.0, "imageUrl": "http://192.168.0.104:8888/uploads/dishs/1716959172443_hngtrchanh.png", "categoryId": 3},
    ];

    const getAPI = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/dishs`);
            const data = await response.json();
            setDish(data.data);
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

    const AddDish = () => {
        navigation.navigate('AddDish');
    }

    const CategoryDeleteClick = async (id: number) => {
        /*try {
            const response = await fetch(`http://192.168.0.105:8888/api/v1/categorys/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Thông báo", data.message);
                // Cập nhật danh sách danh mục sau khi xóa thành công
                const updatedCategories = category.filter(category => category.id !== id);
                setCategory(updatedCategories);
            } else {
                Alert.alert("Thông báo", data.message);
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Thông báo", "Có lỗi xảy ra!");
        }*/
    };

    const DishUpdateClick = (item: any) => {
        navigation.navigate('UpdateDish', {item});
    };

    return (
        <View style={styles.container}>
            <Header/>
            <AbstractComponent title={"Danh sách"} textBTN={"Thêm"} onAddPress={AddDish}/>
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        scrollEnabled={false}
                        data={data}
                        renderItem={({item}: any) => (
                            <View style={styles.item}>
                                <Image source={{uri: item.imageUrl}} style={styles.image}/>
                                <Text style={styles.title}>{item.name}</Text>
                                <View style={styles.groupBTN}>
                                    <TouchableOpacity onPress={() => DishUpdateClick(item)}>
                                        <Icon name={'update'} style={styles.icon}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => CategoryDeleteClick(item.id)}>
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
export default ProductScreen;
