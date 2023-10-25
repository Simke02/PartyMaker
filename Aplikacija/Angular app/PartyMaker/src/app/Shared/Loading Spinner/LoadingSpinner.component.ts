import { Component } from "@angular/core";

@Component({
  selector:'app-loading-spinner',
  template:'<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  styleUrls:['./LoadingSpinner.component.css']
})
export class LoadingSpinner{

}