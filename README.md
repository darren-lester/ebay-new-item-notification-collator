#Ebay Item Notification Email Collator

A Google apps script for the eBay enthusiasts out there! The script will collate
all of your eBay new item notifications into a single html file and email you
this file for easy viewing of new items.

#Setup
1. Create a filter to add a label to all new ebay item emails and set the
variable _newItemLabelName_ equal to this label name.
2. Set a regular trigger (e.g. every 5 minutes) to run the
createNewEbayItemsDoc() function which will search for relevant emails and
collate them into a single doc.
3. Set a trigger to delete the created new items doc at a desired time
