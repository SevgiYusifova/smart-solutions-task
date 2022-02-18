import { Injectable } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { LoginInfo, RegisterInfo } from './auth.model';

@Injectable()
export class AuthService {

  constructor(private storageService: StorageService) { }

  login(loginInfo: LoginInfo) {
    // send request to backend

    this.storageService.setUserCredentials({ userType: loginInfo.userType, username: loginInfo.username });
  }

  register(registerInfo: RegisterInfo) {
    // send request to backend

    this.storageService.setUserCredentials({ userType: 'admin', username: registerInfo.username });
  }
}
