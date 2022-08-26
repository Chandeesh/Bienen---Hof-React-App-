import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const Mails = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div class="container">
            <div className="form-group" style={{ paddingTop: '15px' }}>
                <div className="alert alert-success" role="alert">
                    Coming Soon!!
                </div>
            </div>
        </div>
    );
};
export default Mails;