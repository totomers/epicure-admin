import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { AccountService } from '../services/account.service';
import { slideInAnimation } from '../utils/animations';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  animations: [slideInAnimation],
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private accountService: AccountService,
    private contexts: ChildrenOutletContexts
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.accountService.logoutServer();
  }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
