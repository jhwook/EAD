import { Strategy } from 'passport-jwt';
import { User } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { Payload } from './jwt.payload';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<User>);
    validate(payload: Payload): Promise<User & {
        _id: any;
    }>;
}
export {};
