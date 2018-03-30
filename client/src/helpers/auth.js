import { userTypes } from 'src/constants';
import routePaths from 'src/routePaths';

export default {
    redirectUser({ user, history }) {
        switch (user.type) {
            case userTypes.DOCTOR:
            case userTypes.PHARMACIST:
                history.replace(routePaths.patients);
                break;
            case userTypes.PATIENT:
                history.replace(routePaths.prescriptions);
                break;
        }
    }
}
