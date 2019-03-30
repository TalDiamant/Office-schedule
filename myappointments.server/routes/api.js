var express = require('express');
var router = express.Router();

var mysql = require('promise-mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Tv121212',
    database: 'myappointments',
    connectionLimit: 10
});

//add new appointment
router.post('/addappointment', async (req, res, next) => {

    debugger

    //getting the length of meeting
    var fixedDate = req.body.date.slice(0, 10);
    var cutStart = req.body.start
    var hours = cutStart.slice(0, 2)
    var minutes = cutStart.slice(3);

    var fixedStart = new Date();
    fixedStart.setHours(hours);
    fixedStart.setMinutes(minutes);

    var fixedEnd = new Date(fixedStart.getTime() + req.body.length * 60000).toLocaleTimeString().slice(0, 5);


    var query = `INSERT INTO appointments (name, description , date , start , end , groupID) 
    VALUES ('${req.body.name}','${req.body.description}', '${fixedDate}', '${cutStart}', '${fixedEnd}', ${req.body.groupID} )`;

    console.log(query);//for check
    await pool.query(query)
    res.json({ msg: "appointment added" });
});

//watch all appointment
router.get('/getallappointments', async (req, res, next) => {

    let appointments = await pool.query(`SELECT * FROM appointments`);
    let groups = await pool.query(`SELECT * FROM groups`);

    var results = appointments.map(function (appointment) {
        let groupObj = groups.find(function (group) {
            return group.ID == appointment.groupID
        })

        return {
            ID: appointment.ID,
            name: appointment.name,
            description: appointment.description,
            date: appointment.date,
            start: appointment.start,
            end: appointment.end,
            groupID: groupObj.groupname
        }
    })

    res.json(results);

});

//get all groups
router.get('/getallgroups', async (req, res, next) => {

    let result = await pool.query(`SELECT * FROM groups`);
    res.json(result);
});

//insert new group
router.get('/insertgroups', async (req, res) => {
    await pool.query(`INSERT INTO groups (groupname) VALUES ('Team A') `);
    await pool.query(`INSERT INTO groups (groupname) VALUES ('Team B') `);
    await pool.query(`INSERT INTO groups (groupname) VALUES ('Team C') `);
    await pool.query(`INSERT INTO groups (groupname) VALUES ('Team D') `);

    res.json({
        msg: "groups inserted"
    })

});

//create DB snd tables 
router.get('/createdbandtables', async (req, res) => {
    /*create DB myappointments*/
    await pool.query(`CREATE DATABASE myappointments`);

    /*create table groups*/
    await pool.query(`CREATE TABLE myappointments.groups (
        ID int NOT NULL AUTO_INCREMENT,
        groupname varchar(5) NOT NULL ,
        PRIMARY KEY (ID) )`)

    /*create table appointments*/
    await pool.query(`CREATE TABLE myappointments.appointments (
        ID int NOT NULL AUTO_INCREMENT,
        name varchar(15) NOT NULL ,
        description varchar(10) NOT NULL ,
        date varchar(10) NOT NULL ,
        start varchar(10) NOT NULL ,
        end varchar(10) NOT NULL ,
        groupID int(11),
        PRIMARY KEY (ID) )`)

    res.json({
        msg: "db and tables created"
    })
});

module.exports = router;