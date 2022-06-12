import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {};

    async findAllUsers(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findUserById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id);

        if(!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return user;
    }

    async createUser(data: CreateUserInput): Promise<UserEntity> {
        const user = this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user);

        if(!userSaved) {
            throw new InternalServerErrorException('Ocorreu um erro para criar um usuário.')
        }

        return userSaved;
    }

    async updateUser(id: string, data: UpdateUserInput): Promise<UserEntity> {
        const user = await this.findUserById(id);

        await this.userRepository.update(user, { ...data });

        const userUpdate = this.userRepository.create({ ...user, ...data });

        return userUpdate;
    }

    async deleteUser(id: string): Promise<boolean> {
        const user = await this.findUserById(id);

        const deleted = await this.userRepository.delete(user);

        if(deleted) {
            return true;
        }

        return false;
    }
}
