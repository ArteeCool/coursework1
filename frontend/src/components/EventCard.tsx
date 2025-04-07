import { Event } from "../pages/Home.tsx";

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-900">{event.name}</h2>
      <p className="text-gray-600 text-sm mt-1">
        <strong>Початок:</strong> {event.startsAt}
      </p>
      <p className="text-gray-600 text-sm">
        <strong>Кінець:</strong> {event.endsAt}
      </p>
      {event.results && event.results.length > 0 ? (
        <div className="mt-3">
          <p className="text-gray-700 font-medium">Результати:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            {event.results.map((result, i) => (
              <li key={i}>{result}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-2">Немає результатів</p>
      )}
    </div>
  );
};

export default EventCard;
