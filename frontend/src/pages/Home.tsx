import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { ObjectId } from "mongodb";

export interface Event {
  _id: ObjectId;
  name: string;
  startsAt: string;
  endsAt: string;
  results?: string[];
}

const Home = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => setEventsData(data.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const parseDateFromDDMMYYYY = (dateString: string) => {
    const parts = dateString.split("/");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);

    return new Date(year, month, day);
  };

  const now = new Date();

  const upcomingEvents = eventsData.filter(
    (event) => parseDateFromDDMMYYYY(event.endsAt) > now
  );

  const endedEvents = eventsData.filter(
    (event) => parseDateFromDDMMYYYY(event.endsAt) <= now
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Найближчі події</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => {
            return <EventCard key={event._id.toString()} event={event} />;
          })
        ) : (
          <p className="text-gray-500 text-lg">Немає найближчих подій</p>
        )}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mt-12 mb-6">
        Завершені події
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {endedEvents.length > 0 ? (
          endedEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))
        ) : (
          <p className="text-gray-500 text-lg">Немає завершених подій</p>
        )}
      </div>
    </div>
  );
};

export default Home;
