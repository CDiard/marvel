import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { ListScreen } from './list_screen';
import { FavoriteScreen } from './favorite_screen';
import { SearchScreen } from './search_screen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#ec1d24',
            }}
        >
            <Tab.Screen
                name="Liste des héros Marvel"
                component={ListScreen}
                options={{
                    tabBarLabel: 'Marvel',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Vos héros favoris"
                component={FavoriteScreen}
                options={{
                    tabBarLabel: 'Favoris',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="heart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Rechercher vos héros"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Recherche',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="search-web" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}