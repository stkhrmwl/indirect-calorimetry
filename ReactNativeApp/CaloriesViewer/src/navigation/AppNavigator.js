import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';

const Stack = createStackNavigator();

export default AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: '#FF6200' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            headerStyle: { backgroundColor: '#FF6200' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
