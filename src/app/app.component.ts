import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Contacto } from './modelos/contacto';
import { ContactoService } from './servicios/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-crud-232';
  contactoArray: Contacto[] = [];
  contactoForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private contactoService: ContactoService
  ) {
    this.contactoForm = formbuilder.group({
      fullname: [''],
      phone: [''],
      email: [''],
    });
  }
  ngOnInit(): void {
    this.getContactos();
  }

  getContactos(): void {
    this.contactoService.getContactos().subscribe(
      (result: any) => {
        this.contactoArray = result?.contactos;
        console.log(this.contactoArray);
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error!',
        });
      }
    );
  }
  registrarContacto(): void {
    this.contactoService.registrarContacto(this.contactoForm.value).subscribe(
      (result: any) => {},
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al registrar!',
        });
      }
    );
    /*  console.log('llamando a getcontactos');
    this.getContactos(); */
  }
}
