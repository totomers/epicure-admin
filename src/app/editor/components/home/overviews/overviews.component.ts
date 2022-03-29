import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { slideAnimation, slideInAnimation } from 'src/app/utils/animations';

@Component({
  selector: 'app-overviews',
  animations: slideAnimation,
  templateUrl: './overviews.component.html',
  styleUrls: ['./overviews.component.scss'],
})
export class OverviewsComponent implements OnInit {
  isShown = false;
  count: { restaurants: number; dishes: number; chefs: number };
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getCollectionCount().then((count) => {
      this.count = count as {
        restaurants: number;
        dishes: number;
        chefs: number;
      };
    });
    setTimeout(() => {
      this.isShown = true;
    }, 0);
  }
}
