import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username?: string = '';

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    const creds = this.storageService.getUserCredentials();
    this.username = creds?.username;
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['../auth']);
  }

}
