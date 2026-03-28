export default async function handler(req, res) {
  const { type, genre, country, year, sort, page } = req.query;
  const mediaType = type || 'movie';

  const params = new URLSearchParams({
    language: 'en-US',
    sort_by: sort || 'popularity.desc',
    page: page || '1',
    include_adult: 'false',
    ...(genre && { with_genres: genre }),
    ...(country && { with_origin_country: country }),
    ...(year && mediaType === 'movie' && { primary_release_year: year }),
    ...(year && mediaType === 'tv' && { first_air_date_year: year }),
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/${mediaType}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
