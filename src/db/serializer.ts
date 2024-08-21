import { User  } from "../lib/interfaces"

export const serializeUser = (data:any):User|null => {
  let user:User | null = null;

  user = {
    id: data.user.id,
    email: data.user.email,
    firstName: data.user.firstName,
    lastName:data.user.lastName,
    role: data.user.role,
    phoneNumber: data.user.phoneNumber,
    token:data.token
  };

  return user;

}
