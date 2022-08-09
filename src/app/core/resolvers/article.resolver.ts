import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ArticleService } from '../services/article.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<any> {
  constructor(private articleService: ArticleService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const slug = route.paramMap.get('slug') as string;
    return this.articleService.getArticle(slug).pipe(
      catchError((error) => {
        return of({});
      })
    );
  }
}
