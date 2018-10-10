import { IAction } from '../types';
import { ILoginComplete, IRole } from '../actions/userActions';

export interface IUser {
  token: string;
  username: string;
  type: -1 | 0 | 1;
  role: number;
  config: {
    lang: string;
  };
}

const lang = process.env.REACT_APP_DEFAULT_LANGUAGE || 'en';

const initState: IUser = {
  token: '', // ''
  username: '',
  type: 0, // -1
  role: 0, // -1
  config: {
    lang,
  },
};

export function getType(role: number) {
  if (role === 0) {
    return -1;
  } else if (role <= 4) {
    return 0;
  } else {
    return 1;
  }
}

const user = (state = initState, action: IAction): IUser => {
  switch (action.type) {
    case 'LOGIN_COMPLETE': {
      let data = action.payload as ILoginComplete & IUser;
      if (data.token === '') {
        data = { ...data, type: -1, role: 0, username: '' };
      } else {
        data = { ...data, type: getType(data.role) };
      }
      delete data.toast;
      return { ...state, ...(data as IUser) };
    }
    case 'CHOOSE_ROLE': {
      const role = action.payload as number;
      return { ...state, role };
    }
    case 'UPDATE_ROLE_COMPLETE': {
      const data = action.payload as IRole;
      const type = getType(data.role);
      return { ...state, type, ...data };
    }
    default:
      return state;
  }
};

export default user;
