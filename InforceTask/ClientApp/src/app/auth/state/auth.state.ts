import { User } from "src/app/global/models/user";

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};
