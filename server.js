const express = require("express");
const fs = require("fs");

const app = express();

// Use the 'public' folder to serve static files
app.use(express.static("public"));

// Use the json middleware to get JSON data
app.use(express.json());

// Handle any GET requests for the path '/students/all'
app.get("/students/all", (req, res) => {
    // Read students from the file
    const students = JSON.parse(fs.readFileSync("students.json"));
    
    // Return the students
    res.json(students);
});

// Handle any POST requests for the path '/students/add'
app.post("/students/add", (req, res) => {
    // Get the fields
    const { id, name, year } = req.body;

    // Read students from the file
    const students = JSON.parse(fs.readFileSync("students.json"));

    // If id exists, return error
    if (students[id]) {
        res.json({ error: "Student already exists." });
        return;
    }

    // Add the student and save the file
    students[id] = { name, year };
    fs.writeFileSync("students.json",
                     JSON.stringify(students, null, "  "));
    
    // Return success
    res.json({ success: true });
});

// Handle any POST requests for the path '/students/change'
app.post("/students/change", (req, res) => {
    // Get the fields
    const { id, name, year } = req.body;

    // Read students from the file
    const students = JSON.parse(fs.readFileSync("students.json"));

    // If id does not exist, return error
    if (!students[id]) {
        res.json({ error: "Student does not exist." });
        return;
    }

    // Change the student and save the file
    students[id] = { name, year };
    fs.writeFileSync("students.json",
                     JSON.stringify(students, null, "  "));
    
    // Return success
    res.json({ success: true });
});

// Handle any POST requests for the path '/students/delete'
app.post("/students/delete", (req, res) => {
    // Get the id field
    const { id } = req.body;

    // Read students from the file
    const students = JSON.parse(fs.readFileSync("students.json"));

    if (students[id]) {
        // Delete the student and save the file
        delete students[id];
        fs.writeFileSync("students.json",
                         JSON.stringify(students, null, "  "));
    }

    // Return success
    res.json({ success: true });
});

// Use a web server to listen at port 8000
app.listen(8000);
