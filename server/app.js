let express = require('express');
let app = express();
app.use(express.json());
let cors = require('cors');
app.use(cors());
let port = 8080;
var data = [];
let id = 0;

app.post('/patients', (req, res) => {
    let request = req.body;
    if (!request.fullName) {
        return res.status(400).json({ "message": "Full Name Required Field" });
    } else if (typeof request.age !== "number") {
        return res.status(400).json({ "message": "Age must be a number" });
    } else {
        id++;
        data.push({
            "id": id,
            "fullName": request.fullName,
            "age": request.age,
            "gender": request.gender,
            "conditionDescription": request.conditionDescription,
            "registrationDate": new Date()
        });
        return res.status(200).json({ "message": "Patient Added Sucessfully" });
    }
});

app.get('/patients', (req, res) => {
    if (data.length) {
        return res.status(200).json({ "message": "Records Found", "data": data });
    } else {
        return res.status(404).json({ "message": "Records Not Found" });
    }
});

app.delete('/patients/:id', (req, res) => {
    let patientId = parseInt(req.params.id);
    let initialLength = data.length;
    data = data.filter(a => a.id !== patientId);
    if (data.length < initialLength) {
        return res.status(200).json({ "message": "Record Deleted Sucessfully" });
    } else {
        return res.status(404).json({ "message": "Record not found" });
    }
});

app.listen(port, () => {
    console.log("port start at ", port)
});