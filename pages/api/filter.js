export default async function handler(req, res) {
  const { type, genre, country, year, sort, page } = req.query;
  const mediaType = type || 'movie';

  const today = new Date().toISOString().split('T')[0];

  // Build date filters based on sort mode
  let sortBy = sort || 'popularity.desc';
  let extraParams = {};

  if (sort === 'upcoming') {
    // Only show content releasing in the future
    sortBy = 'primary_release_date.asc';
    if (mediaType === 'movie') {
      extraParams['primary_release_date.gte'] = today;
    } else {
      extraParams['first_air_date.gte'] = today;
      sortBy = 'first_air_date.asc';
    }
  } else if (sort === 'released.desc') {
    // Only show content already released
    sortBy = 'primary_release_date.desc';
    if (mediaType === 'movie') {
      extraParams['primary_release_date.lte'] = today;
    } else {
      extraParams['first_air_date.lte'] = today;
      sortBy = 'first_air_date.desc';
    }
  }

  const params = new URLSearchParams({
    language: 'en-US',
    sort_by: sortBy,
    page: page || '1',
    include_adult: 'false',
    ...extraParams,
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
