/**
 * Spins up an EC2 instance and serves a waiting page that redirects after 10 seconds.
 * 
 * - Lambda function requires the StartInstance 'write' permission.
 * 
 * Expected Environment Variables
 * - process.env.REDIRECT_URL = URL to redirect to after the server is powered on. 
 * - process.env.WAIT_TIME    = Wait time before redirecting to process.env.REDIRECT_URL.
 * - process.env.INSTANCE_ID  = EC2 instance ID to power on.
 */

// Wait time before redirecting, defaults to 10 seconds.
const waitTime = process.env?.WAIT_TIME || '10';

// Waiting page, automatically redirects to process.env.REDIRECT_URL
// A copy of this redirect page is in /redirect.html
const waitingPage = `<!doctype html><html lang="en" class="h-100"> <head> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"> <meta name="theme-color" content="#7952b3"> <meta http-equiv="refresh" content="${waitTime};url=${process.env.REDIRECT_URL}"/> </head> <body class="d-flex h-100 text-center text-white bg-dark"> <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"> <main class="px-3 my-auto"> <div class="spinner-border text-light" role="status"> <span class="sr-only"></span> </div><br/><br/> <h1>Starting the Server</h1> <p class="lead"> The server is powering on, you'll be redirected in a moment... </p></main> </div></body></html>`;

exports.handler = async (event, context) => {
  var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })

  var params = {
    InstanceIds: [
      process.env.INSTANCE_ID, // Set in the Lambda function configuration.
    ]
  };

  const response = await new Promise((resolve, reject) => {
    ec2.startInstances(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        resolve({
          statusCode: 200,
          headers: {
            "Content-type": "text/html"
          },
          body: waitingPage
        });
      }
    });
  });

  return response;
};
