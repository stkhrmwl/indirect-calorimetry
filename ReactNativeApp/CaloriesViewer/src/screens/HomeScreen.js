import React, { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import CaroliesCard from '../components/CaroliesCard';
import InfoCard from '../components/InfoCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
  },
});

export default HomeScreen = (props) => {
  const { navigation, route } = props;
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <CaroliesCard />
        <View style={{ margin: 4 }} />
        <InfoCard
          onPress={() => {
            navigation.navigate('Edit');
          }}
        />
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Fragment>
  );
};
