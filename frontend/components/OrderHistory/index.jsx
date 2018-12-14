import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import ParsedLink from '@shopgate/pwa-common/components/Router/helpers/parsed-link';
import Icon from '@shopgate/pwa-ui-shared/icons/BoxIcon';
import connect from '../../connector';
import { showOrderHistory } from '../../config';
import styles from './style';

/**
 * OrderHistory
 * @param {Object} props Props
 * @returns {JSX}
 */
class OrderHistory extends React.Component {
  /**
     * The constructor.
     * Sets the initial state from connected props.
     * @param {Object} props The component props.
     */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Fetch the order history url and redirect
   */
  handleClick = () => {
    new PipelineRequest('shopgate.checkout.getUrl').dispatch().then((response) => {
      if (response.url) {
        const link = new ParsedLink(`${response.url}module/sales/controller/order/action/history`);
        link.open();
      }
    });
  }

  /**
   * The render method
   * @return {JSX}
   */
  render() {
    const {
      isUserLoggedIn,
      Item,
      handleClose,
      show,
    } = this.props;

    if (!showOrderHistory || !show || !isUserLoggedIn) {
      return null;
    }

    return (
      <div className={styles.container}>
        <Item
          onClick={this.handleClick}
          close={handleClose}
          title="navigation.my_orders"
          icon={Icon}
        >
          <I18n.Text string="navigation.my_orders" />
        </Item>
      </div>
    );
  }
}

OrderHistory.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  Item: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
};

OrderHistory.defaultProps = {
  handleClose: () => { },
  show: false,
};

export default connect(OrderHistory);
