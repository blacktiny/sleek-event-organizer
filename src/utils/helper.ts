type EventCalendarType = {
  startTimestamp: string;
  endTimestamp: string;
};

export const formatNumber = (value: number | string) => {
  if (!value) return '0.00';

  const strValue = value.toString();
  const arrValue = strValue.split('.');
  let formatted = '';

  if (arrValue[0].length > 3) {
    for (let i = arrValue[0].length; i > 0; i -= 3) {
      if (i === arrValue[0].length) formatted = arrValue[0].substring(i - 3, i);
      else formatted = `${arrValue[0].substring(i - 3, i) || ''},${formatted}`;
    }
  } else {
    formatted = arrValue[0] || '';
  }

  return arrValue[1] ? `${formatted}.${arrValue[1]}` : formatted;
};

export const parseEventCalendar = (eventCalendar: EventCalendarType) => {
  if (!eventCalendar) {
    return {
      date: '',
      startTime: '',
      endTime: '',
    };
  }

  const { startTimestamp = '', endTimestamp = '' } = eventCalendar;

  if (!startTimestamp) {
    return {
      date: '',
      startTime: '',
      endTime: '',
    };
  }

  const eventStart = new Date(startTimestamp);
  const eventEnd = new Date(endTimestamp);

  const startTimeHours = eventStart.getUTCHours();
  const startTimeMinutes = eventStart.getUTCMinutes();
  const endTimeHours = eventEnd.getUTCHours();
  const endTimeMinutes = eventEnd.getUTCMinutes();

  return {
    date: eventStart.toDateString(),
    startTime: `${startTimeHours > 12 ? startTimeHours - 12 : startTimeHours}:${
      startTimeMinutes < 10 ? `0${startTimeMinutes}` : startTimeMinutes
    } ${startTimeHours > 12 ? 'pm' : 'am'}`,
    endTime: `${endTimeHours > 12 ? endTimeHours - 12 : endTimeHours}:${
      endTimeMinutes < 10 ? `0${endTimeMinutes}` : endTimeMinutes
    } ${endTimeHours > 12 ? 'pm' : 'am'}`,
  };
};

export const getOrganizerId = () => {
  const organizerId = localStorage.getItem('organizer_id');
  if (organizerId !== undefined && organizerId) {
    return organizerId;
  }

  return '';
};

export const uploadImage = async (image: any, dispatch: any) => {
  if (image) {
    const blobImage = image.preview ? await fetch(image.preview).then((r) => r.blob()) : null;
    if (blobImage) {
      const imageFile = new File([blobImage], `${Date.now()}_${image.name.replace(' ', '_')}`, {
        type: image.type,
        lastModified: new Date().getTime(),
      });

      const form = new FormData();
      form.append('file', imageFile, imageFile.name);

      await dispatch({
        type: 'user/uploadAvatar',
        payload: {
          data: form,
        },
      });

      return `https://cdn.app.sleek.fyi/userImages/${imageFile.name}`;
    }
  }

  return '';
};
