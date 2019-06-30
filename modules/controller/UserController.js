let userOperations = require(__BASE__+"modules/database/accessors/user_operations");
const bcrypt = require('bcrypt');

let getUsers = function(parameters){
    return userOperations.getUsers({phone: parameters.phone, password: parameters.userpass})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
           console.log("Error in get Users: ",error);
        });

};
let getLoggedInUser = function(parameters){
    return userOperations.getUsers({email: parameters.useremail})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};

let registerUser = function(parameters){
    console.log(parameters);
    return userOperations.createUser(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                let p = [];
                return p;

            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};

let updateProfilePic = function(parameters){
    console.log(parameters);

    return userOperations.updateProfilePic(parameters)
        .then(function(data){
            if(data){
                return data;
            }
        }).catch(function(err){
            console.log(err);

        })
}

let getUserFullDetail = function(parameters){
	return userOperations.getUserFullDetail(parameters)
		.then(function(data){
			if(data){
				return data;
			}else{
				throw new Error('No User exists with given useremail');
			}
		}).catch(function(error){
			console.log("Error in get Users: ",error);
		});
};
let getCredit = function(parameters){
    return userOperations.getCredit(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given id');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });
};

let setCredit = function(parameters, credit){
    return userOperations.setCredit(parameters,credit)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given id');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });
};


let removeUser = function (parameters) {
    return userOperations.removeUser(parameters)
        .then(function (data) {
            if(data) return data;
        }).catch(function(err){
            console.log(err);
        })
};


let unfollowUser = function (userId, query,id) {
    return userOperations.unfollowUser({_id: userId},query)
        .then(function (data) {
            let q = {
                $pull:{"follower":userId}
            };
            userOperations.removeFollower({_id:id},q)
                .then(function(data){
                    return data;
                })
        }).catch(function(err){
            console.log(err);
        })
};


let forgotPassword = function (email) {
    return userOperations.getUsers({email:email})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};



let changePassword = function (query,template) {
    template.password = bcrypt.hashSync(template.password, 10);

    return userOperations.changePassword(query,template)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};

module.exports = {
  getUsers:getUsers,
  getUserFullDetail:getUserFullDetail,
  getLoggedInUser:getLoggedInUser,
  registerUser:registerUser,
  updateProfilePic:updateProfilePic,
    unfollowUser:unfollowUser,
    removeUser:removeUser,
    forgotPassword:forgotPassword,
    changePassword:changePassword,
    getCredit:getCredit,
    setCredit:setCredit
};
