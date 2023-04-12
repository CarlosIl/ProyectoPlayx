import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from "../services/article.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {

  constructor(private articleService: ArticleService, private router: Router) {}

  articles: any;

  ngOnInit(): void {
    this.showArticles();
  }

  showArticles(){
    this.articles = this.articleService.listArticles().subscribe(article=>{
      this.articles = article;
      console.log(this.articles);
    })
  }

  deleteArticle(id:any){
    this.articleService.deleteArticle(id).subscribe(res => {
      this.articles = this.articles.filter((a:any) => a.id == id);
    });
    this.router.navigateByUrl('/');
  }
}
