import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent implements OnInit {
  @Input() publicacion: Publicacion;
  constructor() { }

  ngOnInit() {}

}
