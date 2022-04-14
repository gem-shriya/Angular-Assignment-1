import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { userDetails } from 'src/app/userdetails';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[ a-zA-Z]+$'),
    ]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    category: new FormControl('', [Validators.required]),

    technology: new FormArray([], Validators.required),
    profilePic: new FormControl('', [Validators.required]),
  });
  dataUser: userDetails;
  profileImage: any;
  technologyList = ["Java", "Python", "Javascript", "C++", "C"]

  constructor(
    private userService: UsersService,
    private changDetector: ChangeDetectorRef
  ) {
    this.dataUser = {
      name: '',
      gender: '',
      email: '',
      mobile: 0,
      category: '',
      technology: [],
      profilePic: '',
    };
  }

  ngOnInit(): void { }

  onReview() {
    this.dataUser.name = this.loginForm.value.name;
    this.dataUser.gender = this.loginForm.value.gender;
    this.dataUser.email = this.loginForm.value.email;
    this.dataUser.category = this.loginForm.value.category;
    this.dataUser.mobile = this.loginForm.value.mobile;
    this.dataUser.profilePic = this.profileImage;
    this.dataUser.technology = this.loginForm.value.technology;


  }
  displayStyle = 'none';

  openModal() {
    this.displayStyle = 'block';
  }
  closeModal() {
    this.displayStyle = 'none';
  }
  submitForm() {
    this.userService.userData.push(this.dataUser);


    console.log(this.profileImage);

    this.displayStyle = 'none';

    this.loginForm.reset();
   window.alert("Click View User to see the data")

   
  }

  get name() {
    return this.loginForm.get('name');
  }
  get gender() {
    return this.loginForm.get('gender');
  }
  get email() {
    return this.loginForm.get('email');
  }
  get mobile() {
    return this.loginForm.get('mobile');
  }
  get category() {
    return this.loginForm.get('category');
  }
  get technology() {
    return this.loginForm.get('technology');
  }
  get profilePic(){
    return this.loginForm.get('profilePic')
  }

  onChange(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      let gfile = event.target.files[0];
      console.log(gfile);
      if (
        gfile.type == 'image/jpg' ||
        gfile.type == 'image/png' ||
        gfile.type == 'image/jpeg'
      ) {
        console.log('correct file uploaded');

        var file = event.target.files.length;
        for (let i = 0; i < file; i++) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.profileImage = event.target.result;
            this.changDetector.detectChanges();
          };
          reader.onerror = (error) => {
            console.log('error');
          };
          reader.readAsDataURL(event.target.files[i]);
        }
      } else {
        console.log('jpg/png/jpeg only');
        this.loginForm.controls['profilePic'].setValidators(
          Validators.required
        );
        this.loginForm.get('profilePic')?.updateValueAndValidity;
        this.loginForm.controls['profilePic'].reset();
      }
    }
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.loginForm.get('technology') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }
}
