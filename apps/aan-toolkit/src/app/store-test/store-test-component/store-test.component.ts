import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';
import { AppState } from '../state';
import { movieSelectors } from '../selectors/movie.selector';
import { MovieActions } from '../actions/movie.actions';

@Component({
  selector: 'askanative-angulartoolkit-store-test',
  templateUrl: './store-test.component.html',
  styleUrls: ['./store-test.component.scss'],
})
export class StoreTestComponent {
  movies$: Observable<Movie[]>;
  movie$: Observable<Movie>;
  isClicked = false;

  constructor(private store: Store<AppState>) {
    this.movies$ = store.select(movieSelectors.selectItems);
    this.movie$ = store.select(movieSelectors.selectItem, 1);

    store.dispatch(MovieActions.getAll.load({ payload: null }));
  }

  public getById() {
    this.isClicked = true;
    this.store.dispatch(MovieActions.getById.load({ payload: 1 }));
  }
}
