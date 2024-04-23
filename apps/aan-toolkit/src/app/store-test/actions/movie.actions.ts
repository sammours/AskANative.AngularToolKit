import { Movie } from '../models/movie.model';
import {
  ActionGenerator,
  ActionTypes,
} from '@askanative-angulartoolkit/shared/store';

const actionGenerator = new ActionGenerator<Movie>('Movies');

const actionsStringGenerator = new ActionGenerator<number>('Movies');

export const MovieActions = {
  getAll: actionGenerator.create(ActionTypes.GetAll),
  getById: actionGenerator.createWithInput<number>(ActionTypes.Get),
  add: actionGenerator.createWithInput<Movie>(ActionTypes.Add),
  update: actionGenerator.createWithInput<Movie>(ActionTypes.Update),
  delete: actionsStringGenerator.createWithInput<number>(ActionTypes.Delete),
};
