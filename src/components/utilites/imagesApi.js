export default async function imageAPI(query,page) {
    

  const KEY = '38590666-b4e4facc0390580085af70521';

  const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.ok) {
        return response.json();
    }
    throw new Error('Something went wrong. Please contact us');
}
