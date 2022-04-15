import * as React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {styles} from './styles/homeScreenStyles';
import {ScreenHeader} from '../../components/ScreenHeader';
import {COLORS} from '../../constants/colors';
import {ProductsCatalog} from '../../components/ProductsCatalog';
import {ProductsSelection} from '../../components/ProductsSelection';

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled>
        <StatusBar backgroundColor={COLORS.grey} barStyle={'dark-content'} />
        <ScreenHeader title={'Browse Products'} />
        <ProductsCatalog />
        <ProductsSelection />
      </ScrollView>
    </SafeAreaView>
  );
}
