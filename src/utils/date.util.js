import dayjs from 'dayjs';

export const formatDate = (date, format, valueReturn = null) => {
  if (date) {
    return dayjs(date).format(format);
  }

  return valueReturn;
};