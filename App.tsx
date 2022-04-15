import React from 'react';
import {HomeScreen} from './src/screens/HomeScreen/HomeScreen';
import {ProductsContextProvider} from './src/contexts/ProductsContext';
import {PRODUCTS_LIST} from './src/constants/mock_data';
// Uncomment and pass instead of PRODUCTS_LIST to test on big randomly generated catalog
// import mockData from './resources/mock_data.json';

const App = () => {
  return (
    <ProductsContextProvider productsList={PRODUCTS_LIST}>
      <HomeScreen />
    </ProductsContextProvider>
  );
};

export default App;
