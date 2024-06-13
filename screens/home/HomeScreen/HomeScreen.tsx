import React from "react";
import {StyleSheet} from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import PayIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CategoryScreen from "../../admin/Category/CategoryScreen.tsx";
import ProductScreen from "../../admin/ProductScreen/ProductScreen.tsx";
import InformationScreen from "../../admin/InfomationScreen/InfomationScreen.tsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AddCategoryScreen from "../../admin/Category/AddCategoryScreen.tsx";
import AddTableScreen from "../../admin/Table/AddTableScreen.tsx";
import AddDishScreen from "../../admin/ProductScreen/AddDishScreen.tsx";
import {AddEmployeeScreen} from "../../admin/EmployeeScreen/AddEmployeeScreen.tsx";
import {UpdateEmployeeScreen} from "../../admin/EmployeeScreen/UpdateEmployeeScreen.tsx";
import UpdateCategoryScreen from "../../admin/Category/UpdateCategoryScreen.tsx";
import UpdateTableScreen from "../../admin/Table/UpdateTableScreen.tsx";
import {UpdateInformationScreen} from "../../admin/InfomationScreen/UpdateInformationScreen.tsx";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TableScreen} from "../../home/Table/TableScreen.tsx";
import {PaymentScreen} from "../Payment/PaymentScreen.tsx";
import {OrderScreen} from "../OrderScreen/OrderScreen.tsx";
import {PaymentDetail} from "../Payment/PaymentDetail.tsx";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({userData}: any) => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName: any;

                    if (route.name === 'Table') {
                        iconName = focused ? 'tablet-landscape' : 'tablet-landscape-outline';
                    } else if (route.name === 'Payment') {
                        iconName = focused ? 'contactless-payment-circle' : 'contactless-payment-circle-outline';
                        return <PayIcon name={iconName} size={size} color={color}/>;
                    } else if (route.name === 'Information') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }
                    return <Icon name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name={"Table"} component={TableScreen}/>
            <Tab.Screen name={"Payment"} component={PaymentScreen}/>
            <Tab.Screen name="Information">
                {props => <InformationScreen {...props} userData={userData} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}


const HomeScreen = ({navigation, route}: any) => {
   /* const { userData } = route.params;

    return (
        <View style={styles.main}>
            <View>
                <Header/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <CategoryList data={userData} navigation={navigation}/>
                </View>
                <View>
                    <ProductList navigation={navigation}/>
                </View>
            </ScrollView>

        </View>
    );*/
    const { userData } = route.params;

    return (
        <>
            <Stack.Navigator initialRouteName="TabNavigator">
                {/*<Stack.Screen name={"TabNavigator"} component={TabNavigator} options={{headerShown: false}}/>*/}
                <Stack.Screen name="TabNavigator" options={{ headerShown: false }}>
                    {props => <TabNavigator {...props} userData={userData} />}
                </Stack.Screen>
                <Stack.Screen name="OrderDish" options={{headerShown: false}}>
                    {props => <OrderScreen {...props} userData={userData} />}
                </Stack.Screen>
                <Stack.Screen name={"AddTable"} component={AddTableScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddDish"} component={AddDishScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddEmployee"} component={AddEmployeeScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateEmployee"} component={UpdateEmployeeScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateCategory"} component={UpdateCategoryScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateTable"} component={UpdateTableScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateInformation"} component={UpdateInformationScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"PaymentDetail"} component={PaymentDetail} options={{headerShown: false}}/>
            </Stack.Navigator>
        </>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFF0",
        paddingHorizontal: 15,

    }
})

export default HomeScreen;
