/*
 * @Author: cgh
 * @Date: 2023-06-25 10:01:32
 * @LastEditors: 陈观花 2083363836@qq.com
 * @LastEditTime: 2023-06-25 13:33:53
 * @Description: 详情
 */
import  React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

const DetailsPage = () => {

  const newsItem = useSelector((state: any) => state.newsItem);

    useEffect(() => {
      console.log('newsItem==', newsItem)
    }, [])

  return (
    <View style={{ flex: 1}}>
      <Image source={{ uri: newsItem?.url }} style={{ height: 80, width: '100%'}} />
      <Text>{ newsItem?.title }</Text>
      <Text>{ newsItem?.date }</Text>
    </View>
  );
}
export default DetailsPage;