const url = "https://18.191.221.188:8443";
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

export const poolData = {
    UserPoolId : 'us-east-2_xJqEhZxoR', // Your user pool id here
    ClientId : '7tb5udokv621igkmivpm23fecn' // Your client id here
};

export const IdentityPoolId = 'us-east-2:cd460c75-032c-41b1-b7eb-221fa9afcc67';


export const tenSeconds = 10000;
