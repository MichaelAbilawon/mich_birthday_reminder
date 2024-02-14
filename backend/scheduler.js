const cron = require("node-cron");
const mailgun = require("mailgun-js");
const user = require("./models/details");
const dotenv = require("dotenv");
dotenv.config();

// Initialize Mailgun with API key and domain
const mg = mailgun({
  apiKey: process.env.MAILGUN_API,
  domain: process.env.MAILGUN_DOMAIN,
});

// Define a function to set up the cron job
const scheduleJob = () =>
  new Promise((resolve, reject) => {
    // Check if there are users in the database
    try {
      const job = cron.schedule("0 7 * * *", async () => {
        try {
          // Get users with birthday today
          const today = new Date();
          const upcomingBirthdays = await user.find({
            dateOfBirth: {
              $gte: today,
            },
          });

          // Send birthday emails
          for (const user of upcomingBirthdays) {
            const data = {
              from: process.env.MAILGUN_EMAIL,
              to: user.email,
              subject: "Birthday Wishes 🥳🎈",
              text: `Dear ${user.username}, \n\n Happy Birthday! I hope you have an amazing day filled with love and celebration!`,
            };

            await mg.messages().send(data);
            console.log(`Birthday email sent to ${user.email}`);
          }
        } catch (error) {
          console.error("Error in cron job: " + error.message);
        }
      });

      resolve(job);
    } catch (error) {
      reject(error);
    }
  });

// Schedule the job and handle promise rejection
scheduleJob()
  .then((job) => {
    console.log("Cron Job scheduled to run every day at 7 am.");

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (error) => {
      console.error("Unhandled Promise Rejection:", error);
      job.stop(); // Stop the cron job to prevent it from continuing after an error
    });
  })
  .catch((error) => console.error("Error scheduling cron job:", error));
