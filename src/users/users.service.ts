import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { promisify } from 'util';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async create(input: CreateUserDto) {
    const userAlreadyExists = await this.userModel.findOne({
      $or: [
        {
          email: input.email,
        },
        {
          rut: input.rut,
        }
      ]
    });

    if (userAlreadyExists) {
      throw new ConflictException(`Ya existe un usuario con el rut / email ingresado`);
    }

    const hashedPassword: string = await bcrypt.hash(input.password, 10);

    const user = await this.userModel.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: hashedPassword,
      profession: input.profession,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      email,
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
