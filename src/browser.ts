import puppeteer from 'puppeteer';
import {Page} from 'puppeteer';

import { Subject, switchMap, from } from 'rxjs';
import { FilmId } from './types/film';


export class Browser {
    private readonly filmId$ = new Subject<number>;
    private readonly filmTitle$ = new Subject<string>();

    readonly film$ = this.filmId$.pipe(
        switchMap(id => this.initialize().pipe(map(page => [page, id]))),
        switchMap(([page, id]) => this.findFilm(page, id))
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
        ).pipe(switchMap(b => b.newPage()))
    }

    private async findFilm(page: any, id: number) {
        await page.goto(`https://www.google.com/search?q=kinopoisk+${id}`);
    // get film info
    const { title, url } = await page.evaluate(() => {
        const search = document.querySelector('#search');
        const blocks = Array.from(search.querySelectorAll('div.g'));
        const film = blocks.find((block) => block.querySelector('cite').textContent.includes('film'));
        if (!film) return {};

        const [title] = film.querySelector('h3').textContent.split(' -');
        const url = film.querySelector('a').href;

        return {
            title,
            url
        }
    });

    const [span] = await page.$x("//span[contains(., 'Рейтинг: ')]");
    const rating = await page.evaluate((el: any) => el.textContent, span);

    const [btn] = await page.$x("//a[contains(., 'Картинки')]");
    await btn.click();
    await page.waitForNavigation();
    await page.waitForSelector('#islrg');
    await page.click("#islrg a");
    await page.waitForSelector('#islsp');
    await page.waitForTimeout(500);

    const image = await page.evaluate(() => {
        return document.querySelector('#islsp').querySelector('a > img').src;
    });

    const description = `
        ${url}
        ${rating}
    `;
    }
}