import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CardTitle from './CardTitle';
import BoxButton from './BoxButton';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 192,
    backgroundColor: '#fff',
  },
  mainContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    flex: 1,
  },
});

const InfoCard = (props) => {
  const { age, w, rhr, hrmax, vo2max, onPress } = props;

  return (
    <View style={styles.container}>
      <CardTitle title={'登録情報'} />
      <View style={styles.mainContainer}>
        <Text>年齢: {age} 歳</Text>
        <Text>体重: {w} kg</Text>
        <Text>安静時心拍数: {rhr} 回/分</Text>
        <Text>最大心拍数: {hrmax} 回/分</Text>
        <Text>最大酸素摂取量: {vo2max} ml/分</Text>
      </View>
      <BoxButton title={'編集する'} onPress={onPress} />
      <View style={{ margin: 8 }} />
    </View>
  );
};

export default InfoCard;
