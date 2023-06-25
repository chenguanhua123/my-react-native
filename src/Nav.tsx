/*
 * @Author: cgh
 * @Date: 2023-06-25 10:01:32
 * @LastEditors: cgh
 * @LastEditTime: 2023-06-25 13:32:40
 * @Description: 路由配置
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Home';
import DetailsPage from './Details';

const Stack = createNativeStackNavigator();

function Nav () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{title: '首页', headerTitleAlign: 'center'}}  />
        <Stack.Screen name="Details" component={DetailsPage} options={{title: '详情', headerTitleAlign: 'center'}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;