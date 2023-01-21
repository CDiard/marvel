import { createStackNavigator } from '@react-navigation/stack';
import { ListScreen } from './list_screen';
import { DetailScreen } from "./detail_screen";

const Stack = createStackNavigator();

export function ListDetailTabs() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name="Liste des héros Marvel"
                component={ListScreen}
            />
            <Stack.Screen
                name="Détail du héro Marvel"
                component={DetailScreen}
            />
        </Stack.Navigator>
    );
}