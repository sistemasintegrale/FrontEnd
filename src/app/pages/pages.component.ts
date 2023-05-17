import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  ngOnInit(): void {
    const url =  localStorage.getItem('theme') || './assets/css/colors/blue.css';
    this.linkTheme?.setAttribute('href',url);   
  }

}
