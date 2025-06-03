const notificationQueue = require("../config/notificationQueue");

async function notifyNewJobPosted(jobData) {
  await notificationQueue.add("newJobPosted", jobData);
}

async function notifyNewBid(bidData) {
  await notificationQueue.add("newBidReceived", bidData);
}

async function notifyMilestoneUpdate(milestoneData) {
  await notificationQueue.add("milestoneUpdated", milestoneData);
}

module.exports = {
  notifyNewJobPosted,
  notifyNewBid,
  notifyMilestoneUpdate,
};
