import { TemplateRef, ViewContainerRef } from '@angular/core';
import { IfAuthenticatedDirective } from './if-authenticated.directive';

describe('IfAuthenticatedDirective', () => {
  it('should create an instance', () => {
    const templateRef = {} as TemplateRef<never>;
    const viewContainerRef = {} as ViewContainerRef;
    const directive = new IfAuthenticatedDirective(
      templateRef,
      viewContainerRef
    );
    expect(directive).toBeTruthy();
  });
});
