import { Injectable } from '@angular/core';

import { userDetails } from './userdetails';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userData: userDetails[] = [];
  

  // addToService(userdata: userDetails) {
  //   this.userData.push(userdata);
  //   console.warn(this.userData);
  // }

  // getDataFromService() {
  //   return this.userData;
  // }

  // addTechnologyToService(techData: string[]) {
  //   this.selectTechnology = Array.from(techData);
  //   console.warn(this.selectTechnology);
  // }
  // getTechnologyFromService() {
  //   return this.selectTechnology;
  // }
  // addImageToService(image: any) {
  //   this.userImage = image;
  //   console.warn(this.userImage);
  // }
  // getImageFromService() {
  //   return this.userImage;
  // }
}
