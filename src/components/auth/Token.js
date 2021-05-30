
//based on localStorage
class Token {

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


export default Token
