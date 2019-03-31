import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  authStud(examid: string, email: string, pass: string) {
    return this.http.post(
      "http://localhost:3000/authstud",
      {
        examid: examid,
        email: email,
        pass: pass
      },
      { responseType: "text" }
    );
  }
}
