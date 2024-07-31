import { SafePipe } from "./safe.pipe"; // Adjust the import path as needed
import { DomSanitizer } from "@angular/platform-browser";
import { TestBed } from "@angular/core/testing";

describe("SafePipe", () => {
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (value: string) => value,
            bypassSecurityTrustStyle: (value: string) => value,
            bypassSecurityTrustScript: (value: string) => value,
            bypassSecurityTrustUrl: (value: string) => value,
            bypassSecurityTrustResourceUrl: (value: string) => value,
          },
        },
      ],
    });
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it("create an instance", () => {
    const pipe = new SafePipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
