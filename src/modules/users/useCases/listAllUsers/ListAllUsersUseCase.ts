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

    if (!userExists) {
      throw new Error("User does not exists");
    }

    const isAdmin = userExists.admin;

    if (!isAdmin) {
      throw new Error("This user has no admin privileges access users list");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
