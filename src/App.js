import { useEffect, useState } from 'react';
import './App.css';
import WeatherCondition from './condition/WeatherCondition';
import ErrorBoundary from './error_boundary/ErrorBoundary';
import SearchBox from './searchbox/SearchBox';

let months = [
  { text: 'Jan', val: 1 },
  { text: 'Feb', val: 2 },
  { text: 'Mar', val: 3 },
  { text: 'Apr', val: 4 },
  { text: 'May', val: 5 },
  { text: 'Jun', val: 6 },
  { text: 'Jul', val: 7 },
  { text: 'Aug', val: 8 },
  { text: 'Sept', val: 9 },
  { text: 'Oct', val: 10 },
  { text: 'Nov', val: 11 },
  { text: 'Dec', val: 12 }
]

function App() {
  const [data, setData] = useState('');
  const [dataGetted, setDataGetted] = useState(false);
  const [searchVal, setSearchVal] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const [recentList, setRecentList] = useState([])
  const [error, setError] = useState(false)

  const getValueFromAPI = async (val) => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d8e413bafdfc4bd09ba120244222201&q=${val.trim()}&days=2&aqi=no&alerts=no`);
    if (!response.ok) {
      setError(true)
      throw new Error('Something went wrong')
    } else {
      setError(false)
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const getVal = async () => {
      const data = await getValueFromAPI('tirunelveli')
      setData(data)
      setDataGetted(true)
    }
    try {
      getVal()
    } catch (err) {
      setError(true)
      throw new Error('Something went wrong')
    }
  }, [])

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
    if (e.target.value.split('').length > 0) {
      setSearchActive(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let copyRecentList = [...recentList];
    if (copyRecentList.length >= 4) {
      copyRecentList.length = 4;
    }
    let isThere = copyRecentList.find(item => item === searchVal)
    if (!isThere || copyRecentList.length <= 0) {
      let toUpper = searchVal.charAt(0).toUpperCase();
      let toArr = searchVal.split('')
      toArr.splice(0, 1, toUpper)
      copyRecentList.unshift(toArr.join(''));
      const data = await getValueFromAPI(searchVal)
      setData(data)
      setSearchVal('')
    }
    setRecentList(copyRecentList)
  }

  const handleRecentItem = async (value) => {
    let filterList = recentList.filter(item => item.toLowerCase() !== value.toLowerCase())
    filterList.unshift(value);
    const data = await getValueFromAPI(value)
    setRecentList(filterList)
    setData(data)
    // setSearchVal(value)
  }

  const handleRecentItemRemove = (value) => {
    let filterList = recentList.filter(item => item.toLowerCase() !== value.toLowerCase())
    setRecentList(filterList)
  }

  return (
    <div>
      <ErrorBoundary>
        {dataGetted ?
          <>
            <SearchBox
              searchVal={searchVal}
              handleSearch={handleSearch}
              handleSubmit={handleSubmit}
              handleRecentItem={handleRecentItem}
              handleRecentItemRemove={handleRecentItemRemove}
              searchActive={searchActive}
              recentList={recentList}
              data={data}
              months={months}
              error={error}
            />
            <WeatherCondition
              data={data}
              months={months}
            />
          </>
          :
          null
        }
      </ErrorBoundary>

    </div>
  )
}

export default App;
