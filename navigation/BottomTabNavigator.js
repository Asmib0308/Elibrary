import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/search';
import Transaction from '../screens/transaction';
import { NavigationContainer } from "@react-navigation/native";


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
      <NavigationContainer>
    <Tab.Navigator>        
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}