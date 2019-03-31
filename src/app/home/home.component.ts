import { Component, OnInit } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private local: LocalStorage) {
    this.local.getItem("user").subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {}
}
