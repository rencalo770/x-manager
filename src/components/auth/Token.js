
//based on localStorage
class AppToken {

    setToken = (username, token) =>{
        localStorage.setItem('x_manager_username', username);
        localStorage.setItem('x_manager_token', token);
    }

    delToken = () => {
        localStorage.removeItem('x_manager_username');
        localStorage.removeItem('x_manager_token');
    };


    checkUsernameAndToken = () => {
        let username = localStorage.getItem('x_manager_username');
        let token = localStorage.getItem('x_manager_token');
        return username != null && username !== '' && token != null && token !== '';
    }

    getUsername = () => {
        return localStorage.getItem('x_manager_username')
    }

}

const token = new AppToken()

export default token
