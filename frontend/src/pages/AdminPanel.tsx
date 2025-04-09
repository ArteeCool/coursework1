import { useEffect, useState } from "react";

interface Event {
  _id?: string;
  name: string;
  startsAt: string;
  endsAt: string;
  results?: string[];
}

const API_URL = "http://localhost:5000/api/events";

const AdminPanel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState({
    name: "",
    startsAt: "",
    endsAt: "",
    resultsText: "", // <--- textarea version
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEvents(data.data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload: Event = {
      name: form.name,
      startsAt: form.startsAt,
      endsAt: form.endsAt,
      results: form.resultsText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== ""),
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const updated = await res.json();
      setEvents((prev) => {
        if (editingId) {
          return prev.map((event) =>
            event._id === editingId ? updated.data : event
          );
        }
        return [...prev, updated.data];
      });

      // Очистка форми
      setForm({ name: "", startsAt: "", endsAt: "", resultsText: "" });
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEvents(events.filter((e) => e._id !== id));
    }
  };

  const handleEdit = (event: Event) => {
    setForm({
      name: event.name,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
      resultsText: (event.results || []).join("\n"),
    });
    setEditingId(event._id || null);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Form */}
      <div className="grid gap-4 mb-8 max-w-xl">
        <input
          type="text"
          name="name"
          placeholder="Назва події"
          value={form.name}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="text"
          name="startsAt"
          placeholder="Початок (DD/MM/YYYY)"
          value={form.startsAt}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="text"
          name="endsAt"
          placeholder="Кінець (DD/MM/YYYY)"
          value={form.endsAt}
          onChange={handleChange}
          className="border p-2"
        />
        <textarea
          name="resultsText"
          placeholder="Результати (кожен з нового рядка)"
          value={form.resultsText}
          onChange={handleChange}
          className="border p-2 h-32"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 rounded"
        >
          {editingId ? "Оновити подію" : "Створити подію"}
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{event.name}</h2>
              <p>Початок: {event.startsAt}</p>
              <p>Кінець: {event.endsAt}</p>
              {event.results && (
                <ul className="list-disc ml-4 mt-2 text-sm text-gray-600">
                  {event.results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Редагувати
              </button>
              <button
                onClick={() => handleDelete(event._id!)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
