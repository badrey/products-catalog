import {Map} from 'immutable';

export type Product = {
  category: string;
  brand: string;
  model: string;
  variant: string;
  total: number;
};

export type CatalogTree = Map<string, CatalogNodeData>;
export type CatalogNodeData = {
  name: string;
  total: number;
  type: 'category' | 'brand' | 'model' | 'variant';
  selected: number;
  nodes: Map<string, CatalogNodeData>;
};

export type CatalogRawTree = {[name: string]: CatalogRawNodeData};
export type CatalogRawNodeData = {
  name: string;
  total: number;
  type: 'category' | 'brand' | 'model' | 'variant';
  selected: number;
  nodes: {[name: string]: CatalogRawNodeData};
};

export type ProductsSelectionType = {
  category: string;
  brand?: string;
  model?: string;
  variant?: string;
};
