import { AuthService } from './../../services/auth.service';
import { Observable, Subject } from 'rxjs';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ClickToEditDirective } from './../../click-to-edit.directive';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "./mime-type.validator";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageUrl1: string = "/assets/images/default.png";
  imageUrl2: string = "/assets/images/default.png";
  isdefult = true;
  profileurl: string;

  image1uploaded = false;
  image2uploaded = false;
  filetoUpload: File = null;
  showskills = ' ';
  user = {
    username: 'Sandip',
    age: 26,
    name: 'Pawar',
    skills: [],


  }


  flag1 = false;
  flag2 = false;
  flag3 = false;
  flag4 = false;



  toggle1() {
    this.flag1 = !this.flag1;
  }
  toggle2() {
    this.flag2 = !this.flag2;
  }
  toggle3() {
    this.flag3 = !this.flag3;
  }
  toggle4() {
    this.flag4 = !this.flag4;
  }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  updateUser() {
    this.imageService.updateUser(this.user).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      }
    )
  }
  save1() {
    this.updateUser();
    this.toggle1();

  }
  cancel1() {
    this.toggle1();
  }
  save2() {
    this.updateUser();
    this.toggle2();
  }
  cancel2() {
    this.toggle2();
  }
  save3() {
    this.updateUser();
    this.toggle3();
  }
  cancel3() {
    this.toggle3();
  }
  save4() {
    this.updateUser();
    this.toggle4();
  }
  cancel4() {
    this.toggle4();
  }

  onItemSelect(item: any) {
   // this.user.skills.push(item);
    this.makeString();
  }
  makeString() {
    let str = '';
    // this.user.skills.push(item);
    this.user.skills.forEach(item => {
      str += item.item_text + ',';
    })
    if (str.length != 0)
      this.showskills = str.slice(0, str.length - 1);
    else
      this.showskills = "NA";
  }
  onSelectAll(items: any) {
    this.user.skills = items;
    this.makeString();
  }
  onDeSelect(item: any) {
    this.makeString();
  }
  defaultImg(): string {
    return "/assets/images/default.png"



  }





  constructor(

    public route: ActivatedRoute,
    private ng2ImgMax: Ng2ImgMaxService,
    private imageService: AuthService
  ) {

  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.init();
  }
  default1 = true;
  default2 = true;
  init() {
    this.imageService.getSkills().subscribe(res => {
      this.dropdownList = res.skills
    },
      err => {
        console.log(err);
      })
    this.imageService.getUser(localStorage.getItem('username')).subscribe(res => {
      this.imageUrl1 = (!res.imagePath1 || (res.imagePath1.length == 0)) ? this.defaultImg() : res.imagePath1;
      this.imageUrl2 = (!res.imagePath2 || res.imagePath2.length == 0) ? this.defaultImg() : res.imagePath2;
      this.user.username = res.username;
      this.user.name = res.name;
      this.user.age = res.age;
      this.user.skills = res.skills;
      this.makeString();
      if (this.imageUrl1 == this.imageUrl2) {
        this.default2 = true;
        this.default1 = true;
        this.profileurl = this.defaultImg();
      }
      else if (this.imageUrl1 == this.defaultImg()) {
        this.default1 = true;
        this.default2 = false;
        this.profileurl = res.profileUrl;
      }
      else if (this.imageUrl2 == this.defaultImg()) {
        this.default2 = true;
        this.default1 = false;
        this.profileurl = res.profileUrl;
      }
      else {
        this.default2 = false;
        this.default1 = false;
        this.profileurl = res.profileUrl;
      }





    },
      err => {
        console.log(err);
      }
    )
  }

  maketItProfile(url: string) {
    this.imageService.setUserProfile(localStorage.getItem('username'), url).subscribe(res => {
      this.profileurl = url;

      console.log(res);
    },

      err => {
        console.log(err);
      })
  }
  onImagePicked(event: Event) {
    this.image1uploaded = true;
    let image = (event.target as HTMLInputElement).files[0];
    var reader = new FileReader();
    this.ng2ImgMax.resizeImage(image, 1280, 960).subscribe((result) => {

      this.filetoUpload = result;
      this.imageService.imageUpload(result, 'image1', localStorage.getItem('username'))
        .subscribe(responseData => {
          this.default1 = false;
          this.imageUrl1 = responseData.url;
        })

      reader.onload = (event: any) => {
        this.imageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.filetoUpload);
    },

      (err) => {
        console.log(err);
      })

  }
  remove(url: number) {

    // this.imageService.removeProfile(localStorage.getItem('username'), url).subscribe(res => {

    //   this.defaultImg(url);


    // },
    //   err => {

    //   }
    // );
  }
  onImagePicked1(event: Event) {
    this.image2uploaded = true;
    let image = (event.target as HTMLInputElement).files[0];
    var reader = new FileReader();
    this.ng2ImgMax.resizeImage(image, 1280, 960).subscribe((result) => {

      this.filetoUpload = result;
      this.imageService.imageUpload(result, 'image2', localStorage.getItem('username')).subscribe(responseData => {
        this.imageUrl2 = responseData.url;
        this.default2 = false;
      })
        ;

      reader.onload = (event: any) => {
        this.imageUrl2 = event.target.result;
      }
      reader.readAsDataURL(this.filetoUpload);
    },

      (err) => {
        console.log(err);
      })

  }


}
