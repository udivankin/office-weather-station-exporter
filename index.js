const http = require('http');

let data = {};

const getResponse = () => `# HELP mhz19_temperature_celsius Temperature in celsius provided by MH-Z19 sensor
# TYPE mhz19_temperature_celsius gauge
mhz19_temperature_celsius ${data.temp}

# HELP mhz19_pressure Pressure level in mmHg provided by MH-Z19 sensor
# TYPE mhz19_pressure gauge
mhz19_pressure ${data.pressure}

# HELP mhz19_co2 CO2 level in ppm provided by MH-Z19 sensor
# TYPE mhz19_co2 gauge
mhz19_co2 ${data.co2}`;

const getHeaders = (response) => ({
  'Content-type': 'text/plain',
  'Content-length': response.length,
});

const handleGet = (req, res) => {
  const response = getResponse();
  const headers = getHeaders(response);
  res.writeHead(200, headers, http.STATUS_CODES[200]);
  res.end(response);
};

const handlePost = (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    data = JSON.parse(body);
    res.end('ok');
  });
}

const requestListener = (req, res) => {
  return req.method === 'POST' ? handlePost(req, res) : handleGet(req, res);
}

const server = http.createServer(requestListener);
server.listen(9100);