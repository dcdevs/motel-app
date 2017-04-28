import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import { TranslateService } from 'ng2-translate/ng2-translate';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService) {
    translate.get(["tutorial.slide1_title",
                   "tutorial.slide1_description",
                   "tutorial.slide2_title",
                   "tutorial.slide2_description",
                   "tutorial.slide3_title",
                   "tutorial.slide3_description"
    ])
    .subscribe((values) => {
      console.log('Loaded values', values);
      this.slides = [
        {
          title: values['tutorial.slide1_title'],
          description: values['tutorial.slide1_description'],
          image: 'assets/img/slides/slide1.png',
        },
        {
          title: values['tutorial.slide2_title'],
          description: values['tutorial.slide2_description'],
          image: 'assets/img/slides/slide2.png',
        },
        {
          title: values['tutorial.slide3_title'],
          description: values['tutorial.slide3_description'],
          image: 'assets/img/ica-slidebox-img-3.png',
        }
      ];
    });
  }

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
