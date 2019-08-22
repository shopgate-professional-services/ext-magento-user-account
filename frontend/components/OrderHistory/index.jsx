import React from 'react';
import PropTypes from 'prop-types';
import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import I18n from '@shopgate/pwa-common/components/I18n';
import { withNavigation } from '@shopgate/engage/core';
import Icon from '@shopgate/pwa-ui-shared/icons/BoxIcon';
import connect from '../../connector';
import { showOrderHistory } from '../../config';

/**
 * OrderHistory
 * @param {Object} props Props
 * @returns {JSX}
 */
class OrderHistory extends React.Component {
  /**
   * Fetch the order history url and redirect
   */
  handleClick = () => {
    new PipelineRequest('shopgate.checkout.getUrl').dispatch().then((response) => {
      if (response.url) {
        this.props.historyPush(`${response.url}module/sales/controller/order/action/history`);
      }
    });
  };

  /**
   * The render method
   * @return {JSX}
   */
  render() {
    const {
      isUserLoggedIn,
      Item,
    } = this.props;

    if (!showOrderHistory || !isUserLoggedIn) {
      return null;
    }

    return (
      <Item
        onClick={this.handleClick}
        label="navigation.my_orders"
        icon={Icon}
      >
        <I18n.Text string="navigation.my_orders" />
      </Item>
    );
  }
}

OrderHistory.propTypes = {
  historyPush: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  Item: PropTypes.func.isRequired,
};

export default connect(withNavigation(OrderHistory));
