import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  message : string = '';

  constructor(private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.message = data['message'];
    })
  }

}
