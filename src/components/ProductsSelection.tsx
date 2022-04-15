import React, {useContext, useEffect, useState} from 'react';
import {ProductsRateContext} from '../contexts/ProductsContext';
import {styles} from './styles/productsSelectionStyles';
import {CatalogNodeData} from '../model/types';
import {Text, View} from 'react-native';

type SelectionInfo = {
  display: string;
  weight: number;
};

export function ProductsSelection() {
  const {catalogTree} = useContext(ProductsRateContext);
  const [selectionInfoArray, setSelectionInfoArray] = useState<SelectionInfo[]>(
    [],
  );

  useEffect(() => {
    const result: SelectionInfo[] = [];
    catalogTree.forEach((categoryNode: CatalogNodeData) => {
      if (categoryNode.selected) {
        result.push({
          display: `all ${categoryNode.name}`,
          weight: categoryNode.selected,
        });
      } else {
        categoryNode.nodes.forEach((brandNode: CatalogNodeData) => {
          if (brandNode.selected) {
            result.push({
              display: `all ${brandNode.name} ${categoryNode.name}`,
              weight: brandNode.selected,
            });
          } else {
            brandNode.nodes.forEach((modelNode: CatalogNodeData) => {
              if (modelNode.selected) {
                result.push({
                  display: `all ${modelNode.name} devices`,
                  weight: modelNode.selected,
                });
              } else {
                const selectedVariantNodes = modelNode.nodes.filter(
                  (variantNode: CatalogNodeData) => !!variantNode.selected,
                );
                if (selectedVariantNodes.size) {
                  const weight = Math.max(
                    ...selectedVariantNodes
                      .map(
                        (variantNode: CatalogNodeData) => variantNode.selected,
                      )
                      .values(),
                  );
                  const names = selectedVariantNodes
                    .sort((a: CatalogNodeData, b: CatalogNodeData) => {
                      if (a.selected < b.selected) {
                        return 1;
                      }
                      if (a.selected > b.selected) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((variantNode: CatalogNodeData) => variantNode.name);
                  result.push({
                    display: `${modelNode.name} ${names.join(', ')}`,
                    weight,
                  });
                }
              }
            });
          }
        });
      }
    });
    setSelectionInfoArray(
      result.sort((a: SelectionInfo, b: SelectionInfo) => {
        if (a.weight < b.weight) {
          return 1;
        }
        if (a.weight > b.weight) {
          return -1;
        }
        return 0;
      }),
    );
  }, [catalogTree]);

  if (!selectionInfoArray.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Variants</Text>
      <View style={styles.selectionsContainer}>
        {selectionInfoArray.map((info: SelectionInfo) => (
          <View key={info.display} style={styles.selectionItem}>
            <Text style={styles.selectionText}>{info.display}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
