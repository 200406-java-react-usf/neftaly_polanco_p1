export class NewReimbursement {

    amount: number;
    description: string;
    author: string;
    reimb_type: string
    
    constructor(
        amount: number,
        desc: string,
        author: string,
        type: string) 
    {
        this.amount = amount;
        this.description = desc;
        this.author = author;
        this.reimb_type = type;
    }
}