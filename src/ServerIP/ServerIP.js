const url = "http://18.191.221.188:8080";
export function getIPForDeleteUser() {
    return url+"/users/delete/";
};

export function getIPForGetAllUsers() {
    return url+'/users/all';
};

export function getIPForSignIn() {
    return url+'/auth/validate/';
};

export function getIPForAddNewTech() {
    return url+'/auth/createUser/';
};

export function getIPForGetAllServers() {
    return url+'/servers/all';
};

export function getIPForSendAssignToTech() {
    return url+'/users/assign/';
};

export function getIPForTechProblem() {
    return url+'/users/';
};

export function getIPForUpdateTechProblem() {
    return url+'/users/updateKiosk/';
};

export function getIPForGetKioksForServer() {
    return url+'/servers/GetServer/';
};


export const tenSeconds = 10000;
