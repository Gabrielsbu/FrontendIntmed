import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-consults',
  templateUrl: './modal-consults.component.html',
  styleUrls: ['./modal-consults.component.css'],
})
export class ModalConsultsComponent implements OnInit {
  selectedValue: string;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
