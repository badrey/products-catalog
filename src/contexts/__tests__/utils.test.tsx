import {
  productsListToCatalogTree,
  setNodeSelection,
  toggleNodeSelection,
} from '../utils';
import {PRODUCTS_LIST} from '../../constants/mock_data';
import {CatalogTree} from '../../model/types';

describe('ProductsContext - utils', () => {
  it('productsListToCatalogTree()', () => {
    // WHEN
    const catalogTree: Readonly<CatalogTree> =
      productsListToCatalogTree(PRODUCTS_LIST);
    // THEN
    expect(catalogTree).toBeDefined();

    expect(catalogTree.size).toBe(3);
    const phoneCategory = catalogTree.get('Phones');
    expect(phoneCategory).toBeDefined();
    expect(phoneCategory?.type === 'category').toBeTruthy();
    expect(phoneCategory?.selected === 0).toBeTruthy();
    expect(phoneCategory?.total ?? 0 > 0).toBeTruthy();
    expect(phoneCategory?.name === 'Phones').toBeTruthy();
    expect(phoneCategory?.nodes?.size === 2).toBeTruthy();
    const appleBrand = phoneCategory?.nodes?.get('Apple');
    expect(appleBrand).toBeDefined();
    expect(appleBrand?.selected === 0).toBeTruthy();
    expect(appleBrand?.total ?? 0 > 0).toBeTruthy();
    expect(appleBrand?.name === 'Apple').toBeTruthy();
    expect(appleBrand?.nodes?.size === 2).toBeTruthy();
    const iphone6Model = appleBrand?.nodes?.get('iPhone 6');
    expect(iphone6Model).toBeDefined();
    expect(iphone6Model?.selected === 0).toBeTruthy();
    expect(iphone6Model?.total ?? 0 > 0).toBeTruthy();
    expect(iphone6Model?.name === 'iPhone 6').toBeTruthy();
    expect(iphone6Model?.nodes?.size === 3).toBeTruthy();
    const variant128GB = iphone6Model?.nodes?.get('128GB');
    expect(variant128GB).toBeDefined();
    expect(variant128GB?.selected === 0).toBeTruthy();
    expect(variant128GB?.total === 207).toBeTruthy();
    expect(variant128GB?.name === '128GB').toBeTruthy();
    expect(variant128GB?.nodes?.size === 0).toBeTruthy();
  });
  it('setNodeSelection()', () => {
    // GIVEN
    const catalogTree: Readonly<CatalogTree> =
      productsListToCatalogTree(PRODUCTS_LIST);
    // WHEN
    const phoneCategory = setNodeSelection({
      selected: 1,
      // @ts-ignore
      node: catalogTree.get('Phones'),
    });
    // THEN
    expect(phoneCategory?.selected === 1).toBeTruthy();
    const appleBrand = phoneCategory?.nodes?.get('Apple');
    expect(appleBrand?.selected === 1).toBeTruthy();
    const iphone6Model = appleBrand?.nodes?.get('iPhone 6');
    expect(iphone6Model?.selected === 1).toBeTruthy();
    const variant128GB = iphone6Model?.nodes?.get('128GB');
    expect(variant128GB?.selected === 1).toBeTruthy();

    // WHEN
    const unselectedPhoneCategory = setNodeSelection({
      selected: 0,
      node: phoneCategory,
    });
    // THEN
    expect(unselectedPhoneCategory?.selected === 0).toBeTruthy();
    const unselectedAppleBrand = unselectedPhoneCategory?.nodes?.get('Apple');
    expect(unselectedAppleBrand?.selected === 0).toBeTruthy();
    const unselectedIphone6Model = unselectedAppleBrand?.nodes?.get('iPhone 6');
    expect(unselectedIphone6Model?.selected === 0).toBeTruthy();
    const unselectedVariant128GB = unselectedIphone6Model?.nodes?.get('128GB');
    expect(unselectedVariant128GB?.selected === 0).toBeTruthy();
  });

  it('toggleNodeSelection()', () => {
    // GIVEN
    const catalogTree: Readonly<CatalogTree> =
      productsListToCatalogTree(PRODUCTS_LIST);
    // WHEN
    const phoneCategory = toggleNodeSelection({
      weight: 1,
      // @ts-ignore
      node: catalogTree.get('Phones'),
      keyPath: ['Apple', 'iPhone 6', '128GB'],
    });
    // THEN
    expect(phoneCategory?.selected === 0).toBeTruthy();
    const appleBrand = phoneCategory?.nodes?.get('Apple');
    expect(appleBrand?.selected === 0).toBeTruthy();
    const iphone6Model = appleBrand?.nodes?.get('iPhone 6');
    expect(iphone6Model?.selected === 0).toBeTruthy();
    const variant128GB = iphone6Model?.nodes?.get('128GB');
    expect(variant128GB?.selected === 1).toBeTruthy();

    // WHEN
    const phoneCategory2 = toggleNodeSelection({
      weight: 1,
      // @ts-ignore
      node: catalogTree.get('Phones'),
      keyPath: ['Apple'],
    });
    const phoneCategory3 = toggleNodeSelection({
      weight: 1,
      // @ts-ignore
      node: phoneCategory2,
      keyPath: ['Samsung'],
    });
    // THEN
    expect(phoneCategory3?.selected === 1).toBeTruthy();
  });
});
