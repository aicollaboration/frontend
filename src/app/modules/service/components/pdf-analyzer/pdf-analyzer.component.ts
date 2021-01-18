import { Component, ViewChild } from '@angular/core';
import { PDFDocumentProxy, PDFPageProxy, PDFPromise, PdfViewerComponent } from 'ng2-pdf-viewer';

interface PDFInfo {
    PDFFormatVersion: string;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    [key: string]: any; // return type is string, typescript chokes
}

interface PDFMetadata {
    parse(): void;
    get(name: string): string;
    getAll(): object;
    has(name: string): boolean;
}

interface PDFDocument extends PDFDocumentProxy {
    getAttachments(): PDFPromise<any[]>;
    getPageLabels(): PDFPromise<any[]>;
    getPageLayout(): PDFPromise<string>;
    getPageMode(): PDFPromise<string>;
    getMetadata(): PDFPromise<{ info: PDFInfo; metadata: PDFMetadata }>;
}

@Component({
    selector: 'pdf-analyzer',
    templateUrl: './pdf-analyzer.component.html',
    styleUrls: [
        './pdf-analyzer.component.scss',
    ],
})
export class PdfAnalyzerComponent {
    public pdfSrc = '/assets/pdf-test.pdf';

    @ViewChild(PdfViewerComponent)
    private pdfComponent: PdfViewerComponent;

    public renderText = true;
    public originalSize = false;
    public fitToPage = false;
    public showAll = true;
    public autoresize = false;
    public showBorders = true;
    public renderTextModes = [0, 1, 2];
    public renderTextMode = 1;
    public rotation = 0;
    public zoom = 1;
    public zoomScale = 'page-width';
    public zoomScales = ['page-width', 'page-fit', 'page-height'];
    public pdfQuery = '';
    public totalPages: number;

    public tree = [];
    public metadata = {};


    public zoomIn(): void {
        this.zoom += 0.05;
    }

    public zoomOut(): void {
        if (this.zoom > 0.05) {
            this.zoom -= 0.05;
        }
    }

    public rotateDoc(): void {
        this.rotation += 90;
    }

    // Event for search operation
    public searchQueryChanged(newQuery: string): void {
        if (newQuery !== this.pdfQuery) {
            this.pdfQuery = newQuery;
            this.pdfComponent.pdfFindController.executeCommand('find', {
                query: this.pdfQuery,
                highlightAll: true
            });
        } else {
            this.pdfComponent.pdfFindController.executeCommand('findagain', {
                query: this.pdfQuery,
                highlightAll: true
            });
        }
    }

    // Event handler when new PDF file is selected
    public onFileSelected(): void {
        const $pdf: any = document.querySelector('#file');

        if (typeof FileReader !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                this.pdfSrc = e.target.result;
            };

            reader.readAsArrayBuffer($pdf.files[0]);
        }
    }

    public async onLoadComplete(event: PDFDocument): Promise<void> {
        this.totalPages = event.numPages;

        const metadata = await event.getMetadata();

        this.metadata = {};
        if (metadata.metadata) {
            for (const [key, value] of Object.entries(metadata.metadata.getAll())) {
                this.metadata[key] = value;
            }
        }

        const outline = await event.getOutline();
        if (outline) {
            this.tree = outline.map(this.mapOutline.bind(this));
    
            console.log('metadata', metadata.metadata.getAll());
            console.log('info', metadata.info);
        }

        const page: PDFPageProxy = await event.getPage(1);
        const text = await page.getTextContent();
        const content = text.items.map(value => {
            console.log(value.str);
            return value.str;
        }).join(' # ');

        /*
        const data = {
            attachments: await event.getAttachments(),
            data: await event.getData(),
            //            dataLoaded: await event.dataLoaded(),
            destinations: await event.getDestinations(),
            javascript: await event.getJavaScript(),
            info: metadata.info,
            fingerprint: event.fingerprint,
            // fonts: event.embeddedFontsUsed(),
            // isEncrypted: event.isEncrypted(),
            metadata: metadata.metadata.getAll(),
            outline: await event.getOutline(),
            pages: [await event.getPage(2)],
            pageLabels: await event.getPageLabels(),
            pageLayout: await event.getPageLayout(),
            pageMode: await event.getPageMode()
        };
        */
    }

    public mapOutline(value: { title: string, items: any[] }): object {
        const item = {
            name: value.title
        };
        if (value.items.length > 0) {
            item['children'] = value.items.map(this.mapOutline.bind(this));
        }

        return item;
    }

    public pageRendered(event): void {
        // console.log('pageRendered', event);
    }

    public textLayerRendered(event): void {
        // console.log('textLayerRendered', event);
    }

    public onError(event): void {
        // console.error('onError', event);
    }

    public onProgress(event): void {
        // console.log('onProgress', event);
    }
}
