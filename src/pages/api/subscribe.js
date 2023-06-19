export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const { email } = body;

  try {
    const data = await fetch('https://api.convertkit.com/v3/forms/1978116/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
      }),
    }).then((r) => r.json());

    res.status(200).json({
      status: 'Ok',
      data: {
        status: data.subscription?.state,
      },
    });
  } catch (e) {
    console.log(`Failed to add new subscriber: ${e.message}`);
    res.status(500).json({
      error: e.message,
    });
  }
}
