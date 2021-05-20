import UserService from '../Services/UserServiceClient';

const userService = UserService.instance;

export const findUser = (dispatch, give_user) => {
    userService.findCurrentUser(give_user)
        .then((user) => {
            console.log("user",user);
            if (user === 'ANONYMOUS_USER') {
                dispatch({
                             type: 'ANONYMOUS_USER',
                    currentUser: user
                         });
            } else {
                dispatch({
                             type: user.userType,
                             currentUser: user
                         });
            }
        })
        .catch((error)=>{
            console.log("error : ", error)
                dispatch({
                    type: 'ANONYMOUS_USER'
                });
            });
};

export const logOut = (dispatch) => {
    userService.userLogOut()
        .then(() => {
            dispatch({
                         type: 'LOG_OUT'
                     });
        });

};