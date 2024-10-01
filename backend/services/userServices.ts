import { User } from "../models/user";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import * as userDAL from "../dal/userDAL";
import { log } from "console";


export const createUser = async (username: string, password: string): Promise<User> => {
    const users: User[] = await userDAL.getUsers();
    console.log(users)
    const passwordHash: string = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: uuid(),
        username,
        passwordHash,
    }
    users.push(newUser);
    await userDAL.saveUsers(users)
    return newUser;
}

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
    const users = await userDAL.getUsers();
    const user = users.find(currentUser => currentUser.username === username);
    
    if (user && await bcrypt.compare(password, user.passwordHash)) {
        return user;
    }
    return null;

}