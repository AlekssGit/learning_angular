import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Dog } from './dog';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  createDb() {
    const dogs = [
      {id: 10, name: 'Peddy', character: 'calm'},
      {id: 11, name: 'Teddy', character: 'happy'},
      {id: 12, name: 'KReddy', character: 'friendly'},
      {id: 13, name: 'SHeddy', character: 'provocative'},
      {id: 14, name: 'Leddy', character: 'helpful'},
      {id: 15, name: 'Beddy', character: 'calm'},
      {id: 16, name: 'Meddy', character: 'stress-resistant'},
      {id: 17, name: 'Neddy', character: 'clever'}
    ];
    return {dogs};
  }

  genId(dogs: Dog[]): number {
    return dogs.length > 0 ? Math.max(...dogs.map(dog => dog.id)) + 1 : 10;
  }
}
