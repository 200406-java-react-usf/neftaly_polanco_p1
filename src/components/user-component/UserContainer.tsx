import { IState } from '../../reducers';
import { loginAction } from '../../actions/login-action';
import UserComponent from './UserComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.register.errorMessage
        
    }
}

const mapDispatchToProps = {   
     
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
