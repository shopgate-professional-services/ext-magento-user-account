import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest'
import React from 'react'
import PropTypes from 'prop-types'
import I18n from '@shopgate/pwa-common/components/I18n'
import Icon from '@shopgate/pwa-ui-shared/icons/BoxIcon'
import connect from '../../connector'
import { showOrderHistory } from '../../config'

/**
 * OrderHistory
 * @param {Object} props Props
 * @returns {JSX}
 */
class OrderHistory extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      url: null,
    }
  }

  componentDidMount () {
    if (this.props.isUserLoggedIn) {
      this.fetchUrl()
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.isUserLoggedIn && this.props.isUserLoggedIn) {
      this.fetchUrl()
    }
  }

  fetchUrl () {
    if (!this.props.show || this.state.url) {
      return
    }

    new PipelineRequest('shopgate.checkout.getUrl').dispatch().then((response) => {
      if (response.url) {
        this.setState({ url: response.url + '?module=sales&controller=order&action=history' })
      }
    })
  }

  render () {
    const {
      isUserLoggedIn,
      Item,
      handleClose,
      show,
    } = this.props

    if (!showOrderHistory || !show || !isUserLoggedIn || !this.state.url) {
      return null
    }

    return (
      <Item
        close={handleClose}
        link={this.state.url}
        title="navigation.my_orders"
        icon={Icon}
      >
        <I18n.Text string="navigation.my_orders"/>
      </Item>
    )
  }
}

OrderHistory.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  Item: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
}

OrderHistory.defaultProps = {
  handleClose: () => {},
  show: true,
}

export default connect(OrderHistory)
