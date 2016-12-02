import { Component, OnInit } from '@angular/core';
import { Document } from '../../shared/document.model';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  d1: Document = new Document({

      id: '23',

      title: 'Imagine!',

      text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum maximus hendrerit. Duis feugiat egestas dapibus. Aenean pharetra odio in sapien efficitur lobortis. Donec leo dui, efficitur eget nisi ut, pulvinar posuere justo. Morbi eget turpis sapien. Maecenas rutrum ut risus quis porta. Phasellus pharetra efficitur mattis. Cras cursus massa vitae mauris maximus euismod. Quisque ultricies dapibus magna, eu finibus felis mattis ac. Ut vestibulum ex et luctus pretium. Vestibulum egestas, augue volutpat posuere volutpat, diam tortor venenatis ante, at tempus leo mauris vitae lacus. Suspendisse a fermentum ipsum, et efficitur libero. Ut rutrum erat sem, id tempor lectus venenatis non.
`,
      rendered_text: `<img src="http://psurl.s3.amazonaws.com/images/jc/1920px-Great_Wave_off_Kanagawa2-fe2b.jpg" width="600" style="float:left; margin-right:15px; ">
`
    }
  )

  d2: Document = new Document({

    id: 2,
    title: 'Introductory Magick',
    text: 'It _is_ magical!',
    rendered_text: '<p>It <i>is</i> magical!</p>'
  })


  testDocuments: Document[] = [this.d1, this.d2]

  constructor() { }

  ngOnInit() {

  }

}
