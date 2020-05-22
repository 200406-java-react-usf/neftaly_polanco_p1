import { IState } from '../../reducers';
import HomeComponent from './HomeComponent';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions/logout-action';


const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser
    }
}

const mapDispatchToProps = {  
    logoutAction  
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);