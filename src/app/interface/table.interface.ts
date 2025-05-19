export interface TableHeader {
  id: string;
  label: string;
}

export interface TableColumn {
  headerId: string
  primaryText: string | number
}

export interface TableRow {
  id: string
  code: string
  columns: TableColumn[]
}