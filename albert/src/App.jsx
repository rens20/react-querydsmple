import  { useState } from 'react';
import { useQuery } from 'react-query';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { refetch: searchRefetch, isLoading: isSearchLoading, isError: isSearchError, data: searchData, error: searchError }
   = useQuery(
    ['repoData', searchQuery],
    () => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`).then((res) => res.json())
  );

  const { refetch: randomRefetch } = useQuery(['randomRecipe'], async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    if (!response.ok) {
      throw new Error('Failed to fetch a random recipe');
    }

    const randomData = await response.json();
    return randomData;
  });

  const fetchMoreMeals = () => {
    searchRefetch();
    randomRefetch();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Trigger refetch when the search query changes
    searchRefetch();
  };

  if (isSearchLoading) return 'Loading...';

  if (isSearchError) return 'An error has occurred: ' + searchError.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md">
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for recipes..."
        />

        {searchData &&
          searchData.meals &&
          searchData.meals.map((meal) => (
            <div key={meal.idMeal} className="mb-4">
              <h1 className="text-xl font-bold mb-2">{meal.strMeal}</h1>
              <img className="w-full h-auto mb-2" src={meal.strMealThumb} alt={`Image of ${meal.strMeal}`} />
              <p className="text-gray-700 mb-2">{meal.strInstructions}</p>
              <strong className="text-blue-500">Category: {meal.strCategory}</strong>
              <strong className="text-green-500">Area: {meal.strArea}</strong>
            </div>
          ))}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={fetchMoreMeals}
        >
          Fetch More Recipes
        </button>
      </div>
    </div>
  );
}

export default App;


