export class Document {

  public id: number;
  public author_id: string;
  public title: string;
  public text: string;
  public rendered_text: string;
  public has_subdocuments: boolean;
  public links: {
    documents: Document []
    parent: {id: string, title: string}
  };

  constructor(data = {}) {
    Object.assign(this, data);
  }

}


export class DocumentHash {

  public id: string;
  public identifier; string;
  public title: string;

  constructor(data = {}) {
    Object.assign(this, data);
  }
}

export class DocumentList {

  public status: string;
  public documentCount: number;
  public documents: Document[];

  constructor(data = {}) {
    Object.assign(this, data);
  }

}

