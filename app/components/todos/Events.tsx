export default function Events() {
  const eventsArr = [
    {
      day: 13,
      month: 11,
      year: 2022,
      events: [
        {
          title: "Try to get some sleep",
          time: "10:00 AM",
        },
        {
          title: "Event 2",
          time: "11:00 AM",
        },
      ],
    },
  ];

  return (
    <div>
      {eventsArr.map((e) => (
        <div key={e.day}>
          <h1>{e.day}</h1>
          {e.events.map((ev) => (
            <div key={ev.title}>
              <h2>{ev.title}</h2>
              <h3>{ev.time}</h3>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
