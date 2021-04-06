import { createContext } from 'react';
import {User} from './generated/graphql';

export const UserContext = createContext<Partial<User>>(null);
