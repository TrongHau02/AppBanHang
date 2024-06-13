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

    const getAPI = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/dishes`);
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

    const ProductDeleteClick = async (id: number) => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa danh mục này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const response = await fetch(`${CONFIG.API_BASE_URL}/dishes/${id}`, {
                                method: 'DELETE',
                            });
                            const data = await response.json();
                            if (response.ok) {
                                Alert.alert("Thông báo", data.message);
                                // Cập nhật danh sách danh mục sau khi xóa thành công
                                const updatedDishes = dish.filter(dish => dish.id !== id);
                                setDish(updatedDishes);
                            } else {
                                Alert.alert("Thông báo", data.message);
                            }
                        } catch (error) {
                            console.log(error);
                            Alert.alert("Thông báo", "Có lỗi xảy ra!");
                        }
                    }
                }
            ]
        );
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
                        data={dish}
                        renderItem={({item}: any) => (
                            <View style={styles.item}>
                                <Image source={{uri: item.imageUrl}} style={styles.image}/>
                                <Text style={styles.title}>{item.name}</Text>
                                <View style={styles.groupBTN}>
                                    <TouchableOpacity onPress={() => DishUpdateClick(item)}>
                                        <Icon name={'update'} style={styles.icon}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => ProductDeleteClick(item.id)}>
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
