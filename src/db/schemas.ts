import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email({ message: "Correo no es valido." }),
  password: z.string().min(6, { message: "La Contraseña debe tener almenos 8 caracteres." }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: "Email is not valid." }),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, { message: "Password must have at least 8 characters, 1 letter, 1 number, and 1 special character." }),
  confirmPassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, { message: "Password must have at least 8 characters, 1 letter, 1 number, and 1 special character." }),
  firstName: z.string().nonempty({ message: "First name is required." }),
  lastName: z.string().nonempty({ message: "Last name is required." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.", path: ["confirmPassword"], });

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email is not valid." }),
});

const validateCodeSchema = z.object({
  code: z.string().length(4, { message: "Code must be 4 characters." }),
});

const resetPasswordSchema = z.object({
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, { message: "Password must have at least 8 characters, 1 letter, 1 number, and 1 special character." }),
  confirmPassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, { message: "Password must have at least 8 characters, 1 letter, 1 number, and 1 special character." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.", path: ["confirmPassword"], });




const formHomeSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required.' }),
  email: z.string().nonempty({ message: 'Email is required.' }).email({ message: 'Email is not valid.' }),
  title: z.string().nonempty({ message: 'Title is required.' }),
  message: z.string().nonempty({ message: 'Message is required.' }),
  saveinfo: z.boolean(),
});

const guestsSchema = z.object({
  adults: z.number().min(1, { message: "There must be at least one adult." }),
  kids: z.number().min(0, { message: "Number of kids cannot be negative." }),
  babys: z.number().min(0, { message: "Number of babies cannot be negative." }),
});

const searchSchema = z.object({
  startDate: z.date({ invalid_type_error: "Start date must be a valid date." }),
  endDate: z.date({ invalid_type_error: "End date must be a valid date." }),
  guests: guestsSchema,
}).refine((data) => data.startDate < data.endDate, {
  message: "Start date must be before end date.",
  path: ["endDate"],
});


const userSchema = z.object({
  email: z.string().email({ message: "Email is not valid." }),
  firstName: z.string().nonempty({ message: "First name is required." }),
  lastName: z.string().nonempty({ message: "Last name is required." }),
  phoneNumber: z.string().nonempty({ message: "Phone number is required." }),
});

export {formHomeSchema, guestsSchema, searchSchema, signInSchema, signUpSchema, forgotPasswordSchema, validateCodeSchema, resetPasswordSchema, userSchema};
