// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function http (req) {
  console.log(req);
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: `This message was returned from your secure http route. Node_ENV=${process.env.NODE_ENV}`
  }
}
