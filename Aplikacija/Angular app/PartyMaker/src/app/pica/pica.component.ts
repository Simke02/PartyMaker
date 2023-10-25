import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-pica',
  templateUrl: './pica.component.html',
  styleUrls: ['./pica.component.css']
})
export class PicaComponent implements OnInit {
  
  constructor(public router: Router, private sharedService: SharedServiceService) {}

  ngOnInit() {
    const headerT = 'Pića';
    this.sharedService.updatePropertyValue(headerT);
  }
}
