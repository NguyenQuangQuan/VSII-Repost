import React from 'react';

// material-ui
import { TreeView as MuiTreeView, TreeViewProps } from '@mui/lab';

// project-imports
import { TREEITEM_DEFAULT_VALUE } from 'constants/Common';

// asssets
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ITreeViewProps {
    children: JSX.Element;
    defaultExpanded: string[];
    treeViewProps: TreeViewProps;
}

const TreeView = (props: ITreeViewProps) => {
    const { treeViewProps, children, defaultExpanded } = props;

    return (
        <MuiTreeView
            sx={{
                '& .MuiTreeItem-content': {
                    height: '30px !important',
                    margin: '2.5px 0'
                }
            }}
            defaultExpanded={[TREEITEM_DEFAULT_VALUE.value, ...defaultExpanded]}
            {...treeViewProps}
        >
            {children}
        </MuiTreeView>
    );
};

TreeView.defaultProps = {
    defaultExpanded: [TREEITEM_DEFAULT_VALUE.value],
    treeViewProps: {
        defaultCollapseIcon: <ExpandMoreIcon />,
        defaultExpandIcon: <ChevronRightIcon />
    }
};

export default TreeView;
