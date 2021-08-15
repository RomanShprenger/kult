export default function copyClipboard (text, successCallback, errorCallback) {
  navigator.clipboard.writeText(text).then(function() {
    successCallback && successCallback();
  }, function(err) {
    errorCallback && errorCallback(err);
  });
}
