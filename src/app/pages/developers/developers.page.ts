import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Dev } from 'src/app/services/database.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
})
export class DevelopersPage implements OnInit {

  developers: Dev[] = [];

  products: Observable<any[]>;

  developer = {};
  
  product = {};

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {

    this.databaseService.getDatabaseState()
                        .subscribe(rdy => {

                          if(rdy){
                            this.databaseService.getDevs()
                                                .subscribe(devs => {

                                                  this.developers = devs;
                                                });

                            this.products = this.databaseService.getProdutos();                    
                          }
                        });
  }


  addDeveloper(){

    let skills = this.developer['skills'].split(',');

    skills = skills.map(skill => skill.trim());

    this.databaseService.addDeveloper(this.developer['name'], skills, this.developer['img'])
                        .then(_ =>{
                          
                          this.developer = {};
                        });
  }

  addProduct(){
    
    this.databaseService.addProduct(this.product['name'], this.product['creator'])
                        .then(_ => {
                          
                          this.product = {};
                        });
  }

}
