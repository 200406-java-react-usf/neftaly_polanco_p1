import { IState } from '../../reducers';
import AddReimbursementComponent from './AddReimbursementComponent';
import { connect } from 'react-redux';
import { addReimbursementAction } from '../../actions/addReimbursement-action';

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.addReimbursement.errorMessage
    }
}

const mapDispatchToProps = {
    addReimbursementAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReimbursementComponent);
