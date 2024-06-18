## Features

- Add new members with attributes: First Name, Last Name, Date of Birth, Country, City.
- Ensure members are at least 18 years old.
- Display a list of all members.
- Sort members by upcoming birthdays, prioritizing those with birthdays today.
- Edit and delete members.
- Search for members by name.
- Display a special message for members with birthdays today.
- Toast notifications for actions and errors.

## Installation

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup

1. Clone the repository:

    git clone https://github.com/darius29/Birthday-tracker.git

    cd Birthday-tracker

2. Navigate to the backend directory:

    cd backend
   

3. Install backend dependencies:

    npm install

4. Create a `.env` file in the backend directory and add your MongoDB connection string:
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

5. Start the backend server:

    npm start

    The backend server will run on `http://localhost:5000`.


### Frontend Setup

1. Install frontend dependencies:

    npm install
2. Start the frontend server:

    npm start
    The frontend server will run on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the form to add new members.
3. View, edit, or delete existing members.
4. Search for members using the search bar.
5. See a special "Happy Birthday" message for members with birthdays today.

## API Documentation

### Get All Members

- **Endpoint**: `/members`
- **Method**: `GET`
- **Description**: Retrieve a list of all members.
- **Response**: JSON array of member objects.



### Add a Member

- **Endpoint**: `/members`
- **Method**: `POST`
- **Description**: Add a new member.
- **Request Body**: JSON object containing member details.
- **Response**: JSON object of the added member.

### Edit a Member

- **Endpoint**: `/members/:id`
- **Method**: `PUT`
- **Description**: Edit an existing member.
- **Request Body**: JSON object containing updated member details.
- **Response**: JSON object of the updated member.

### Delete a Member

- **Endpoint**: `/members/:id`
- **Method**: `DELETE`
- **Description**: Delete a member by ID.
- **Response**: JSON object with a success message.
