import React, {useEffect, useState} from "react";
import Header from "../../components/Header.tsx";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import CategoryList from "../Category/CategoryList.tsx";
import ProductList from "../Dish/ProductList.tsx";
import CONFIG from "../../../config/config.ts";

type Category = {
    id: number;
    name: string;
    imageUrl: string;
}

type Dish = {
    id: number,
    name: string,
    price: number,
    categoryId: number,
    imageUrl: string
}

export const OrderScreen = ({navigation, route, userData}: any) => {
    const {id} = route.params;
    const [isLoading, setLoading] = useState(true);
    const [category, setCategory] = useState<Category[]>([]);
    const [dishAll, setDishAll] = useState<Dish[]>([]);
    const [dish, setDish] = useState<Dish[]>([]);

    const getAPICategory = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/categorys`);
            const data = await response.json();
            setCategory(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAPIDish = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/dishes`);
            const data = await response.json();
            setDishAll(data.data);
            setDish(data.data);
            // console.log(dishAll);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getDishByCategory = (id: number) => {
        /*try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/dishes/categoryId=${id}`);
            const data = await response.json();
            setDish(data.data);
            console.log(dish);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }*/
        const filteredDishes = dishAll.filter(dish => dish.categoryId === id);
        setDish(filteredDishes);
        console.log(dish);
    };

    useEffect(() => {
        getAPICategory();
        getAPIDish()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/*<Header/>
            <CategoryList/>
            <ProductList navigation={navigation} tableId={id} userId={userData.id}/>
            <Text>{id}</Text>*/}
            <Header/>
            <View>
                <View>
                    <AbstractComponent title="Loại món"/>
                </View>
                <View style={styles.categoryList}>
                    <View style={{alignItems: 'center'}}>
                        {isLoading ? (
                            <ActivityIndicator/>
                        ) : (
                            <FlatList
                                horizontal={true}
                                scrollEnabled={true}
                                data={category}
                                contentContainerStyle={styles.flatListContent}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        style={styles.category}
                                        onPress={() => getDishByCategory(item.id)}
                                    >
                                        <Image source={{uri: item.imageUrl}} style={styles.item}/>
                                        <Text style={styles.title}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        )}
                    </View>
                </View>
            </View>
            <ProductList navigation={navigation} tableId={id} userId={userData.id} dishs={dish}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5
    },
    item: {
        overflow: 'hidden',
        width: 65,
        height: 65,
        padding: 10,
    },
    category: {
        alignItems: 'center',
        marginEnd: 15,
    },
    title: {
        color: 'black',
        fontSize: 20,
        paddingTop: 5,
    },
    categoryList: {
        flexDirection: 'row',
        //justifyContent: 'center'
    },
    flatListContent: {
        justifyContent: 'center',
        flexGrow: 1,
    },
});
