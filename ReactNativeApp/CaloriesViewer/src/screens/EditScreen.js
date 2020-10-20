import React, { useState, useEffect, Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

import CardTitle from '../components/CardTitle';
import BoxButton from '../components/BoxButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
  },
  editCard: {
    width: '100%',
    height: 360,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 8,
    marginLeft: 16,
  },
  astr: {
    marginTop: 8,
    color: 'red',
  },
  input: {
    marginTop: 4,
    marginHorizontal: 16,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    fontSize: 18,
    textAlign: 'right',
    paddingHorizontal: 4,
  },
});

export default EditScreen = (props) => {
  const { navigation, route } = props;
  const { user } = route.params;

  const [age, setAge] = useState(user.age.toString());
  const [weight, setWeight] = useState(user.weight.toString());
  const [rhr, setRHR] = useState(user.rhr.toString());
  const [hrmax, setHRmax] = useState(
    user.hrmax != -1 ? user.hrmax.toString() : ''
  );
  const [vo2max, setVO2max] = useState(
    user.vo2max != -1 ? user.vo2max.toString() : ''
  );

  const handleSubmit = () => {
    if (
      age < 0 ||
      weight < 1 ||
      rhr < 1 ||
      (hrmax != '' && hrmax < 1) ||
      (vo2max != '' && vo2max < 1)
    ) {
      Alert.alert('入力エラー', '適切な値が入力されていません', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            return;
          },
        },
      ]);
    }
    const db = firebase.firestore();
    const user = {
      age: parseInt(age),
      weight: parseInt(weight),
      rhr: parseInt(rhr),
      hrmax: hrmax != '' ? parseInt(hrmax) : -1,
      vo2max: vo2max != '' ? parseInt(vo2max) : -1,
    };
    db.collection('users')
      .doc('testuser')
      .set({
        profile: user,
      })
      .then(() => {
        console.log('success update');
      });
    navigation.navigate('Home', { user: user });
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.editCard}>
          <CardTitle title={'登録情報を編集'} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>年齢 [歳]</Text>
            <Text style={styles.astr}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
            value={age}
            onChangeText={(body) => setAge(body)}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>体重 [kg]</Text>
            <Text style={styles.astr}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
            value={weight}
            onChangeText={(body) => setWeight(body)}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>安静時心拍数 [回/分]</Text>
            <Text style={styles.astr}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
            value={rhr}
            onChangeText={(body) => setRHR(body)}
          />
          <Text style={styles.title}>最大心拍数 [回/分]</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
            value={hrmax}
            onChangeText={(body) => setHRmax(body)}
          />
          <Text style={styles.title}>最大酸素摂取量 [ml/分]</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
            value={vo2max}
            onChangeText={(body) => setVO2max(body)}
          />
          <Text
            style={{
              marginVertical: 4,
              marginHorizontal: 16,
              fontSize: 12,
              color: 'red',
            }}
          >
            *必須
          </Text>
        </View>
        <View style={{ width: '100%', backgroundColor: '#fff' }}>
          <BoxButton
            title={'保存'}
            onPress={() => {
              handleSubmit();
            }}
          />
          <View style={{ margin: 4 }} />
          <BoxButton
            title={'キャンセル'}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={{ margin: 8 }} />
        </View>
        <Text>マスクを用いた消費カロリー推定システム (prototype)</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Fragment>
  );
};
