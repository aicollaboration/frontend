export class UserModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.createdAt = data.createdAt;
    }
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}