import { connect } from 'react-redux'
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user'

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  isUserLoggedIn: isUserLoggedIn(state),
})

export default connect(mapStateToProps)
