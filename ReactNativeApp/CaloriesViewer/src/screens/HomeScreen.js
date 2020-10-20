import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

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

  const [update, setUpdate] = useState(0);
  const [ee, setEE] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const today =
      '' +
      new Date().getFullYear() +
      (new Date().getMonth() + 1) +
      new Date().getDate();
    db.collection('users/testuser/records')
      .doc(today)
      .get()
      .then((doc) => {
        const ee = doc.data().ee;
        setEE(ee);
      });
    db.collection('users')
      .doc('testuser')
      .onSnapshot((doc) => {
        const user = doc.data().profile;
        setUser(user);
      });
  }, [navigation, update]);

  const handleUpdate = () => {
    setUpdate(update + 1);
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <CaroliesCard ee={ee} onPress={handleUpdate} />
        <View style={{ margin: 4 }} />
        <InfoCard
          user={user}
          onPress={() => {
            navigation.navigate('Edit', { user: user });
          }}
        />
        <Text>マスクを用いた消費カロリー推定システム (prototype)</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Fragment>
  );
};
