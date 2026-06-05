export interface User {
    id: number;
    employeeId: string;
    username: string;
    email:string
    password?: string;
    name: string;
    role: 'admin' | 'user';
}