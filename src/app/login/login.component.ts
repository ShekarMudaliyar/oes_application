import { Component, OnInit } from "@angular/core";
import { DataService } from "../service/data.service";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private data: DataService,
    private local: LocalStorage,
    private router: Router
  ) {}
  cred;
  ngOnInit() {}
  login(event) {
    event.preventDefault();
    let examid = event.target.querySelector("#examid").value;
    let email = event.target.querySelector("#email").value;
    let pass = event.target.querySelector("#password").value;
    this.cred = this.data.authStud(examid, email, pass);
    this.cred.subscribe(da => {
      let data = JSON.parse(da);
      // console.log(JSON.parse(data));
      if (data.status == "success") {
        console.log(data.data);
        this.local
          .setItem("user", data.data)
          .subscribe(() => this.router.navigate(["timer"]));
      } else if (data == "failure") {
        console.log("incorrect password");
      } else if (data == "total failure") {
        console.log("email password does not match");
      }
    });
  }
}
