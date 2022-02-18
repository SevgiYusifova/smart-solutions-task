import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './shared/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smart-test';

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    const credentials = this.storageService.getUserCredentials();

    if (credentials) {
      switch (credentials.userType) {
        case 'user':
          this.router.navigate(['user'])
          break;
        case 'admin':
          this.router.navigate(['admin'])
          break;
      }
    } else this.router.navigate(['auth']);

  }
}
