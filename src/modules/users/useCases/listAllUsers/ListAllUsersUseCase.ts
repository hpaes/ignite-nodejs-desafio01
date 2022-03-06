import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | string[];
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const userExists = users.find((u) => u.id === user_id);

    const isAdmin = userExists.admin;

    if (!userExists) {
      throw new Error("User does not exists");
    }

    if (!isAdmin) {
      throw new Error("This user has no admin privileges");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
