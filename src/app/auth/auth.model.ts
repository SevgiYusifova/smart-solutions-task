export interface RegisterInfo {
    username: string;
    email: string;
    password: string;
    organizationName: string;
    organizationPhone: string;
    organizationAddress: string;
}

export interface LoginInfo {
    username: string;
    password: string;
    userType: 'user' | 'admin';
}