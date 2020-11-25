export interface DemoFormValues {
  email: string;
  remember: boolean;
  password: string;
  code?: string;
  message?: string;
  alpha_numeric?: string;
  is_url?: string;
}

export interface OtherProps {
  message: string;
  link: any;
}

export interface DemoFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}
