const moment = require("moment/moment");

const handleJobMapping = (jobs, interestedJobIds, mapView) => {
  return mapView === "true"
    ? jobs.map(({ _id, companyInfo, positionInfo, jobTitle, employmentType, createdAt }) => {
        return {
          jobTitle,
          createdAt,
          jobId: _id,
          employmentType,
          img: positionInfo?.image,
          salary: positionInfo?.salary,
          currency: positionInfo?.currency,
          homeBase: positionInfo?.homeBase,
          companyName: companyInfo?.companyName,
          currentlyLocated: positionInfo?.currentlyLocated,
        };
      })
    : jobs.map(({ _id, companyInfo, positionInfo, jobTitle, employmentType, createdAt }) => {
        return {
          createdAt,
          jobId: _id,
          img: positionInfo?.image,
          jobTitle,
          ...(interestedJobIds?.length > 0 && {
            interested: interestedJobIds.includes(_id.valueOf()),
          }),
          list: [
            `Starting ${moment(new Date(positionInfo?.startDate)).format("Do MMMM YYYY")}`,
            employmentType,
            `${companyInfo?.numOfHorses} horse ${companyInfo?.companyType}`,
            positionInfo?.currentlyLocated?.country,
            `${
              positionInfo?.salary
                ? `${positionInfo?.currency} ${positionInfo?.salary} Per Month`
                : "Salary: To Be Determined"
            }`,
          ],
        };
      });
};

module.exports = {
  handleJobMapping,
};
