export const success = (res: any, data: any = null, message = 'OK', status = 200) => {
  return res.status(status).json({ success: true, message, data });
};

export const error = (res: any, message = 'Error', status = 500, details: any = null) => {
  return res.status(status).json({ success: false, message, details });
};
