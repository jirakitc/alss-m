export class User {
    id: number;
    firstname: string;
    lastname: string;
    user_id: number;
    type: number;
    email: string;
    username: string;
    exp: number;
}

export enum Role {
    Student = 1,
    Teacher = 2,
    Admin = 3,
}

export class Room {
    id: number;
    class_id: string;
    class_name: string;
    class_Subject: string;
    teacher_name: string;
    total_student: number;
}

export class Subject {
    id : number;
    subject_id: string;
    subject_Name: string;
    subject_Description: string;
}

export class classStu {
    id: number;
    class_id: string;
    class_name: string;
    user_id: string;
}

export interface TokenPayload {
    id: number;
    firstname: string;
    lastname: string;
    user_id: number;
    email: string;
    password: string;
    type: string;
  }