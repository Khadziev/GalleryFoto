require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
const useragent = require('express-useragent');
const moment = require('moment');
const momentTimezone = require('moment-timezone');
const IpAddress = require('./models/IpAddress.model');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/image', express.static(path.resolve(__dirname, 'image')));

app.set('trust proxy', true);



app.use(async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress;
  
  const existingEntry = await IpAddress.findOne({ ip });
  if (!existingEntry) {
    const source = req.headers['user-agent'];
    const agent = useragent.parse(source);
    const device = agent.isDesktop ? "Desktop" : agent.isMobile ? "Mobile" : agent.isTablet ? "Tablet" : "Unknown";
    const time = moment().tz("Europe/Moscow").format("DD.MM.YYYY HH:mm:ss");

    try {
      await IpAddress.create({ ip, device, time });
    } catch (err) {
      console.error("Error:", err);
    }
  }
  next();
});

app.use(require('./routes/users.route'));
app.use(require('./routes/data.routes'));
app.use(require('./routes/gallery.route'));
app.use(require('./routes/event.route'));
app.use(require('./routes/comments.route'));

app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => console.log('Connected...'));