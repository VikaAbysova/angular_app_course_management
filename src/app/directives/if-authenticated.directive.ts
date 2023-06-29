import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appIfAuthenticated]',
})
export class IfAuthenticatedDirective {
  @Input('appIfAuthenticated') set isAuth(condition: boolean | null) {
    if (condition) {
      this.vieContainer.createEmbeddedView(this.templateRef);
      return;
    }
    this.vieContainer.clear();
  }

  constructor(
    private templateRef: TemplateRef<never>,
    private vieContainer: ViewContainerRef
  ) {}
}
