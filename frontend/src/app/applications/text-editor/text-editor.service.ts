import {Injectable} from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Injectable()
export class TextEditorService {

  constructor() {
  }

  downloadPDF(html: HTMLDocument) {
    const filename = prompt('Insert PDF name', 'document');
    if (filename) {
      html2canvas(html.body, {scale: 2, allowTaint: false}).then(canvas => {
        // Few necessary setting options
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        const contentDataURL = canvas.toDataURL('image/jpeg');
        const pdf = new jspdf('p', 'mm', 'a4');
        const position = 0;

        pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight, true);
        pdf.save(`${filename}.pdf`); // Generated PDF
      });
    }
  }

  downloadDoc(html: HTMLDocument, extension = '.doc') {
    let filename = prompt('Insert DOC name', 'document');
    if (filename) {
      filename = `${filename}.${extension}`;
      const blob = new Blob(['\ufeff', html.body.innerHTML], {
        type: 'application/msword'
      });
      const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html.body.innerHTML);
      this.downloadByLink(blob, url, filename);
    }
  }

  downloadByLink(blob: Blob, url: string, filename: string): void {
    // Create download link element
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;
      // Setting the file name
      downloadLink.download = filename;
      // triggering the function
      downloadLink.click();
    }
    document.body.removeChild(downloadLink);
  }
}
