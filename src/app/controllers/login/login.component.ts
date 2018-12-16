import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,private tostrService: ToastrService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.login(form.value).subscribe((_res) => {
      localStorage.setItem('username',_res.username);
      this.authService.authenticate();
      //this.tostrService.success('logged in successfully', 'success');
      this.router.navigate(['home']);
    },
      (_err) => {
        this.tostrService.error(_err.error, 'error occurred');

      }
    )
  }

}
