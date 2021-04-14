import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutherizationService } from './autherization.service';
const SERVER_URL = 'http://localhost:3100/api/v1/notes/subscription';
@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

  constructor( private http: HttpClient, private authService:AutherizationService) { }
  public sendSubscriptionToTheServer(noteId, reNotify, subscription: PushSubscription, time, remainder?) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getBearerToken());

    return this.http.post(SERVER_URL + '?noteId=' + noteId + '&reNotify=' + reNotify,
      { subscription: subscription, time: time, remainder: remainder }, { headers: headers });
  }
  getPushNotification() {
    return this.http.get(SERVER_URL);
  }
}
