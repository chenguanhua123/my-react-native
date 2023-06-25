
/*
 * @Author: cgh
 * @Date: 2023-06-25 10:01:32
 * @LastEditors: 陈观花 2083363836@qq.com
 * @LastEditTime: 2023-06-25 13:34:31
 * @Description: 首页
 */
import  React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { setNewsItem } from '../store/action';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import API from '../utils/http';

interface BannerType {
  /** ID */
  id: number,
  /** 图片地址 */
  url: string
}

interface NewsType {
  /** ID */
  id: number,
  /** 标题 */
  title: string,
  /** 日期 */
  date: string
  /** 图片地址 */
  url: string
}

const bannersTemp: BannerType[] = [
  { id: 1, url: 'https://hbimg.huaban.com/ba2e5cd85f4a56eeed1fd0feeecbb90f939bc41ecc76-6Ja1d3_fw658' },
  { id: 2, url: 'https://img0.baidu.com/it/u=886576521,2576983267&fm=253&fmt=auto&app=138&f=JPEG?w=1373&h=500' },
];

const newsListTemp: NewsType[] = [
  { id: 1, date: '2023-06-21 14:01:42', title: '李强同德国总理朔尔茨共同主持第七轮中德政府磋商并举行会谈', url: 'https://hbimg.huaban.com/ba2e5cd85f4a56eeed1fd0feeecbb90f939bc41ecc76-6Ja1d3_fw658' },
  { id: 2, date: '2023-06-25 10:01:42', title: '人民日报任仲平文章：百年辉煌，砥砺初心向复兴——写在中国共产党成立100周年之际', url: 'https://img0.baidu.com/it/u=886576521,2576983267&fm=253&fmt=auto&app=138&f=JPEG?w=1373&h=500' },
];

const HomePage = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [banners, setBanners] = useState<BannerType[]>([])
  const [newsList, setNewsList] = useState<NewsType[]>([])

  useEffect(() => {
    // 获取banner
    API.get('/news/geBannerList').then(res => {
      const data: BannerType[] = res.data;
      if (data) {
        setBanners(data)
      } else {
        setBanners(bannersTemp)
      }
    });

    // 获取列表
    API.get('/news/getNewsList').then(res => {
      const data: NewsType[] = res.data;
      if (data) {
        setNewsList(data)
      } else {
        setNewsList(newsListTemp)
      }
    });
  }, [])

  const handleDetails = (item: NewsType) => {
    dispatch(setNewsItem(item));
    navigation.navigate('Details')
  }
  

  return (
    <View>
     <View style={{height: 200 }} >
      <Swiper index={0}  autoplay autoplayTimeout={3} loop height={100}  >
          {
            banners.map((item: BannerType) => (
              <TouchableOpacity
                activeOpacity={1}
                key={`banner${item.id}`}
                onPress={() => {}}
              >
                <Image source={{ uri: item.url }} style={{ height: 200}} />
              </TouchableOpacity>
            ))
          }
        </Swiper>
     </View>
     <View style={{ paddingHorizontal: 40}}>
        {
          newsList.map((item: NewsType) => {
            return <TouchableOpacity 
              onPress={() => handleDetails(item) }
              key={`news${item.id}`}  style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
               <View><Image source={{ uri: item.url }} style={{ height: 80, width: 80}} /></View>
               <View style={{marginLeft: 10}}>
                  <Text numberOfLines={2} style={{ marginTop: 10 }} >{ item.title }</Text>
                  <Text numberOfLines={2} style={{ marginTop: 10 }} >{ item.date }</Text>
               </View>
            </TouchableOpacity>
          })
        }
     </View>
  </View>
  );
}

const mapStateToProps = (state: any) => ({
  newsItem: state.newsItem
});

const mapDispatchToProps = {
  setNewsItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);