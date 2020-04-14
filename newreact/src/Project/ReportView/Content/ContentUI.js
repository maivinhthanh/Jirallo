import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import _ from 'lodash'

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  // selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
  },
  
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelInfo, color, bgColor, nodeId, ...other } = props;
  
  return (
    <TreeItem 
      label={
        <div className={classes.labelRoot}>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        // selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      nodeId={nodeId}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  nodeId: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function ContentUI({selectContent, report}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
    
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    selectContent(nodeIds)
  };
  return (
    <TreeView
      className={classes.root}
      // defaultExpanded={['1']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 20 }} />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      
      <StyledTreeItem nodeId="Cover" labelText="Cover"  />
      <StyledTreeItem nodeId="Preface" labelText="Preface" />
      <StyledTreeItem nodeId="Introduce" labelText="Introduce" >
        <StyledTreeItem
          nodeId="Urgency"
          labelText="Urgency"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="Target"
          labelText="Target"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="Structure"
          labelText="Structure"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="Theory" labelText="Theory" />
      <StyledTreeItem nodeId="Survey" labelText="Survey" >
        {
          _.map(report.survey, (item, index)=>{
            return (
              <StyledTreeItem
                nodeId={item._id} labelText={item.name}>

              </StyledTreeItem>
            )
          })
        }
      </StyledTreeItem>
      <StyledTreeItem nodeId="Diagram" labelText="Diagram" />
      <StyledTreeItem nodeId="Usecase" labelText="Usecase" />
      <StyledTreeItem nodeId="DescriptWebsite" labelText="Descript Website" />
      <StyledTreeItem nodeId="Database" labelText="Database" >
        
      </StyledTreeItem>
      <StyledTreeItem nodeId="Interface" labelText="Interface" />
      <StyledTreeItem nodeId="Setting" labelText="Setting" />
      <StyledTreeItem nodeId="Testing" labelText="Testing" />
      <StyledTreeItem nodeId="Conclude" labelText="Conclude" >
        <StyledTreeItem
          nodeId="Result"
          labelText="Result"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="Advantages"
          labelText="Advantages"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="Defect"
          labelText="Defect"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="Development"
          labelText="Development"
          color="#e3742f"
          bgColor="#fcefe3"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="References" labelText="References" />
    </TreeView>
  );
}
