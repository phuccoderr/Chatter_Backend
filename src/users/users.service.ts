import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectPinoLogger(UsersService.name) private readonly logger: PinoLogger,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const hashPassword = await bcrypt.hash(createUserInput.password, 10);
    createUserInput.password = hashPassword;

    const newUser = new this.userModel({
      ...createUserInput,
      _id: new Types.ObjectId(),
    });

    await newUser.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    const passIsValid = await bcrypt.compare(password, user.password);

    if (user && passIsValid) {
      return user;
    } else {
      throw new UnauthorizedException('Credentials are not valid!');
    }
  }
}
