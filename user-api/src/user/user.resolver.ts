import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
    constructor(private UserService: UserService) {}

    @Query(() => [UserEntity])
    async users(): Promise<UserEntity[]> {
        const users = await this.UserService.findAllUsers();
        return users;
    }

    @Query(() => UserEntity)
    async user(@Args('id') id: string): Promise<UserEntity> {
        const user = await this.UserService.findUserById(id);
        return user;
    }

    @Mutation(() => UserEntity)
    async createUser(@Args('data') data: CreateUserInput): Promise<UserEntity> {
        const user = await this.UserService.createUser(data);
        return user;
    }

    @Mutation(() => UserEntity)
    async updateUser(
        @Args('id') id: string, 
        @Args('data') data: UpdateUserInput
    ): Promise<UserEntity> {
        const user = this.UserService.updateUser(id, data);
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('id') id: string): Promise<boolean> {
        const deleted = await this.UserService.deleteUser(id);
        return deleted;
    }
}
