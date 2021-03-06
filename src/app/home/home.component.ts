import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { DataService } from "../service/data.service";
import { WebsocketService } from "../socketservice/websocket.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  question = "";
  ques;
  fib;
  mcq;
  brief;
  code;
  currsection;
  userdata;
  toggleques = "";
  execode;
  examid;
  studid;
  iframeurl = "";
  hour;
  min;
  sec;
  // url = "https://oes-backend.herokuapp.com";
  url = "http://localhost:3000";
  constructor(
    private local: LocalStorage,
    private data: DataService,
    private router: Router,
    private websoc: WebsocketService
  ) {
    this.local.getItem("user").subscribe(data => {
      console.log(data);
      this.userdata = data;
      this.data.getQues(data.examid).subscribe(ques => {
        // console.log(ques);
        let temp = JSON.parse(ques);
        this.ques = temp;
        this.fib = temp.fib;
        this.mcq = temp.mcq;
        this.brief = temp.brief;
        this.code = temp.code;
      });
      this.data.createAns(data.examid, data.id).subscribe(data => {
        // console.log(data);
      });
      this.examid = data.examid;
      this.studid = data.id;
      this.websoc.emit("getdates", {
        // userid: this.userdata.id,
        examid: this.examid
      });
      this.websoc.listen("time").subscribe(data => {
        console.log("socket data", data);
        if (data == "end") {
          this.router.navigate(["endpage"]);
        } else {
          this.hour = data[0];
          this.min = data[1];
          this.sec = data[2];
        }
      });
    });
  }

  ngOnInit() {}
  quesClick(i) {
    console.log(i);
    this.question = i;
    this.iframeurl = `${this.url}/codeeditor?studid=${this.studid}&examid=${
      this.examid
    }&qid=${i.id}&ques=${i.question}&marks=${i.marks}`;
  }
  load(i) {
    this.question = "";
    switch (i) {
      case "fib":
        this.currsection = this.fib;
        this.toggleques = "fib";
        break;
      case "mcq":
        this.currsection = this.mcq;
        this.toggleques = "mcq";
        break;
      case "brief":
        this.currsection = this.brief;
        this.toggleques = "brief";
        break;
      case "code":
        this.currsection = this.code;
        this.toggleques = "code";
        break;
    }
  }
  fibsubmit(event, i) {
    event.preventDefault();
    let gans = event.target.querySelector("#ans").value;
    console.log(i, event.target.querySelector("#ans").value);
    this.data
      .submitfib(
        i.id,
        this.examid,
        this.studid,
        i.question,
        i.answer,
        gans,
        i.marks
      )
      .subscribe(data => {
        console.log(data);
        let da = JSON.parse(data);
        if ((da.n = 1)) {
          event.target.querySelector("#ans").value = "";
        }
      });
  }
  mcqsubmit(event, i) {
    event.preventDefault();
    let gans = event.target.querySelector(
      'input[name="inlineRadioOptions"]:checked'
    ).value;
    console.log(
      event,
      i,
      event.target.querySelector('input[name="inlineRadioOptions"]:checked')
        .value
    );
    this.data
      .submitmcq(
        i.id,
        this.examid,
        this.studid,
        i.question,
        i.answer,
        gans,
        i.marks
      )
      .subscribe(data => {
        console.log(data);
      });
  }
  briefsubmit(event, i) {
    event.preventDefault();
    let gans = event.target.querySelector("#answer").value;
    console.log(event, i, event.target.querySelector("#answer").value);
    this.data
      .submitbrief(
        i.id,
        this.examid,
        this.studid,
        i.question,
        i.answer,
        gans,
        i.marks
      )
      .subscribe(data => {
        console.log(data);
        let da = JSON.parse(data);
        if ((da.n = 1)) {
          event.target.querySelector("#answer").value = "";
        }
      });
  }
  codeRun(event, i) {
    event.preventDefault();
    const first = event.target.querySelector(".first");
    const iframe = event.target.querySelector("iframe");
    var html = first.textContent;
    this.execode = first.textContent;
    // iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
    // var text = event.target.clipboardData.getData("text/plain");
    // document.execCommand("insertText", false, text);
    console.log(i, html);
  }
  submitCode() {
    console.log(this.execode);
  }
}
