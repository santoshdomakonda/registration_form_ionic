import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';
import {RegistrationService} from "./regiser-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  ionicForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;
  language: string = 'en';
  title: string;
  submit: string;
  required: string;
  requiredFields: string;
  registered: string;
  registrationMsg: string;
  failed: string;
  registrationFail: string;
  ok: string;

  constructor(public formBuilder: FormBuilder, public registerService: RegistrationService, public alertCtrl: AlertController, private _translate: TranslateService) {

  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  getDate() {
    let date = new Date(this.ionicForm.get('dob').value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      const alert = this.alertCtrl.create({
        title: this.required,
        subTitle: this.requiredFields,
        buttons: [this.ok]
      });
      alert.present();
      return false;
    } else {
      this.registerService.register(this.ionicForm.value).subscribe((response: any) => {
        const alert = this.alertCtrl.create({
          title: this.registered,
          subTitle: this.registrationMsg,
          buttons: [this.ok]
        });
        alert.present();
      },(error: any) => {
        const alert = this.alertCtrl.create({
          title: this.failed,
          subTitle: this.registrationFail,
          buttons: [this.ok]
        });
        alert.present();
      });
    }
  }

  ionViewDidEnter(): void {
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  changeLanguage(): void {
    this._translateLanguage();
  }

  _translateLanguage(): void {
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  _initialiseTranslation(): void {
    this._translate.get('Title').subscribe((res: string) => {
      this.title = res;
    });
    this._translate.get('submit').subscribe((res: string) => {
      this.submit = res;
    });
    this._translate.get('Required').subscribe((res: string) => {
      this.required = res;
    });
    this._translate.get('requiredFields').subscribe((res: string) => {
      this.requiredFields = res;
    });
    this._translate.get('registered').subscribe((res: string) => {
      this.registered = res;
    });
    this._translate.get('registrationMsg').subscribe((res: string) => {
      this.registrationMsg = res;
    });
    this._translate.get('Failed').subscribe((res: string) => {
      this.failed = res;
    });
    this._translate.get('registrationFail').subscribe((res: string) => {
      this.registrationFail = res;
    });
    this._translate.get('ok').subscribe((res: string) => {
      this.ok = res;
    });
  }

}
