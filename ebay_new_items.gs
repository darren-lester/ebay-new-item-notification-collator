var newItemLabelName = "new-ebay-items";
var newItemsFileName = newItemLabelName + ".html";

function createNewEbayItemsDoc() {
  // get all ebay new items threads
  var label = GmailApp.getUserLabelByName(newItemLabelName);
  var threads = label.getThreads();
  
  // return if no relevant threads
  if (threads.length === 0) {
    return;
  }
  
  var messageBodies = [];
  
  // collate all new item message bodies
  for (var i = 0; i < threads.length; ++i) {
    var message = threads[i].getMessages()[0];
    
    if (message.isUnread()) {
      messageBodies.push(message.getBody());
    }
  }
  
  // get any existing new item files
  var files = DriveApp.getFilesByName(newItemLabelName);
  
  // collate all of the existing new items files
  var oldData = [];
  while (files.hasNext()) {
    
    var file = files.next();
    
    if (!file.isTrashed()){
      oldData.push(file.getBlob().getDataAsString());
      file.setTrashed(true);
    }    
  }
  
  // combine existing and new messages and write to html file
  var body = oldData.join("\n") + messageBodies.join("\n");
  var newItemsFile = DriveApp.createFile(newItemsFileName, body, "text/html");
    
  // remove lanels from messages and move to trash
  for (var i = 0; i < threads.length; ++i) {
    threads[i].removeLabel(label).moveToTrash();
  }
  
  sendAlertEmail(newItemsFile);
}

function sendAlertEmail(newItemsFile) {
  var notificationRecipient = Session.getActiveUser().getEmail();
  var notificationSubject = "New Ebay Items Notification (" + (new Date()) + ")";
  var notificationBody = "";
  var notificationOptions = {attachments: [newItemsFile.getBlob()]};
  
  GmailApp.sendEmail(notificationRecipient, notificationSubject, notificationBody, notificationOptions);
}

function deleteNewEbayItemsDoc() {
  // get new items file
  var newItemsFiles = DriveApp.getFilesByName(newItemsFileName);
  
  // remove new items file
  while (newItemsFiles.hasNext()) {
    var file = newItemsFiles.next();
    DriveApp.removeFile(file);
  }
}
