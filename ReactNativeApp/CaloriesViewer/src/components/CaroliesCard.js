import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CardTitle from './CardTitle';
import BoxButton from './BoxButton';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftContainer: {
    width: '30%',
  },
  centerContainer: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: '30%',
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6200',
  },
  unit: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5F5F5F',
  },
});

const CaroliesCard = (props) => {
  return (
    <View style={styles.container}>
      <CardTitle
        title={
          new Date().getMonth() +
          1 +
          '月' +
          new Date().getDate() +
          '日の消費カロリー'
        }
      />
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer} />
        <View style={styles.centerContainer}>
          <Text style={styles.value}>1490</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.unit}>kcal</Text>
        </View>
      </View>
      <BoxButton title={'更新する'} />
      <View style={{ margin: 8 }} />
    </View>
  );
};

export default CaroliesCard;
