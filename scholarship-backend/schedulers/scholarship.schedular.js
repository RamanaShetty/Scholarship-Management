const cron = require("node-cron");
const db = require("../configuration/db");

const updateScholarshipStatus = async () => {
  try {
    const currentDate = new Date();
    const [result] = await db
      .promise()
      .query(
        `UPDATE scholarships SET status = 'inactive' WHERE deadline < ? AND status = 'active'`,
        [currentDate]
      );
    console.log(`${result.affectedRows} scholarships marked inactive`);
  } catch (error) {
    console.error("Error updating scholarship statuses:", error);
  }
};

const scheduleScholarshipStatusUpdate = () => {
  cron.schedule("0 0 * * *", () => {
    console.log("Running daily job to update scholarship statuses");
    updateScholarshipStatus();
  });
};

module.exports = scheduleScholarshipStatusUpdate;
