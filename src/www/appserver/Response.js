export default class Response {

  constructor(
    webserver,
    requestId,
    status=200,
    body='',
    headers={
      'Content-Type': 'text/plain'
    }
  ) {
    this.webserver = webserver;
    this.requestId = requestId;
    this.status = status;
    this.body = body;
    this.headers = headers;
  }

  send() {
    this.webserver.sendResponse(
      this.requestId,
      {
        status: this.status,
        body: this.body,
        headers: this.headers
      }
    );
    return this;
  }

  status(status) {
    this.status = status;
    return this;
  }

  notFound(){
    return this.status(404).send();
  }

  methodNotAllowed() {
    return this.status(405).send();
  }

  ok() {
    return this.status(200).send();
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  json(data) {
    this.setHeader('Content-Type', 'application/json');
    this.body = JSON.stringify(data);
    return this;
  }
}
