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
  const { user, onPress } = props;

  return (
    <View style={styles.container}>
      <CardTitle title={'登録情報'} />
      <View style={styles.mainContainer}>
        <Text>年齢: {user.age} 歳</Text>
        <Text>体重: {user.weight} kg</Text>
        <Text>安静時心拍数: {user.rhr} 回/分</Text>
        <Text>
          最大心拍数: {user.hrmax != -1 ? user.hrmax : '(未登録)'} 回/分
        </Text>
        <Text>
          最大酸素摂取量: {user.vo2max != -1 ? user.vo2max : '(未登録)'} ml/分
        </Text>
      </View>
      <BoxButton title={'編集する'} onPress={onPress} />
      <View style={{ margin: 8 }} />
    </View>
  );
};

export default InfoCard;
