import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overlay-loader',
  templateUrl: './overlay-loader.component.html',
  styleUrls: ['./overlay-loader.component.scss']
})
export class OverlayLoaderComponent implements OnInit {
  @Input() loadingTitle: string;
  @Input() loadingDescription: string;
  dotsInterval: number;
  numDots = 0;
  dotsDisplay = '   ';

  constructor() { }

  ngOnInit(): void {
    this.dotsInterval = window.setInterval(() => {
      this.numDots = (this.numDots + 1) % 4;
      this.dotsDisplay = '.'.repeat(this.numDots) + ' '.repeat(3 - this.numDots);
    }, 500);
  }

  ngOnDestroy(): void {
    clearInterval(this.dotsInterval);
  }
}
