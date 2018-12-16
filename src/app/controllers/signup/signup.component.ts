import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private tostrService: ToastrService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.signup(form.value).subscribe((_res) => {
      this.authService.authenticate();
      this.tostrService.success('registered successfully', 'success');
      this.router.navigate(['login']);
    },
      (_err) => {
        this.tostrService.error(_err.error.message, 'error occurred');
       

      }
    )
  }

}
