export interface Document {
  id: number
  title: string
  author: string
  text: string
  rendered_text: string
  has_subdocuments: boolean
  public: boolean
  links: {
    parent: {id: number, title: string}
  }
  documents: Document[]
}

