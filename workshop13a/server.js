const cron = require("node-cron");
const fs = require("fs");

cron.schedule("* * * * * *", () => {
  fs.appendFile("./file.txt", "\n", function (error) {
    if (error) throw error;
  });

  let currentTime = new Date();
  var content = "Current local time is:" + currentTime.toLocaleTimeString();
  console.log(content);

  fs.appendFile("./file.txt", content, function (error) {
    if (error) throw error;
  });
});
