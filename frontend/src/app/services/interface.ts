export class User {
    id: number;
    user_id: number;
    firstname: string;
    lastname: string;
    age: number;
    type: number;
    email: string;
    username: string;
}

export class Room {
    id: number;
    class_id: number;
    class_name: string;
    class_Subject: string;
    teacher_name: string;
    total_student: number;
}

export class Subject {
    id : number;
    subject_id: number;
    subject_Name: string;
    subject_Description: string;
}

export class classStu {
    id: number;
    class_id: number;
    class_name: string;
    user_id:number;
}