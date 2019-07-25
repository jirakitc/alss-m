export class User {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    type: number;
    email: string;
    username: string;
}

export class Room {
    class_id: number;
    class_name: string;
    class_Subject: string;
    teacher_name: string;
    total_student: number;
}

export class Subject {
    subject_id: number;
    subject_Name: string;
    subject_Description: string;
}

export class classStu {
    cs_list: number;
    class_id: number;
    class_name: string;
    user_id:number;
}