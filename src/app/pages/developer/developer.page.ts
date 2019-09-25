import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.page.html',
  styleUrls: ['./developer.page.scss'],
})
export class DeveloperPage implements OnInit {

  developer: Dev = null;

  skills = '';

  constructor(private activatedRoute: ActivatedRoute,
              private databaseService: DatabaseService,
              private router: Router,
              private toastCtrl: ToastController) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      
      let devId = params.get('id');

      this.databaseService.getDeveloper(devId)
                          .then(data => {

                            this.developer = data;

                            this.skills = this.developer.skills.join(',');
                          });
    });
  }

  delete(){

    this.databaseService.deleteDeveloper(this.developer.id)
                        .then(() => {

                          this.router.navigateByUrl('/');
                        });
  }

  updateDeveloper(){

    let skills = this.skills.split(',');

    skills = skills.map(skill => skill.trim());

    this.developer.skills = skills;

    this.databaseService.updateDeveloper(this.developer)
                        .then(async (resp) => {

                          let toast = await this.toastCtrl.create({

                            message: 'Developer updated',
                            duration: 5000
                          });

                          toast.present();
                        });
  }
}
