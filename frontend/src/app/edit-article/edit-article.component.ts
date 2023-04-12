import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent {

  articleID: any;
  article:any;

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.articleID = Number(routeParams.get('articleId'));
    console.log(this.articleID);
    this.articleService.find(this.articleID).subscribe((data:any)=>{
      this.article = data;
      console.log(this.article);
    });
  }

  update(articleTitle:string, articleBody:string, articleAuthor:string){
    this.articleService.update(this.articleID, this.article).subscribe((res)=>{
      this.router.navigateByUrl('/');
    })
  }
}
