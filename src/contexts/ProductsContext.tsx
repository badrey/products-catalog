import * as React from 'react';
import {Map} from 'immutable';
import {useCallback, useEffect, useRef, useState} from 'react';
import {doToggleSelection, productsListToCatalogTree} from './utils';
import type {
  Product,
  CatalogTree,
  ProductsSelectionType,
  CatalogNodeData,
} from '../model/types';

type ProductsContextType = {
  catalogTree: CatalogTree;
  toggleSelection: (productsSelectionType: ProductsSelectionType) => void;
};

const EMPTY_MAP = Map<string, CatalogNodeData>();

const defaultProductsRateContext: ProductsContextType = {
  catalogTree: EMPTY_MAP,
  toggleSelection: () => {},
};

export const ProductsRateContext = React.createContext<ProductsContextType>(
  defaultProductsRateContext,
);

type Props = {
  children: React.ReactNode;
  productsList: Product[];
};

export function ProductsContextProvider({children, productsList}: Props) {
  const [catalogTree, setCatalogTree] = useState<CatalogTree>(EMPTY_MAP);
  const weightRef = useRef(0);

  useEffect(() => {
    setCatalogTree(productsListToCatalogTree(productsList));
  }, [productsList]);

  const toggleSelection = useCallback(
    (productsSelectionType: ProductsSelectionType) => {
      setCatalogTree((currentTree) =>
        doToggleSelection({
          productsSelectionType,
          catalogTree: currentTree,
          weight: weightRef.current,
        }),
      );
      weightRef.current += 1;
    },
    [],
  );

  const state = {catalogTree, toggleSelection};
  return (
    <ProductsRateContext.Provider value={state}>
      {children}
    </ProductsRateContext.Provider>
  );
}
