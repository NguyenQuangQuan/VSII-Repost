import React, { useEffect } from 'react';

// material-ui
import { TreeItem as MuiTreeItem, TreeItemProps } from '@mui/lab';
import { Checkbox, FormControlLabel } from '@mui/material';

// project imports
import { ITreeItem } from 'types';

// third party
import { useIntl } from 'react-intl';

interface ITreeItemProps {
    list: ITreeItem;
    selected: string[];
    setSelected: React.Dispatch<string[]>;
    treeItemProps?: TreeItemProps;
}

const TreeItem = (props: ITreeItemProps) => {
    const { list, selected, setSelected, treeItemProps } = props;
    const intl = useIntl();

    const selectedValue = React.useMemo(() => new Set(selected), [selected]);

    const parentMap = React.useMemo(() => {
        return goThroughAllNodes(list as ITreeItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);

    function goThroughAllNodes(nodes: ITreeItem, map: Record<string, any> = {}) {
        if (!nodes.children) {
            return null;
        }

        map[nodes.value] = getAllChild(nodes).splice(1);

        for (let childNode of nodes.children) {
            goThroughAllNodes(childNode, map);
        }

        return map;
    }

    function getAllChild(childNode: ITreeItem | null, collectedNodes: any[] = []) {
        if (childNode === null) return collectedNodes;

        collectedNodes.push(childNode.value);

        if (Array.isArray(childNode.children)) {
            for (const node of childNode.children) {
                getAllChild(node, collectedNodes);
            }
        }

        return collectedNodes;
    }

    const getChildById = (nodes: ITreeItem, id: string) => {
        let array: string[] = [];
        let path: string[] = [];

        // recursive DFS
        function getNodeById(node: ITreeItem, id: string, parentsPath: string[]): any {
            let result = null;

            if (node.value === id) {
                return node;
            } else if (Array.isArray(node.children)) {
                for (let childNode of node.children) {
                    result = getNodeById(childNode, id, parentsPath);

                    if (!!result) {
                        parentsPath.push(node.value);
                        return result;
                    }
                }

                return result;
            }

            return result;
        }

        const nodeToToggle = getNodeById(nodes, id, path);

        return { childNodesToToggle: getAllChild(nodeToToggle, array), path };
    };

    function getOnChange(checked: boolean, nodes: ITreeItem) {
        const { childNodesToToggle, path } = getChildById(list, nodes.value);

        let array = checked
            ? [...selected, ...childNodesToToggle]
            : selected.filter((value) => !childNodesToToggle.includes(value)).filter((value) => !path.includes(value));

        array = array.filter((v, i) => array.indexOf(v) === i);

        setSelected(array);
    }

    const renderTree = (nodes: ITreeItem) => {
        const allSelectedChildren = parentMap![nodes.value]?.every((childNodeId: string) => selectedValue.has(childNodeId));
        const checked = selectedValue.has(nodes.value) || allSelectedChildren || false;
        const indeterminate = parentMap![nodes.value]?.some((childNodeId: string) => selectedValue.has(childNodeId)) || false;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (allSelectedChildren && !selectedValue.has(nodes.value)) {
                setSelected([...selected, nodes.value]);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selected]);

        return (
            <MuiTreeItem
                key={nodes.value}
                nodeId={nodes.value}
                {...treeItemProps}
                label={
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                size="small"
                                sx={{ p: '3px' }}
                                indeterminate={!checked && indeterminate}
                                onChange={(event) => getOnChange(event.currentTarget.checked, nodes)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        }
                        label={<>{intl.formatMessage({ id: nodes.name })}</>}
                        key={nodes.value}
                    />
                }
            >
                {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
            </MuiTreeItem>
        );
    };

    return renderTree(list);
};

export default TreeItem;
