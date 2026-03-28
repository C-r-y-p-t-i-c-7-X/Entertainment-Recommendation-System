export default async function handler(req, res) {
  const { id, type } = req.query;
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
    { headers: { Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}` } }
  );
  const data = await response.json();
  res.status(200).json(data);
}
