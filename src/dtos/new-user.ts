export class NewUser {

    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    role_name: string;
    
    
    constructor(
        un: string,
        pw: string,
        fn: string, 
        ln: string, 
        email: string,
        role: string
        ) 
    {
        this.username = un;
        this.password = pw;
        this.first_name = fn;
        this.last_name = ln;
        this.email = email;
        this.role_name = role;
       
    }
}