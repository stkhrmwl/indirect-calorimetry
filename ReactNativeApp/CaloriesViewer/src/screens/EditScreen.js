import React, { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text, TextInput } from 'react-native';

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
  require: {
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

export default HomeScreen = (props) => {
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.editCard}>
          <CardTitle title={'登録情報を編集'} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>年齢 [歳]</Text>
            <Text style={styles.require}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>体重 [kg]</Text>
            <Text style={styles.require}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>安静時心拍数 [回/分]</Text>
            <Text style={styles.require}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
          />
          <Text style={styles.title}>最大心拍数 [回/分]</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
          />
          <Text style={styles.title}>最大酸素摂取量 [ml/分]</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'numeric'}
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
          <BoxButton title={'保存'} />
          <View style={{ margin: 4 }} />
          <BoxButton title={'キャンセル'} />
          <View style={{ margin: 8 }} />
        </View>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Fragment>
  );
};
