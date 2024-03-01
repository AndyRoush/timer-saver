import React, { useState } from "react";

// name, bday, death date, height, known for, role, summary, img and img link, imdb ID

// Placeholder for the actual API call
const fetchApiDataById = async (id) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const apiKey = process.env.REACT_APP_IMDB_KEY;
  // Example URL, replace with your actual API endpoint
  const apiUrl = `https://tv-api.com/en/API/Name/${apiKey}/${id}`;

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    // Assuming the API returns data in a format that includes the id and some data
    // return console.log(data); // Adjust according to your actual API response structure
    return data; // Adjust according to your actual API response structure
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

const ImdbTalentSearchBulk = () => {
  const [idsInput, setIdsInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = idsInput.split(" ").filter(Boolean); // Split input by spaces and filter out any empty strings
    setIsLoading(true);
    try {
      // Use async/await and Promise.all to wait for all API calls to complete
      const responses = await Promise.all(
        ids.map((id) => fetchApiDataById(id))
      );
      setResults(responses);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={idsInput}
          onChange={(e) => setIdsInput(e.target.value)}
          placeholder="Enter IDs separated by space"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th style={{width: "20px"}}>Image</th>
              <th>Name</th>
              <th>ID</th>
              <th>Birth Date</th>
              <th>Height</th>
              <th>Death Date</th>
              <th>Known For</th>
              <th>Role</th>
              <th>img link</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td style={{width: "20px"}}>{result.image}</td>
                <td>{result.name}</td>
                <td>{result.id}</td>
                <td>{result.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ImdbTalentSearchBulk;
