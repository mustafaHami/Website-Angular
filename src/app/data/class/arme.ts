import {Serializable} from "../../serializable";

export class Arme extends Serializable{
  id: string = "";
  name: string = "";
  attaque : number= 0;
  esquive : number= 0;
  degats : number= 0;
  pointVie : number= 0;
  imgSource : string = "";

  constructor() {
    super();

  }

  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }
}
