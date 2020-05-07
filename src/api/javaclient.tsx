export default class Client {
  getLogSessions: any;
  // render() {
  //     return (  );
  // }

  testClient(params: any) {
    let result = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("POST", "http://localhost:8085/pe/j_spring_security_check");
      request.onreadystatechange = () => {
        let raw = request.responseText;
        let objectified = JSON.parse(raw);

        resolve(objectified);
      };
      request.send();
    });
  }
}
