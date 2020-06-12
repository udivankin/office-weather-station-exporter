const http = require('http');

const RESPONSE = `# HELP mhz19_temperature_celsius Temperature in celsius provided by MH-Z19 sensor
# TYPE mhz19_temperature_celsius gauge
mhz19_temperature_celsius 28.1

# HELP mhz19_pressure Pressure level in mmHg provided by MH-Z19 sensor
# TYPE mhz19_pressure gauge
mhz19_pressure 754.27

# HELP mhz19_co2 CO2 level in ppm provided by MH-Z19 sensor
# TYPE mhz19_co2 gauge
mhz19_co2 711`;

const RESPONSE_HEADERS = {
  'Content-type': 'text/plain',
  'Content-length': RESPONSE.length,
};

const requestListener = function (req, res) {
  res.writeHead(200, RESPONSE_HEADERS, http.STATUS_CODES[200]);
  res.writeHead(200);
  res.end(RESPONSE);
}

const server = http.createServer(requestListener);
server.listen(9100);