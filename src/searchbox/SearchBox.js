import search from '../assets/images/search.png';

const SearchBox = (props) => {
    return <form onSubmit={props.handleSubmit} className={`searchBoxCont ${props.searchActive ? 'active' : null}`}>
        <div className='searchBoxSub'>
            <div className='searchBox'>
                <img src={search} className='searchImg' alt='Search' />
                <input
                    type='text'
                    value={props.searchVal}
                    onChange={props.handleSearch}
                    className='searchInput'
                    placeholder='Enter Location...'
                />
            </div>
            {props.error ? <small className='errVal'>Please enter valid city</small> : null}
            <div className={`detailsCont  ${props.searchActive ? 'active' : null}`}>
                <div className={`recentListCont ${props.recentList.length > 0 ? 'active' : null}`}>
                    <ul>
                        {props.recentList.map((item, index) => {
                            return <li key={index}>
                                <button onClick={() => props.handleRecentItem(item)}>{item}</button>
                                <button onClick={() => props.handleRecentItemRemove(item)}>&#10006;</button>
                            </li>
                        })}
                    </ul>
                </div>
                <div className='weatherDetails'>
                    <h3 className='weTitle'>{props.data.location.name}</h3>
                    <h6 className='weDeHead'>Weather Details</h6>
                    <ul>
                        <li>
                            <p>Cloudy</p>
                            <p>{props.data.current.cloud}%</p>
                        </li>
                        <li>
                            <p>Humidity</p>
                            <p>{props.data.current.humidity}%</p>
                        </li>
                        <li>
                            <p>Wind</p>
                            <p>{props.data.current.wind_kph} km/h</p>
                        </li>
                    </ul>
                </div>
                <div className='foreCastCont'>
                    <h6 className='weDeHead'>Forecast</h6>
                    {props.data.forecast.forecastday.map((item, index) => {
                        return <>
                            <h6 className='foreData'>
                                <span> {Math.abs(item.date.split(' ')[0].split('-')[2])}</span>
                                <span> {props.months.map(monthItem => {
                                    if (monthItem.val === Math.abs(item.date.split(' ')[0].split('-')[1])) {
                                        return monthItem.text;
                                    } else {
                                        return null;
                                    }
                                })}</span>
                                <span> {Math.abs(item.date.split(' ')[0].split('-')[0])}</span>
                            </h6>
                            <div className='foreDateCont'>
                                {item.hour.map((hourItem, hourIndex) => {
                                    return <div>
                                        <p className='foreTime'>
                                            {hourItem.time.split(' ')[1]}
                                        </p>
                                        <div className='foreImgCont'>
                                            <img src={hourItem.condition.icon} />
                                            <p>{hourItem.condition.text}</p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>
    </form>
}

export default SearchBox;