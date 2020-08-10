const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

var app = express();

require('./db');
var UserRoute = require('./routes/userRoute'); 
var CovoitureRoute = require('./routes/covoitureRoute');
var AgencyRoute = require('./routes/agencyRoute');
var ReservationRoute = require('./routes/ReservationRoute');
var ReservationBusRoute = require('./routes/ReserveBusRoute');
var ContactRoute = require('./routes/ContactRoute');


app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({ localhost:4200, credentials: true, allowedHeaders: false}));


app.use('/covoiture', CovoitureRoute);
app.use('/user', UserRoute);
app.use('/agency', AgencyRoute);
app.use('/reservation', ReservationRoute);
app.use('/reservationBus', ReservationBusRoute);
app.use('/contact', ContactRoute);


app.listen(3000,()=>{
    console.log('server running correctly'); 
 });