import {Component, Input} from '@angular/core';

@Component ({
  selector: 'jhi-tree-view',
  template: `
  <ul>
    <li *ngFor="let node of collection">
      {{node[nameProperty]}}
      <jhi-tree-view [collection]="node[childrenProperty]" [nameProperty]="nameProperty" [childrenProperty]="childrenProperty"></jhi-tree-view>
    </li>
  </ul>
  `
})
export class TreeViewComponent {
  @Input() collection: [];
  @Input() nameProperty: string;
  @Input() childrenProperty: string;
}
