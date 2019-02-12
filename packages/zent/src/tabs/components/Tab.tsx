import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import noop from 'lodash-es/noop';

export interface ITabProps {
  prefix?: string;
  actived?: boolean;
  disabled?: boolean;
  id?: string | number;
  minWidth?: string;
  onSelected(id: string | number): void;
  onDelete(id: string | number): void;
  candel?: boolean;
  uniqueId?: number;
}

class Tab extends Component<ITabProps> {
  static propTypes = {
    prefix: PropTypes.string,
    actived: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.string,
    onSelected: PropTypes.func,
    onDelete: PropTypes.func,
    candel: PropTypes.bool,
    uniqueId: PropTypes.number,
  };

  static defaultProps = {
    prefix: 'zent',
    actived: false,
    disabled: false,
    id: '',
    minWidth: '',
    onSelected: noop,
    onDelete: noop,
    candel: false,
  };

  onDel(e) {
    e.stopPropagation();
    let { onDelete, id } = this.props;
    onDelete(id);
  }

  onClick() {
    let { onSelected, id, actived, disabled } = this.props;
    if (!actived && !disabled) {
      onSelected(id);
    }
  }

  renderDelOperater() {
    let { candel, prefix } = this.props;
    if (candel) {
      return (
        <span
          className={`${prefix}-tabs-tab-inner-del`}
          onClick={this.onDel.bind(this)}
        >
          ✕
        </span>
      );
    }
    return '';
  }

  render() {
    let props = this.props;
    let { prefix, minWidth } = props;
    let classes = `${prefix}-tabs-tab`;
    if (props.actived) {
      classes += ` ${prefix}-tabs-actived`;
    }
    if (props.disabled) {
      classes += ` ${prefix}-tabs-disabled`;
    }
    let style: React.CSSProperties = {};
    if (minWidth) {
      style.minWidth = minWidth;
    }
    return (
      <div
        role="tab"
        aria-labelledby={`${props.prefix}-tabpanel-${props.uniqueId}-${
          props.id
        }`}
        className={classes}
        aria-disabled={props.disabled}
        aria-selected={props.actived}
        onClick={this.onClick.bind(this)}
        style={style}
      >
        <div className={`${prefix}-tabs-tab-inner`}>
          {this.renderDelOperater()}
          {props.children}
        </div>
      </div>
    );
  }
}

export default Tab;