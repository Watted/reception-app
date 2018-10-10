const url = "http://10.0.0.58:8080";
export function getIPForDeleteUser() {
    return url+"/users/delete/";
};

export function getIPForGetAllUsers() {
    return url+'/users/all';
};

export function getIPForSignIn() {
    return url+'/auth/signin/';
};

export function getIPForAddNewTech() {
    return url+'/users/addTech/';
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
