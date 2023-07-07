import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss'],
})
export class SwitchLangComponent {
  selectedLang: string;
  constructor(
    private translate: TranslateService,
    private langService: LangService
  ) {
    this.selectedLang = translate.getDefaultLang();
    langService.saveCurrentLang(this.selectedLang)
  }

  changeLang() {
    this.translate.use(this.selectedLang);
    this.langService.saveCurrentLang(this.selectedLang);
  }
}
