import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

type DataStatus = 'idle' | 'ok' | 'error';
type DataOperation = 'none' | 'changing' | 'changed' | 'fail';
type DataFlags = {
  [K in DataStatus]: boolean;
} &
  { [K in DataOperation]: boolean };

interface Data<V> extends DataFlags {
  status: DataStatus;
  value: V | null;
}

type DataMapper = (value: any, response: any) => any;

type Dictionary = Record<string, any>;

type StoreData<T extends Dictionary> = {
  [K in keyof T]: Data<T[K]>;
};

interface ActionPayload<T extends Dictionary> {
  key: keyof T;
  obs$: Observable<unknown>;
  map: DataMapper;
}
interface LoadActionPayload<T extends Dictionary> extends ActionPayload<T> {}
interface UpdateActionPayload<T extends Dictionary> extends ActionPayload<T> {}

const createData = <D>(
  status: DataStatus,
  operation: DataOperation,
  value: D | null
): Data<D> => ({
  none: operation === 'none',
  changing: operation === 'changing',
  changed: operation === 'changed',
  fail: operation === 'fail',
  status,
  value,
  idle: status === 'idle',
  error: status === 'error',
  ok: status === 'ok',
});

export class Store<T extends Dictionary> {
  private _subs = new Subscription();
  private _data: BehaviorSubject<StoreData<T>>;
  get data(): StoreData<T> {
    return this._data.getValue();
  }
  data$: Observable<StoreData<T>>;

  private _loadAction = new Subject<LoadActionPayload<T>>();
  loadAction$ = this._loadAction.asObservable();

  private _updateAction = new Subject<UpdateActionPayload<T>>();
  updateAction$ = this._updateAction.asObservable();

  constructor(...keys: (keyof T)[]) {
    this._data = new BehaviorSubject(this._createStoreData(keys));
    this.data$ = this._data.asObservable();

    this._listenLoadAction();
    this._listenUpdateAction();
  }

  private _createStoreData = (keys: (keyof T)[]): StoreData<T> => {
    return keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          status: 'idle',
          value: null,
        },
      }),
      {} as StoreData<T>
    );
  };

  private _listenLoadAction = (): void => {
    this._subs.add(
      this._loadAction
        .pipe(
          tap(({ key }) => {
            this._setDataByStatus(key, 'idle', null);
          }),
          switchMap(({ key, obs$, map }) => {
            return obs$.pipe(
              tap((response) => {
                this._setDataByStatus(key, 'ok', map(this.data[key], response));
              }),
              catchError(() => {
                this._setDataByStatus(key, 'error');
                return EMPTY;
              })
            );
          })
        )
        .subscribe()
    );
  };

  private _listenUpdateAction = (): void => {
    this._subs.add(
      this._updateAction
        .pipe(
          tap(({ key }) => {
            this._setByOperation(key, 'changing');
          }),
          switchMap(({ key, obs$, map }) => {
            return obs$.pipe(
              tap((response) => {
                console.log(this.data[key].value);
                this._setByOperation(
                  key,
                  'changed',
                  map(this.data[key].value, response)
                );
              }),
              catchError(() => {
                this._setByOperation(key, 'fail');
                return EMPTY;
              })
            );
          })
        )
        .subscribe()
    );
  };

  private _setDataByStatus = <K extends keyof T>(
    key: K,
    status: DataStatus,
    value?: T[K] | null
  ): void => {
    this._data.next({
      ...this.data,
      [key]: createData(
        status,
        'none',
        value === undefined ? this.data[key].value : value
      ),
    });
  };

  private _setByOperation = <K extends keyof T>(
    key: K,
    operation: DataOperation,
    value?: T[K] | null
  ): void => {
    this._data.next({
      ...this.data,
      [key]: createData(
        this.data[key].status,
        operation,
        value === undefined ? this.data[key].value : value
      ),
    });
  };

  dispatchLoad = <K extends keyof T, R>(
    key: K,
    obs$: Observable<R>,
    map: (value: T[K], response: R) => T[K]
  ): void => {
    this._loadAction.next({ key, obs$, map });
  };

  dispatchUpdate = <K extends keyof T, R>(
    key: K,
    obs$: Observable<R>,
    map: (value: T[K], response: R) => T[K]
  ): void => {
    this._updateAction.next({ key, obs$, map });
  };

  cleanSubscriptions = (): void => {
    this._subs.unsubscribe();
  };
}
