
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiserveicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiserveicProvider {
  data: any;
  id: any;
  kode: any;
  apiUrl = 'Https://sar-reg.no/backend/app/tracking/handler.php';

  constructor(public http: Http) {
    this.data = null;
  }

  load(id, kode) {
    return new Promise(resolve => {
-     console.log(kode);
      this.http.get(this.apiUrl + "?Tel=" + kode.Tel +
        "&Lat=" + kode.latitude + "&Lon=" + kode.longitude
        + "&Acc=" + kode.Acc)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
