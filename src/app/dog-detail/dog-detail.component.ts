import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DogService } from '../dog.service';
import { Dog } from '../dog';


@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})
export class DogDetailComponent implements OnInit {
   dog!: Dog;

  constructor(
    private route: ActivatedRoute,
    private dogService: DogService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDog();
  }

  getDog(): void {
     // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.dogService.getDog(id)
      .subscribe(dog => this.dog = dog);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    this.dogService.updateDog(this.dog)
      .subscribe( () => this.goBack());
  }
}
