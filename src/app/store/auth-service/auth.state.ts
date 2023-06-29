import { Token } from 'src/app/interfaces/token.interface';
export interface AuthState {
  isAuth: boolean;
  token: Token;
  login: string;
}

export const initialAuthState: AuthState = {
  isAuth: false,
  token: {
    token: '',
  },
  login: '',
};
