import {fromJS, isKeyed} from 'immutable';
import type {
  CatalogRawNodeData,
  CatalogRawTree,
  CatalogTree,
  Product,
  ProductsSelectionType,
} from '../model/types';
import {CatalogNodeData} from '../model/types';

export function productsListToCatalogTree(
  productsList: Readonly<Product[]>,
): Readonly<CatalogTree> {
  const catalogRawTree: CatalogRawTree = {};

  productsList.forEach((product: Readonly<Product>) => {
    const categoryData: CatalogRawNodeData = catalogRawTree[
      product.category
    ] ?? {
      type: 'category',
      name: product.category,
      total: 0,
      selected: 0,
      nodes: {},
    };
    const brandData: CatalogRawNodeData = categoryData.nodes[product.brand] ?? {
      type: 'brand',
      name: product.brand,
      total: 0,
      selected: 0,
      nodes: {},
    };
    const modelData: CatalogRawNodeData = brandData.nodes[product.model] ?? {
      type: 'model',
      name: product.model,
      total: 0,
      selected: 0,
      nodes: {},
    };

    modelData.nodes[product.variant] = {
      type: 'variant',
      name: product.variant,
      total: product.total,
      selected: 0,
      nodes: {},
    };
    modelData.total += product.total;
    brandData.nodes[product.model] = modelData;
    brandData.total += product.total;
    categoryData.nodes[product.brand] = brandData;
    categoryData.total += product.total;
    catalogRawTree[product.category] = categoryData;
  });
  return fromJS(catalogRawTree, function (key, value, path) {
    if (isKeyed(value) && (!path?.length || key === 'nodes')) {
      return value.toMap();
    }
    return isKeyed(value) ? value.toObject() : value.toList();
  }) as Readonly<CatalogTree>;
}

export function setNodeSelection({
  selected,
  node,
}: {
  selected: number;
  node: CatalogNodeData;
}): CatalogNodeData {
  if (node.nodes.size) {
    return {
      ...node,
      selected,
      nodes: node.nodes.map((subNode: CatalogNodeData) =>
        setNodeSelection({selected, node: subNode}),
      ),
    };
  }
  return {
    ...node,
    selected,
  };
}

export function toggleNodeSelection({
  keyPath,
  node,
  weight,
}: {
  keyPath: Array<string | undefined>;
  node: CatalogNodeData;
  weight: number;
}): CatalogNodeData {
  if (!keyPath.length || !keyPath[0]) {
    return setNodeSelection({selected: node.selected ? 0 : weight, node});
  } else {
    const key = keyPath[0];
    const subNode = node.nodes.get(key);
    if (subNode) {
      const newNodes = node.nodes.set(
        key,
        toggleNodeSelection({
          keyPath: keyPath.slice(1),
          node: subNode,
          weight,
        }),
      );
      const unselectedNode = newNodes.find((n: CatalogNodeData) => !n.selected);
      return {
        ...node,
        selected: unselectedNode ? 0 : weight,
        nodes: newNodes,
      };
    }
  }
  return node;
}

export function doToggleSelection({
  productsSelectionType,
  catalogTree,
  weight,
}: {
  productsSelectionType: ProductsSelectionType;
  catalogTree: CatalogTree;
  weight: number;
}) {
  const {category, brand, model, variant} = productsSelectionType;
  const catalogData = catalogTree.get(category);
  if (catalogData) {
    return catalogTree.set(
      category,
      toggleNodeSelection({
        keyPath: [brand, model, variant],
        node: catalogData,
        weight,
      }),
    );
  }
  return catalogTree;
}
