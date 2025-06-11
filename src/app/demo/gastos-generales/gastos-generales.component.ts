import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { activarSpinner, guardarGasto, listarGastosGenerales } from '../../store/action/totalActions';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StorageService } from '../../theme/shared/service/storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { SaveGastoGeneralService } from '../../theme/shared/service/save-gasto-general.service';
import { gastosGenerales } from '../../store/state/totalState';

@Component({
  selector: 'app-gastos-generales',
  imports: [ReactiveFormsModule],
  templateUrl: './gastos-generales.component.html',
  styleUrl: './gastos-generales.component.scss'
})
export class GastosGeneralesComponent implements OnInit{

  base64Image: string | ArrayBuffer | null = null;
  filePath: string = '';
  urlImagen: string | ArrayBuffer | null = null;
  file: any;
  formGastosGenerales: FormGroup;
  gastosGenerales: gastosGenerales[] = [];
  urlImg: string = '';

  constructor(private storage: AngularFireStorage,
              private storageService: StorageService,
              private store: Store<AppState>,
              private saveGastos: SaveGastoGeneralService,
              private fb: FormBuilder) {
    this.formGastosGenerales = this.fb.group({
      detalleGasto: [''],
      montoGasto: [''],
    })
  }

  ngOnInit(): void {
    this.store.select('gastosGenerales').subscribe(gastosGenerales => {
      this.gastosGenerales = gastosGenerales;
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.file = file;
    if (file) {
      this.filePath = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.base64Image = e.target?.result as string;
        console.log(this.base64Image); // Here you can handle the base64 image
      };
      reader.readAsDataURL(file);
    }
  }

  guardarGastoConFoto() {
    this.store.dispatch(activarSpinner({ spinner: true }));
    this.storageService.checkIfImageExists('gastosGenerales/'.concat(this.filePath)).subscribe((exists) => {
      if (exists) {
        console.log('La imagen ya está en el storage.');
        this.urlImagen = exists;
        this.nuevoGasto()
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set the desired resolution
            const MAX_WIDTH = 1280;
            const MAX_HEIGHT = 720;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
              if (blob) {
                const filePath = `gastosGenerales/${this.filePath}`;
                const fileRef = this.storage.ref(filePath);
                const task = this.storage.upload(filePath, blob);

                task
                  .snapshotChanges()
                  .pipe(
                    finalize(() => {
                      fileRef.getDownloadURL().subscribe((url) => {
                        this.urlImagen = url;
                        console.log(this.urlImagen);
                        this.nuevoGasto()
                      });
                    })
                  )
                  .subscribe();
              }
            }, 'image/png');
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(this.file);
      }
    });

  }

  private nuevoGasto() {
    const newGasto = {
      fechaGasto: new Date().toLocaleDateString('es-ES'),
      detalleGasto: this.formGastosGenerales.get('detalleGasto')?.value,
      montoGasto: this.formGastosGenerales.get('montoGasto')?.value,
      foto: this.urlImagen,
      pathImage: 'gastosGenerales/'.concat(this.filePath)
    };

    console.log('Gastos guardado', newGasto);
    debugger
    this.saveGastos.guardarGastoGeneral(newGasto).subscribe(response => {
      this.store.dispatch(activarSpinner({ spinner: false }));
      this.formGastosGenerales.reset();
      this.urlImagen = '';
      this.store.dispatch(listarGastosGenerales());
    });
  }

  imgGasto(foto: string) {
    this.urlImg = foto;
  }
}
