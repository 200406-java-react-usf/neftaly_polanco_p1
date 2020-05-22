export class Reimbursement {

    id: number;
    amount: number;
    submitted: string;
    resolved: string;
    description: string;
    receipt: string;
    author: string;
    resolver: string;
    reimb_status: string;
    reimb_type: string;
    
    constructor(
        id: number,
        amount: number,
        sub: string,    
        rsvd: string,
        desc: string,
        receipt: string,
        author: string,
        rsvr: string,
        status: string,
        type: string) 
    {
        
        this.id = id;
        this.amount = amount;
        this.submitted = sub;
        this.resolved = rsvd;
        this.description = desc;
        this.receipt = receipt;
        this.author = author;
        this.resolver = rsvr;
        this.reimb_status = status;
        this.reimb_type = type;
    }
}