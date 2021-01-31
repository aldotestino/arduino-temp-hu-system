export interface FieldI {
  id: string,
  label: string,
  required: boolean,
  type: string
}

export interface StatsI {
  currentTemp: number,
  currentHu: number,
  currentDate: Date,
  story: {
    temps: Array<number>,
    hus: Array<number>,
    dates: Array<Date>
  },
  error?: string
};

export interface UserI {
  name?: string,
  surname?: string,
  username: string,
  password: string
}

export enum GraphType {
  LINE = 'line',
  BAR = 'bar'
}
