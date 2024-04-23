import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { MovieActions } from './../actions/movie.actions';
import { StoreActionSingle } from '@askanative-angulartoolkit/shared/store';
import { ErrorModel } from '@askanative-angulartoolkit/shared/common';

@Injectable()
export class MovieEffects {
  public movies: Movie[];
  constructor(private actions$: Actions) {
    this.movies = new Array<Movie>();

    let movie = new Movie();
    movie.id = 1;
    movie.name = 'Hulk';
    this.movies.push(movie);

    movie = new Movie();
    movie.id = 2;
    movie.name = 'Avengers';
    this.movies.push(movie);
  }

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getAll.load),
      switchMap(() =>
        of(this.movies).pipe(
          map((result: Movie[]) =>
            MovieActions.getAll.success({ payload: result })
          ),
          catchError((error: ErrorModel) => {
            return of(MovieActions.getById.failure({ payload: error }));
          })
        )
      )
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getById.load),
      exhaustMap((action: StoreActionSingle<number>) => {
        return of(
          this.movies.firstOrDefault((x) => x.id === action.payload)
        ).pipe(
          map((result: Movie) =>
            MovieActions.getById.success({ payload: result })
          ),
          catchError((error: ErrorModel) => {
            return of(MovieActions.getById.failure({ payload: error }));
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.add.load),
      exhaustMap((action: StoreActionSingle<Movie>) => {
        return of(this.movies.add(action.payload)).pipe(
          map(() => {
            return MovieActions.add.success({
              payload: action.payload,
            });
          }),
          catchError((error: ErrorModel) => {
            return of(MovieActions.add.failure({ payload: error }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.update.load),
      exhaustMap((action: StoreActionSingle<Movie>) => {
        return of([
          ...this.movies.filter((m) => m.id !== action.payload.id),
          action.payload,
        ]).pipe(
          map(() =>
            MovieActions.update.success({
              payload: action.payload,
            })
          ),
          catchError((error: ErrorModel) => {
            return of(
              MovieActions.update.failure({
                payload: error,
              })
            );
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.delete.load),
      exhaustMap((action: StoreActionSingle<number>) => {
        return of([...this.movies.filter((m) => m.id !== action.payload)]).pipe(
          map(() => {
            return MovieActions.delete.success({
              payload: action.payload,
            });
          }),
          catchError((error: any) => {
            return of(
              MovieActions.delete.failure({
                payload: error,
              })
            );
          })
        );
      })
    )
  );
}
