import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appChangeTextColor]'
})
export class AppChangeTextColorDirective implements OnInit {
  @Input() value : any;

  @HostBinding('style.color') color: string = 'black';

  constructor() { }

  ngOnInit(): void {
    if(this.value && this.value !== null && !isNaN(+this.value)){
      if(+this.value > 0){
        this.color = "green";
      }else if(+this.value < 0){
        this.color = "red";
      }else{
        this.color = "black";
      }
    }else{
      this.color = "black";
    }
  }

}
