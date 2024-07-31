import { TaskbarItemDirective } from "./taskbar-item.directive"; // Adjust the import path as needed
import { ViewContainerRef } from "@angular/core";

describe("TaskbarItemDirective", () => {
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    viewContainerRef = jasmine.createSpyObj("ViewContainerRef", [
      "createEmbeddedView",
      "clear",
    ]);
  });

  it("should create an instance", () => {
    const directive = new TaskbarItemDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
