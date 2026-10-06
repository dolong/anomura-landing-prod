

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ isError: true, });
    return;
  }
  const {
    path, secret,
  } = req.body;
  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    console.log("Revalidate request for " + path)
    await res.revalidate(path)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}