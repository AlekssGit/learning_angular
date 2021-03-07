import {Component, Input, OnInit} from '@angular/core';
import {Dog} from '../dog';
// import {DOGS} from '../mock_dogs';
import { DogService} from '../dog.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {
  dogs: Dog[] = [];

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
    this.getDogs();
  }

  getDogs(): void {
    this.dogService.getDogs()
      .subscribe(dogs => this.dogs = dogs);
  }

  add(name: string, character: string): void {
    name = name.trim();
    character = character.trim();
    if (!name) { return; }
    this.dogService.addDog({ name, character } as Dog)
      .subscribe( dog => {
        this.dogs.push(dog);
      });
  }

  delete(dog: Dog): void {
    this.dogs = this.dogs.filter(h => h !== dog);
    this.dogService.deleteDog(dog).subscribe();
  }
}
