import { CreateUserDTO } from '..';

export type UpdateUserDTO = Partial<CreateUserDTO> & { id: string };
