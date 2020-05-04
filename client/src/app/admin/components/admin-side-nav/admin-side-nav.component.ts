import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {
  isOpen = true;
  constructor() { }

  ngOnInit() {
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
