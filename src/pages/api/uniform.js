export default (req, res) => {
  res.statusCode = 200;

  res.setHeader('Set-Cookie', 'mycookie=value; path=/; expires=Sat, 01 Jan 2022 00:00:00 GMT');

  res.json({ name: 'John Doe' });
};
