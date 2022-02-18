import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  handleClick() {
    this.storageService.clear();
    this.router.navigate(['../auth']);
  }
}
