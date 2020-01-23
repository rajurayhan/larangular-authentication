import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null

  }
  public error = null;
  constructor(
    private route: ActivatedRoute,
    private jarwis: JarwisService,
    private router : Router,
    private notify: SnotifyService
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
      // console.log(this.form);
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.jarwis.chagnePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)

    );
  }

  handleError(error){
    this.error = error.error.error;
    this.notify.error(this.error)
    console.log(error);
  }

  handleResponse(data){
    this.notify.confirm('Password Changed, Login with New Password? ', {
      buttons: [
        {
          text: 'Ok',
          action: toster => {
            this.router.navigateByUrl('/login');
            this.notify.remove(toster.id);
          }
        }
      ]
    });
    // this.router.navigateByUrl('/login');
  }

}
