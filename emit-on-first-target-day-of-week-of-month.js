// Cron syntax has no way to specify "first Monday of every month",
// so this runs once a day for the first 7 days of the month, and exits
// early if it's _not_ our targetDayOfWeek. See https://superuser.com/a/429617
module.exports = {
  name: "emit-on-first-target-day-of-week-of-month",
  version: "0.0.1",
  props: {
    timer: {
      type: "$.interface.timer",
      default: {
        cron: "0 12 1-7 * *", // Run once a day, at Noon UTC, for the first 7 days of the month
      },
    },
    targetDayOfWeek: {
      type: "string",
      label: "Target Weekday",
      description:
        "This event source emits an event on this first weekday of the month",
      options(opts) {
        const daysOfWeek = [
          {
            label: "Sunday",
            value: 0,
          },
          {
            label: "Monday",
            value: 1,
          },
          {
            label: "Tuesday",
            value: 2,
          },
          {
            label: "Wednesday",
            value: 3,
          },
          {
            label: "Thursday",
            value: 4,
          },
          {
            label: "Friday",
            value: 5,
          },
          {
            label: "Saturday",
            value: 6,
          },
        ];
        return daysOfWeek.map((day) => {
          const { label, value } = day;
          return { label, value };
        });
      },
    },
  },
  async run() {
    const currentDay = new Date().getDay(); // In UTC

    console.log(typeof this.targetDayOfWeek);
    if (currentDay === parseInt(this.targetDayOfWeek)) {
      this.$emit(
        {
          dayOfWeek: this.targetDayOfWeek,
        },
        { summary: "First target day of the month" }
      );
    }
  },
};
