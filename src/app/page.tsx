"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("GET error:", err));

    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        id,
        message: "Test Verisi",
      })
      .then((res) => setResponse(res.data))
      .catch((err) => console.error("POST error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Next.js Axios API Test</h1>

      {loading ? (
        <p className="text-red-500">Loading...</p>
      ) : (
        <>
          {data && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-red-500">Fetched Data:</h2>
              <pre className="bg-gray-200 p-4 rounded text-black">{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}

          {response && (
            <div>
              <h2 className="text-lg font-semibold text-red-500">Response from API:</h2>
              <pre className="bg-gray-200 p-4 rounded text-black">{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
