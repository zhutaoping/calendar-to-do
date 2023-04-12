type EventDay = {
  day: number;
  month: number;
  year: number;
  events: {
    id: number;
    title: string;
    time: string;
  }[];
};
