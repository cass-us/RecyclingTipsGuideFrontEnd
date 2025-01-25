import { useState, useEffect } from 'react';

const useFetchData = () => {
  const [categories, setCategories] = useState([]);
  const [disposalGuide, setDisposalGuide] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/waste-category/getAllCategories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError('Error fetching categories');
        console.error(error);
      }
    };


    const fetchDisposalGuides = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/disposal-guidelines/getAllGuides');
        const data = await response.json();
        setDisposalGuide(data);
      } catch (error) {
        setError('Error fetching disposal guides');
        console.error(error);
      }
    };

    const fetchData = async () => {
      setLoading(true);  
      await Promise.all([fetchCategories(), fetchDisposalGuides()]);
      setLoading(false);  
    };

    fetchData();
  }, []);

  return { categories, disposalGuide, loading, error };
};

export default useFetchData;
