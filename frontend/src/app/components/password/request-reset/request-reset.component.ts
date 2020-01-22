import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public error = null;
  public form = {
    email: null
  }
  constructor(
    private jarwis: JarwisService,
    private notify: SnotifyService
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.jarwis.resetRequest(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(data){
    // console.log(data);
    this.form.email = null;
  }

}
