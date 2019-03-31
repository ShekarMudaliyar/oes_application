import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { DataService } from "../service/data.service";
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
  constructor(private local: LocalStorage, private data: DataService) {
    this.local.getItem("user").subscribe(data => {
      console.log(data);
      this.userdata = data;
      this.data.getQues(data.examid).subscribe(ques => {
        console.log(ques);
        let temp = JSON.parse(ques);
        this.ques = temp;
        this.fib = temp.fib;
        this.mcq = temp.mcq;
        this.brief = temp.brief;
        this.code = temp.code;
      });
    });
  }

  ngOnInit() {}
  quesClick(i) {
    console.log(i);
    this.question = i;
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
    console.log(event, i, event.target.querySelector("#ans").value);
  }
  mcqsubmit(event, i) {
    event.preventDefault();
    console.log(
      event,
      i,
      event.target.querySelector('input[name="inlineRadioOptions"]:checked')
        .value
    );
  }
  briefsubmit(event, i) {
    event.preventDefault();
    console.log(event, i, event.target.querySelector("#answer").value);
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
