import axios from 'axios';
export const login = async (user) => {

    return await axios({
        method: "POST",
        url: '/login',
        data: {
            user
        }
    })

};



export const signup = (user) => {



    return axios({
        method: 'POST',
        url: '/register',
        data: {
            username: user.username,
            password: user.password,
            politicalAffiliation: user.politicalAffiliation
        }

    })
};



export const logout = (user) => (
    // e.preventDefault();


    axios({
        url: '/logout',
        method: 'DELETE',
        data: { user }

    })

)

export const userInfo = (userId) => (
    axios({
        url: `/user/${userId}`,
        method: "GET",
        data: {
            comments: "",

        }
    })
)