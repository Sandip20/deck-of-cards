import { OnInit, ViewChild, Component, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { template } from '@angular/core/src/render3';

@Directive({
  selector: '[appClickToEdit]'


})

export class ClickToEditDirective implements OnInit {

  @Input() set appClickToEdit(condition: boolean) {
    this.vcRef.createEmbeddedView(this.templateRef);
  }


  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

  ngOnInit() {

  }
  toggle(){
    
  }
}
