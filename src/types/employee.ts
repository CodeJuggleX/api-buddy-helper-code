export interface Position {
  id: number;
  title: string;
}

export interface Employee {
  id: number;
  surname: string;
  name: string;
  last_name: string;
  image: string;
  full_path_image: string;
  work_phone_num: string;
  personal_phone_num: string;
  email: string;
  position: Position;
  department: string;
  room_number: string;
  full_name: string;
  order: number;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  password_confirm: string;
  employee_id: number;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  account: {
    id: number;
    username: string;
    [key: string]: any;
  };
}

export interface RegisterResponse {
  message: string;
  account: {
    id: number;
    username: string;
    employee_id: number;
  };
}
