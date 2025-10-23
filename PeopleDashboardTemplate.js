
async function getPeople() {
	try {
	  const response = await fetch("https://randomuser.me/api/?results=25&nat=us");
	  if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status}`);
	  }
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error(`Could not get names: ${error}`);
	}
  }
  
  async function buildTable() {
	try {
	  const data = await getPeople();
	  const people = data.results;
  
	  // Sort alphabetically by last name
	  people.sort((a, b) => a.name.last.localeCompare(b.name.last));
  
	  // Loop through each person and build rows
	  people.forEach(person => {
		const name = `${person.name.first} ${person.name.last}`;
		const address = `${person.location.street.number} ${person.location.street.name}`;
		const city = person.location.city;
		const state = person.location.state;
		const zip = person.location.postcode;
		const lat = person.location.coordinates.latitude;
		const lon = person.location.coordinates.longitude;
		const phone = person.phone;
  
		// Build the row with tooltip
		const row = `
		  <tr title="Phone: ${phone}">
			<td>${name}</td>
			<td>${address}</td>
			<td>${city}</td>
			<td>${state}</td>
			<td>${zip}</td>
			<td>${lat}</td>
			<td>${lon}</td>
		  </tr>
		`;
  
		// Add the row to the table
		$("#people").append(row);
	  });
  
	} catch (e) {
	  console.log("Error: " + e);
	}
  }
  
  // Run when the page loads
  $(document).ready(() => {
	buildTable();
  });
