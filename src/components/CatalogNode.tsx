import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './styles/catalogNodeStyles';
import {toDisplayValue} from './utils';
import {SvgIcon, SvgIconNames} from './SvgIcon/SvgIcon';
import {CHECK_BOX_SIZE} from './constants';
import {COLORS} from '../constants/colors';
import type {CatalogNodeData} from '../model/types';

export type Props = {
  nodeData: Readonly<CatalogNodeData>;
  onToggleSelected: (name: string, ...args: any[]) => void;
};

export function CatalogNode({
  nodeData,
  onToggleSelected: propsOnToggleSelected,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleSelected = useCallback(
    (...args: any[]) => {
      propsOnToggleSelected(
        nodeData.name,
        ...args.filter((value: any) => typeof value === 'string'),
      );
    },
    [nodeData, propsOnToggleSelected],
  );

  const subNodesArray: Readonly<CatalogNodeData>[] = useMemo(() => {
    return [...nodeData.nodes.values()].sort(
      (a: CatalogNodeData, b: CatalogNodeData) => {
        if (a.total < b.total) {
          return -1;
        }
        if (a.total > b.total) {
          return 1;
        }
        return 0;
      },
    );
  }, [nodeData]);

  const toggleExpanded = useCallback(() => {
    if (subNodesArray.length) {
      setIsExpanded((currentIsExpanded: boolean) => !currentIsExpanded);
    }
  }, [subNodesArray]);

  const subtitle = useMemo(() => {
    switch (nodeData.type) {
      case 'model':
      case 'variant': {
        return `${toDisplayValue(nodeData.total)} devices`;
      }
      case 'brand': {
        const fistSubNode: Readonly<CatalogNodeData> = subNodesArray[0];
        const firstPart = `${toDisplayValue(fistSubNode.total)} ${
          fistSubNode.name
        }`;
        return subNodesArray.length > 1
          ? `${firstPart} and ${toDisplayValue(
              nodeData.total - fistSubNode.total,
            )} other models`
          : firstPart;
      }
      case 'category': {
        return subNodesArray
          .map(
            (subNode: Readonly<CatalogNodeData>) =>
              `${toDisplayValue(subNode.total)} ${subNode.name} devices`,
          )
          .join(', ');
      }
    }
  }, [subNodesArray, nodeData]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.checkboxContainer} onPress={onToggleSelected}>
          {nodeData.selected ? (
            <SvgIcon
              name={SvgIconNames.Checkmark}
              size={CHECK_BOX_SIZE - CHECK_BOX_SIZE / 5}
              color={COLORS.black}
            />
          ) : null}
        </Pressable>
        <Pressable style={styles.headerTextContainer} onPress={toggleExpanded}>
          <Text style={styles.headerText}>{nodeData.name}</Text>
        </Pressable>
      </View>
      {!isExpanded ? (
        <Pressable style={styles.subtitleContainer} onPress={toggleExpanded}>
          <Text numberOfLines={2} style={styles.subtitleText}>
            {subtitle}
          </Text>
        </Pressable>
      ) : (
        <View>
          {subNodesArray.map((categoryData: Readonly<CatalogNodeData>) => (
            <CatalogNode
              key={categoryData.name}
              nodeData={categoryData}
              onToggleSelected={onToggleSelected}
            />
          ))}
        </View>
      )}
    </View>
  );
}
