import { Injectable } from '@angular/core';
import { USER_CREDENTIALS } from './constants';
import UserCredentials from './user-credentials';

@Injectable()
export class StorageService {

  constructor() { }

  getUserCredentials(): UserCredentials | null {
    return this.getObject<UserCredentials>(USER_CREDENTIALS);
  }
  
  setUserCredentials(credentials: UserCredentials) {
    localStorage.setItem(USER_CREDENTIALS, JSON.stringify(credentials));
  }
  
  clear() {
    localStorage.clear();
  }

  private getObject<T>(key: string): T | null {
    try {
      return (JSON.parse(localStorage.getItem(key) || '') as T);
    } catch (error) {
      return null;
    }
  }
}
