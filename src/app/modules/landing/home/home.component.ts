import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
  ElementRef,
} from "@angular/core";
@Component({
  selector: "landing-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent implements OnInit {
  position;
  isIntergration;
  isReviews;
  isFooter;
  isCompanyList;
  

  /**
   * Constructor
   */
  constructor(public el: ElementRef) {}

  @HostListener("window:scroll", ["$event"])
  ngOnInit(): void {
    this.checkScroll();
    this.isCompanyList = false;
    this.isIntergration = false;
    this.isReviews = false;
    this.isFooter = false;
  }

  public checkScroll(): void {
    const scrollPosition = window.pageYOffset;
    this.position = scrollPosition;

    const aParent = document.getElementById("desktopSvgParent");
    const a = document.getElementById("desktopSvg");
    const traslateElement = document.getElementById("TraslateElement");
    const TraslateElement1 = document.getElementById("TraslateElement1");
    const TraslateElement2 = document.getElementById("TraslateElement2");
    const TraslateElement3 = document.getElementById("TraslateElement3");
    const TraslateElement4 = document.getElementById("TraslateElement4");
    const TraslateElement5 = document.getElementById("TraslateElement5");

    // Get the top, left coordinates of two elements
    const eleRect = a.getBoundingClientRect();
    const targetRect = aParent.getBoundingClientRect();

    // Calculate the top and left positions
    const top = eleRect.top - targetRect.top;
    const bottom = targetRect.bottom - eleRect.bottom;
    // style="transform: translate(0%, 0px) rotate(-4e-05deg) rotateY(15deg) rotateX(9.99994deg);"
    if (top < 432) {
      traslateElement.style.transform =
        "translate(0%, 0px) rotate(-4e-05deg) rotateY(15deg) rotateX(9.99994deg)";
      TraslateElement1.style.opacity = "1";
      TraslateElement2.style.opacity = "0";
      TraslateElement3.style.opacity = "0";
      TraslateElement4.style.opacity = "0";
      TraslateElement5.style.opacity = "0";
      console.log(top, "i 632");
    } else if (top < 1272) {
      traslateElement.style.transform =
        "translate(90%, 0px) rotate(-4e-05deg) rotateY(-15deg) rotateX(9.99994deg)";
      console.log(top, "i top");
      TraslateElement1.style.opacity = "0";
      TraslateElement1.style.transition = "opacity .2s ease-out";
      TraslateElement2.style.opacity = "1";
      TraslateElement3.style.opacity = "0";
      TraslateElement4.style.opacity = "0";
      TraslateElement5.style.opacity = "0";
    } else if (top < 2072) {
      traslateElement.style.transform =
        "translate(0%, 0px) rotate(-4e-05deg) rotateY(15deg) rotateX(9.99994deg)";
      console.log(top, "i 2572");
      TraslateElement1.style.opacity = "0";
      TraslateElement2.style.opacity = "0";
      TraslateElement2.style.transition = "opacity .2s ease-out";
      TraslateElement3.style.opacity = "1";
      TraslateElement4.style.opacity = "0";
      TraslateElement5.style.opacity = "0";
    } else if (top < 2672) {
      traslateElement.style.transform =
        "translate(90%, 0px) rotate(-4e-05deg) rotateY(-15deg) rotateX(9.99994deg)";
      console.log(top, "i 3572");
      TraslateElement1.style.opacity = "0";
      TraslateElement2.style.opacity = "0";
      TraslateElement3.style.opacity = "0";
      TraslateElement3.style.transition = "opacity .2s ease-out";
      TraslateElement4.style.opacity = "1";
      TraslateElement5.style.opacity = "0";
    } else if (top < 3222) {
      traslateElement.style.transform =
        "translate(0%, 0px) rotate(-4e-05deg) rotateY(15deg) rotateX(9.99994deg)";
      console.log(top, "i 4122");
      TraslateElement1.style.opacity = "0";
      TraslateElement2.style.opacity = "0";
      TraslateElement3.style.opacity = "0";
      TraslateElement4.style.opacity = "0";
      TraslateElement4.style.transition = "opacity .2s ease-out";
      TraslateElement5.style.opacity = "1";
    } else if (top < 3922) {
      traslateElement.style.transform =
        "translate(0%, 0px) rotate(-4e-05deg) rotateY(15deg) rotateX(9.99994deg)";
      console.log(top, "i 4522");
    }
  }
}
