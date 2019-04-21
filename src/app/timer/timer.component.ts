import { Component, OnInit } from "@angular/core";
import { DataService } from "../service/data.service";
import { WebsocketService } from "../socketservice/websocket.service";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { Router } from "@angular/router";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.scss"]
})
export class TimerComponent implements OnInit {
  examid;
  studid;
  minutes;
  seconds;
  constructor(
    private local: LocalStorage,
    private data: DataService,
    private router: Router,
    private websoc: WebsocketService
  ) {
    this.local.getItem("user").subscribe(data => {
      this.examid = data.examid;
      this.studid = data.id;
      this.websoc.emit("getdates", {
        // userid: this.userdata.id,
        examid: this.examid
      });
      this.websoc.listen("date").subscribe(data => {
        console.log("socket data", data);
        if (data == "start") {
          this.router.navigate(["home"]);
        } else {
          this.minutes = data[1];
          this.seconds = data[2];
        }
      });
    });
  }

  ngOnInit() {}
}
