import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent {

constructor(private dataService: DataService){}

handlerKeyupEvent(event: KeyboardEvent): void {
  const dataValue = (event.target as HTMLInputElement).value
    this.dataService.raiseDataKeyupEvent(dataValue)
  }
}
