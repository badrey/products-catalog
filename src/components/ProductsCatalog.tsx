import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {useCallback, useContext, useMemo} from 'react';
import {ProductsRateContext} from '../contexts/ProductsContext';
import {CatalogNode} from './CatalogNode';
import {styles} from './styles/productsCatalogStyles';
import type {CatalogNodeData} from '../model/types';

export function ProductsCatalog() {
  const {catalogTree, toggleSelection} = useContext(ProductsRateContext);
  const categoryArray: Readonly<CatalogNodeData>[] = useMemo(() => {
    return [...catalogTree.values()];
  }, [catalogTree]);

  const onToggleSelected = useCallback(
    (...args) => {
      const [category, brand, model, variant] = args;
      toggleSelection({category, brand, model, variant});
    },
    [toggleSelection],
  );

  /*
    I checked on a big randomly generated catalog (resources/mock_data.json) and it works fine.
    If there are performance issues with ScrollView on real data it might be converted to FlatList
    with the corresponding changes in other places.
   */
  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={styles.contentContainer}
      >
        {categoryArray.map((categoryData: Readonly<CatalogNodeData>) => (
          <CatalogNode
            key={categoryData.name}
            nodeData={categoryData}
            onToggleSelected={onToggleSelected}
          />
        ))}
      </ScrollView>
    </View>
  );
}
