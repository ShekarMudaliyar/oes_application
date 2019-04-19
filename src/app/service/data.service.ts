import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  url = "http://localhost:3000/";
  // url = "https://oes-backend.herokuapp.com/";
  authStud(examid: string, email: string, pass: string) {
    return this.http.post(
      `${this.url}authstud`,
      {
        examid: examid,
        email: email,
        pass: pass
      },
      { responseType: "text" }
    );
  }
  getQues(examid) {
    return this.http.post(
      `${this.url}getquesstud`,
      {
        examid: examid
      },
      { responseType: "text" }
    );
  }
  createAns(examid, studid) {
    return this.http.post(
      `${this.url}createexamans`,
      {
        examid: examid,
        studid: studid
      },
      { responseType: "text" }
    );
  }
  submitfib(quesid, examid, studid, ques, ans, gans, marks) {
    return this.http.post(
      `${this.url}submitfib`,
      {
        quesid: quesid,
        studid: studid,
        examid: examid,
        ques: ques,
        ans: ans,
        gans: gans,
        marks: marks
      },
      { responseType: "text" }
    );
  }
  submitmcq(quesid, examid, studid, ques, ans, gans, marks) {
    return this.http.post(
      `${this.url}submitmcq`,
      {
        quesid: quesid,
        studid: studid,
        examid: examid,
        ques: ques,
        ans: ans,
        gans: gans,
        marks: marks
      },
      { responseType: "text" }
    );
  }
  submitbrief(quesid, examid, studid, ques, ans, gans, marks) {
    return this.http.post(
      `${this.url}submitbrief`,
      {
        quesid: quesid,
        studid: studid,
        examid: examid,
        ques: ques,
        ans: ans,
        gans: gans,
        marks: marks
      },
      { responseType: "text" }
    );
  }
}
