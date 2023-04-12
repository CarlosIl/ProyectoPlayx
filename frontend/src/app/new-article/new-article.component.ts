import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent {

  constructor(private articleService: ArticleService, private router: Router) {}

  articles: any;

  add(articleTitle:string, articleBody:string, articleAuthor:string){
    this.articles = {
      'title': articleTitle,
      'body': articleBody,
      'author': articleAuthor
    };
    this.articleService.addArticle(this.articles as any).subscribe(article=>{
      this.articles = article
    });
    console.log(this.articles);

    this.router.navigateByUrl('/');
  }
}
