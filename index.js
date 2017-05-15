/**
 * Triggered from a message on a Cloud Storage bucket.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
const vision = require('@google-cloud/vision')();
const storage = require('@google-cloud/storage')();


exports.processFile = function(event, callback) {
  let file = event.data;
  
  console.log('Processing file: ' + event.data.name);
  
  file = storage.bucket(file.bucket).file(file.name);
  
  return detectText(file);
  
  callback();
};

function detectText (file) {
  let text;

  console.log(`Looking for text in image: ${file.name}`);
 
  return vision.detectLabels(file)
    .then((results) => {
      const labels = results[0];

      console.log('Labels:');
      labels.forEach((label) => console.log(label));
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
 
}
