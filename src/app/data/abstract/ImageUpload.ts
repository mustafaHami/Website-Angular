import { AngularFireStorage } from "@angular/fire/compat/storage";
import {Toast} from "./Toast";

export abstract class ImageUpload extends Toast{

  imageUrl?: string;
  file?: Blob | null;
  imageList : any = [];
  isSelectPhoto : boolean = false;
  constructor(protected storage: AngularFireStorage) {
    super(); // puisque les classes peuvent extends qu'un seul class
    // je fais un extends Toas de cette classe pour pouvoir l'utiliser dans les autres classe
  }

  onSelectedFile(e: any): void {
    this.isSelectPhoto =false;
    if (e.target.files) {
      this.isSelectPhoto =true;
      console.log(this.isSelectPhoto)
      this.file = e.target.files[0];
      if (this.file?.type.startsWith('image/')) {
        let reader = new FileReader();
        reader.readAsDataURL(<Blob>this.file);
        reader.onload = (e: any) => {
          this.imageUrl = e.target.result;
        }
      } else {
        this.isSelectPhoto =false;
        this.file = null;
        e.target.value = '';
        this.imageUrl = undefined;
      }
    }
  };

  uploadImage(filePath: string, name: string): Promise<boolean> {
    if(this.file){
      return new Promise(async (resolve, reject) => {
        try {
          const uploadRef = await this.storage.upload(filePath + name, this.file);
          const visualLink = await uploadRef.ref.getDownloadURL();
          this.imageList.push({name: name, url: visualLink});
          resolve(true);
        } catch (err) {
          reject(err);
        }
      })
    }else{
      return new Promise(async (resolve, reject) => {});
    }

  }

  getImages(path:string) {
    this.imageList = [];
    const ref = this.storage.ref(path);
    ref.listAll().subscribe((data) => {
      data.items.map((image) => {
        const name = image.name;
        this.storage.ref(path+"/"+name).getDownloadURL().subscribe((url) => {
          this.imageList.push({
            name : name,
            url : url
          })
        })
      })
    })
  }
}
