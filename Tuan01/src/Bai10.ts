// 10. Create a class Account with public, private and readonly fields.

class Account {
    private username: string;
    public phone: string;
    readonly email: string;

    constructor(username: string, phone: string, email: string){
        this.username = username;
        this.phone = phone;
        this.email = email;
    }
}