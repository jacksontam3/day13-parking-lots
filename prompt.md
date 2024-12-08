**Frontend Structure**
Assume you are a senior software engineer. I am developing a frontend parking lot page. For now, let's divide the page into three components: a large component called `ParkingLot` that contains two smaller components, `ParkingLotOperator` and `ParkingLotSituation`. Don't implement the page yet; just build the structure of the components and render the `ParkingLot` component in `App.js`. Define all components using the format `const xxx = () => {}`.

**Simulating Parking Lots with Arrays**
Now, let's simulate some data in `ParkingLotContainer`:
1. Assume we have three parking lots named The Plaza Park (capacity of 9), City Mall Garage (capacity of 12), and Office Tower Parking (capacity of 9). Draw a table for each parking lot to show the parking situation. For example, a parking lot with a capacity of 9 should have a 3x3 table, and a parking lot with a capacity of 12 should have a 3x4 table. Do not show the outer border of the table, but show the inner borders. All three parking lots should be in the same row, and display the name of each parking lot below it.
2. Use three arrays to simulate the container of each parking lot. For example, if The Plaza Park has two cars parked, mark the first and second cells with an "x", leaving the other cells blank. If City Mall Garage has three cars parked, mark the first row's three cells with an "x". Office Tower Parking should have all cells blank.

Now, try replacing the "x" in the parking lot with a component. The component should be a rounded rectangle with a background color of `#b0f2b8` and display the license plate number. You can adjust the properties of the arrays in the simulated data.

**ParkingLotWorker**
Now let's implement `ParkingLotWorker`. This component has several elements:
1. An input field with the label "Plate Number". Use `setState` to maintain a variable `plateNumber`. Update `plateNumber` when the input field changes.
2. A dropdown with options Standard, Smart, and SuperSmart. Use `setState` to maintain a variable `parkingStrategy`. Update `parkingStrategy` when the dropdown changes.
3. A button labeled "Park". When clicked, log the `plateNumber` and `parkingStrategy`.
4. A button labeled "Fetch". When clicked, log the action.

All four elements should be in the same row, with some spacing between each element. The content within the elements and the elements themselves should have some padding. The background color of the two buttons should be `#a7d9fe`.

**Get Car**
Create a JavaScript file dedicated to requests. The `baseUrl` is `http://localhost:8080/parkinglot`. When the `ParkingLot` component is rendered, send a GET request to `http://localhost:8080/parkinglot` using Axios with `then`, `catch`, and `finally`. The response will be the data for all parking lots, as shown in the example below:
```json
[
  {
    "id": 1,
    "name": "The Plaza Park",
    "tickets": [
      { "plateNumber": "ABC 123", "position": 1, "parkingLot": 1 },
      { "plateNumber": "ABC 124", "position": 2, "parkingLot": 1 },
      { "plateNumber": "ABC 125", "position": 3, "parkingLot": 1 }
    ]
  },
  {
    "id": 2,
    "name": "City Mall Garage",
    "tickets": []
  },
  {
    "id": 3,
    "name": "Office Tower Parking",
    "tickets": []
  }
]
```
The `name` is the name of the parking lot, and `tickets` represent the situation of the parking lot. `plateNumber` is the license plate number, used to render the `Car` component. `position` is the position in the parking lot, which corresponds to the table position in `ParkingLotContainer`. Use the data from this API to reconstruct the arrays in `ParkingLotProvider` and render the data in `ParkingLotContainer`. Use `useContext` to manage the arrays and `useReducer` to trigger data changes.

**Park**
In `ParkingLotWorker`, when the user inputs the Plate Number and Parking Strategy and clicks Park, send a POST request with these parameters in the body to the backend at `baseUrl + /park`. The backend returns the following data structure:
```json
{
  "plateNumber": "ABC 123",
  "position": 4,
  "parkingLot": 3
}
```
`plateNumber` is the license plate number for this park action, and `parkingLot` is the ID of the parking lot (we define The Plaza Park's ID as 1, City Mall Garage's ID as 2, and Office Tower Parking's ID as 3, and these IDs do not change). This example indicates that ABC 123 is parked in position 4 of parking lot 3 (Office Tower Parking). Render a `Car` component at the corresponding position in the parking lot without sending another GET request.

**Fetch**
In `ParkingLotWorker`, when the user inputs the Plate Number and clicks Fetch, send a POST request with the Plate Number in the body to the backend at `baseUrl + /fetch`. The backend returns the following data structure:
```json
{
  "plateNumber": "ABC 123"
}
```
`plateNumber` is the license plate number for this fetch action. Remove the car with this license plate from the parking lot.

---
