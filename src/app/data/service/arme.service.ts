import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import {Arme} from "../class/arme";
import { MessageService } from './message.service';
import {map} from "rxjs/operators";
import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";import {
  Action,
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshot
} from "@angular/fire/compat/firestore";

@Injectable({ providedIn: 'root' })
export class ArmeService {
  // URL d'accès aux documents sur Firebase
  private static url = 'armes';
  constructor(private messageService: MessageService, private db: AngularFirestore) { }

  getArmes(): Observable<Arme[]> {
    this.messageService.add('HeroService: fetched heroes');

    return this.db.collection<JsonArray>(ArmeService.url)
      .snapshotChanges()
      .pipe(
        map(documents => {
          return documents.map(document => {
            return this.transformDocumentChangeActionToArme(document);
          });
        })
      );

  }
  getArmesDashboard(): Observable<Arme[]> {

    return this.db.collection<JsonArray>(ArmeService.url, ref=> ref.limit(3))
      .snapshotChanges()
      .pipe(
        map(documents => {
          return documents.map(document => {
            return this.transformDocumentChangeActionToArme(document);
          });
        })
      );

  }
  /**
   * Récupération des 3 premiers armes
   */
  getArmesTop3(): Observable<Arme[]> {


    return this.db.collection<JsonArray>(ArmeService.url, ref => ref.limit(3))
      .snapshotChanges()
      .pipe(
        map(documents => {
          return documents.map(document => {
            return this.transformDocumentChangeActionToArme(document);
          });
        })
      );

  }
  /**
   * Récupération d'un document spécifique à l'aide de son id
   * @param id
   * @private
   */
  private getArmeDocument(id: string): AngularFirestoreDocument<JsonArray> {

    // return document
    return this.db.doc<JsonArray>(ArmeService.url + `/` + id);
  }
  /**
   * Ajout d'un héro sur Firebase
   * @param arme
   */
  addArme(arme: Arme) {

    this.db.collection(ArmeService.url).add(arme.toJSON());
  }
  /**
   * Modification du héro sur Firebase
   * @param arme
   */
  updateArme(arme: Arme) {

    // Update document
    if (arme.id != undefined) {
      this.getArmeDocument(arme.id).update(arme.toJSON());
    }

  }
  deleteArme(arme: Arme) {

    // Delete the document
    if (arme.id != undefined) {
      this.getArmeDocument(arme.id).delete();
    }
  }
  /**
   * Récupération d'une arme spécifique à l'aide de son id
   * @param id
   */
  getArme(id: string): Observable<Arme | undefined> {

    // Return hero observable
    return this.getArmeDocument(id).snapshotChanges()
      .pipe(
        map(document => {
          return this.transformDocumentSnapshotToArme(id, document);
        })
      );
  }
  /**
   * Transformation du document reçu en un objet de type Hero
   * @param a
   * @private
   */
  private transformDocumentChangeActionToArme(a: DocumentChangeAction<JsonArray>): Arme {

    // Get document data
    const data = a.payload.doc.data();

    // New Hero
    const arme = new Arme().fromJSON(data);

    // Get document id
    const id = a.payload.doc.id;

    arme.id = id;

    return arme;
  }


  /**
   * Transformation du document reçu en un objet de type Hero
   * @private
   */
  private transformDocumentSnapshotToArme(id: string, document: Action<DocumentSnapshot<JsonArray>>): Arme | undefined {

    // Get document data
    const data = document.payload.data();

    // New Arme
    let arme;
    if (data != undefined) {
      arme = new Arme().fromJSON(data);
      arme.id = id;
    }

    // Use spread operator to add the id to the document data
    return arme;
  }
}
