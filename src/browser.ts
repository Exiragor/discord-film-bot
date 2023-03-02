import puppeteer from 'puppeteer';

import { Subject, switchMap, from, map, shareReplay, finalize } from 'rxjs';
import { findFilm } from './actions/find-film';
import { findFilmLink } from './actions/find-film-link';
import { Film, FilmId } from './types/film';


export class Browser {
    private readonly filmId$ = new Subject<number>;
    private readonly filmTitle$ = new Subject<string>();

    readonly browser$ = this.initialize().pipe(
        shareReplay({bufferSize: 1, refCount: true }),
    );

    readonly page$ = this.browser$.pipe(
        switchMap(b => b.newPage()),
        shareReplay({bufferSize: 1, refCount: true }),
    )

    readonly film$ = this.filmId$.pipe(
        switchMap((id) => this.page$.pipe(
            map<any, [any, number]>(page => [page, id]))
        ),
        switchMap(([page, id]) => findFilm(page, id))
    );

    readonly filmLinks$ = this.filmTitle$.pipe(
        switchMap(title => this.page$.pipe(
                map<any, [any, string]>(page => [page, title])
            )
        ),
        switchMap(([page, title]) => findFilmLink(page, title))
    );

    findFilmById(id: FilmId) {
        this.filmId$.next(id);
    }

    findWatchLinks(title: string) {
        this.filmTitle$.next(title);
    }

    private initialize() {
        return from(
            puppeteer.launch(
                {headless: true, args:['--no-sandbox']}
            )
        );
    }
}