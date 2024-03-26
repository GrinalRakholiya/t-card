import moment, { Moment } from 'moment';

export interface TimeParams {
  start_time: string | Moment | undefined;
  working_start_time: string;
  working_end_time: string;
  working_days: number;
}

export function calculateTime(currentTime: string | moment.Moment | undefined, params: TimeParams): string {
  const currentISTTime = currentTime;

  console.log('start', params.start_time, 'current', currentISTTime);

  const { start_time, working_start_time, working_end_time, working_days } = params;

  const startTime = moment(start_time);
  const currentTimeMoment = moment();
  const workingStartTime = moment(working_start_time, 'HH:mm');
  const workingEndTime = moment(working_end_time, 'HH:mm');

  let totalTime = 0;

  const tempTime = startTime.clone();
  while (tempTime.isBefore(currentTimeMoment)) {
    let weekendDays: number[] = [];
    if (working_days === 4) {
      // For 4 working days, consider only Friday, Saturday and Sunday as holidays
      weekendDays = [5, 6, 0]; // 6: Saturday, 0: Sunday
    } else if (working_days === 5) {
      // For 4 working days, consider only Saturday and Sunday as holidays
      weekendDays = [6, 0]; // 6: Saturday, 0: Sunday
    } else {
      weekendDays = [6, 0]; // 6: Saturday, 0: Sunday
    }

    const isWeekend = weekendDays.includes(tempTime.day());
    // const isWeekend = [0, 6].includes(tempTime.day()); // 0: Sunday, 6: Saturday

    const isWorkingHours = tempTime.isBetween(
      tempTime.clone().set({
        hour: workingStartTime.hour(),
        minute: workingStartTime.minute(),
      }),
      tempTime.clone().set({ hour: workingEndTime.hour(), minute: workingEndTime.minute() }),
      'hours',
      '[)'
    );

    if (!isWeekend && isWorkingHours) {
      totalTime += 1;
    }

    tempTime.add(1, 'hour');
  }

  const totalShiftWorkingHours = workingEndTime.diff(workingStartTime, 'hours');
  const days = Math.floor(totalTime / totalShiftWorkingHours);
  console.log('totalTime', totalTime);
  const hours = totalTime % totalShiftWorkingHours;

  return `${days}d ${hours}h`;
}
