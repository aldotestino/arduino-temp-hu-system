export default interface Stats {
  currentTemp?: number,
  currentHu?: number,
  currentDate?: Date,
  story: {
    temps: Array<number>,
    hus: Array<number>,
    dates: Array<Date>
  }
};