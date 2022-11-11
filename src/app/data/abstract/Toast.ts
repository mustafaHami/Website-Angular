import {AngularFireStorage} from "@angular/fire/compat/storage";
import Swal from "sweetalert2";

export abstract class Toast {

  constructor() { }
  // alert
  private Toast: typeof Swal = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  })

  errorAlert(message: string): void {
    this.Toast.fire({
      icon: "error",
      titleText: "Error !",
      text: message,
      background: '#fde8e8',
      color: '#f05252'
    })
  }

  successAlert(message: string): void {
    this.Toast.fire({
      icon: "success",
      titleText: "Success !",
      text: message,
      background: '#def7ec',
      color: '#049f6e'
    })
  }

}
