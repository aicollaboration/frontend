import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
    name: string;
    children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'pdf-table-of-contents',
    templateUrl: './pdf-table-of-contents.component.html',
    styleUrls: [
        './pdf-table-of-contents.component.scss',
    ],
})
export class PdfTableOfContentsComponent implements OnChanges {
    @Input()
    public tree;

    public treeControl: FlatTreeControl<ExampleFlatNode>;
    public treeFlattener: MatTreeFlattener<any, any>;
    public dataSource: MatTreeFlatDataSource<any, any>;

    public loaded = false;

    public ngOnChanges(changes: SimpleChanges): void {
        console.log('changes', changes.tree.currentValue);

        if (changes.tree.currentValue) {

            this.treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
            this.treeFlattener = new MatTreeFlattener((node: FoodNode, level: number) => {
                return {
                    expandable: !!node.children && node.children.length > 0,
                    name: node.name,
                    level: level,
                };
            }, node => node.level, node => node.expandable, node => node.children);
            this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
            this.dataSource.data = changes.tree.currentValue;

            this.loaded = true;
        }
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
