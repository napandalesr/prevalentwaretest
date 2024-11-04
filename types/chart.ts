export type graphType = {
  labels: string[],
  datasets: datasetsType[]
}

export type datasetsType = {
  label: string,
  data: number[],
  backgroundColor: string
}