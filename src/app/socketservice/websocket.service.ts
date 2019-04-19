import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import * as Rx from "rxjs/Rx";
import { environment } from "src/environments/environment.prod";
import { DataService } from "../service/data.service";
@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  private socket;
  url = "http://localhost:3000/";
  // url = "https://oes-backend.herokuapp.com/";
  constructor() {
    this.socket = io(this.url);
  }
  listen(eventName) {
    return new Observable(subs => {
      this.socket.on(eventName, data => {
        subs.next(data);
      });
    });
  }
  emit(eventName, data) {
    this.socket.emit(eventName, data);
  }
}
