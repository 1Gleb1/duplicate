const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '7877f4ead5bbdf08d7a1728914da3228',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;


